// NPM
const Loggy = require("@elbanby/loggy");
// Custom
const Auth = require("../../../helpers/auth/Auth");
const EventDAO = require("../../../db/mongo/event/DAO");
const HostDAO = require("../../../db/mongo/host/DAO");
const jsonR = require("../../../helpers/response");

function getAll(req, res) {
    EventDAO.getAll()
        .then(events => {
            events = events.map(e => e.toObject());
            jsonR(res, 200, null, events)
        });
}

function getById(req, res) {

    if (!req.params.id) {
        jsonR(res, 400, "Must provide an event id", null);
        return;
    }

    EventDAO.getById(req.params.id)
        .then(event => jsonR(res, 200, null, event))
        .catch(err => {
            Loggy.error("Error occurred while retrieving event by id", __filename);
            jsonR(res, 500, "Internal server error", null);
        });
}

/*
* FIXME: As of now the create function can be used to create the same event many times, we need to limit
*        The number of times a user can recreate the same event ... Some thinking needed.
* */
async function create(req, res) {
    // TODO: refactor api validation to its own generic module that takes required fields and req.body and compares
    if (!req.body.name || !req.body.description || !req.body.dates || !req.body.price || !req.body.location) {
        jsonR(res, 400, "Must provide event name, description, dates, price and location", null);
        return;
    }

    try {
        let decoded = await Auth.verify(req.headers.jwt);
        let host = await HostDAO.getById(decoded.id);

        // Host doesn't exist and should not create event
        if (!host) {
            jsonR(res, 403, "User doesn't exist, can't create event", null);
            return;
        }

        let rb = req.body;

        let event = await EventDAO
            .create({
                hostId: decoded.id,
                name: rb.name,
                description: rb.description,
                price: rb.price,
                dates: rb.dates,
                location: {
                    city: rb.location.city.toLowerCase(),
                    country: rb.location.country.toLowerCase()
                }
            });

          host = await HostDAO.updateHostEvents(decoded.id, event);
          jsonR(res, 200, null, event);
    } catch (err) {
        Loggy.error("error occurred while verifying user", err, __filename);
        jsonR(res, 403, "Unauthorized", null);
    }
}

async function update(req, res) {
    // TODO: use query parameters with post request for better api design
    if (!req.params.id || !req.body.newEvent) {
        jsonR(
            res,
            400,
            "Must provide event id you wish to update and a newEvent with properties you wish to update",
            null
        );
        return;
    }

    try {
        let decoded = await Auth.verify(req.headers.jwt);
        let event = await EventDAO.getById(req.params.id);

        event = event.toObject();

        if (event.hostId !== decoded.id) {
            jsonR(res, 403, "unauthorized to edit an event that is not yours", null);
            return;
        }

        let updatedEvent = await EventDAO.update(event, req.body.newEvent);
        jsonR(res, 200, null, updatedEvent);
    } catch (err) {
        Loggy.error("Error occurred decoding jwt", err, __filename);
        jsonR(res, 403, "unauthorized", null);
    }
}

// TODO: Add filtering by date
function filter(req, res) {

    if (!req.query) {
        jsonR(res, 400, "No query parameters passed", null);
        return;
    }

    let country = req.query.country ? req.query.country.toLowerCase() : null;
    let city = req.query.city ? req.query.city.toLowerCase() : null;

    // Filter by city and country
    if (country && city) {
        EventDAO
            .getEventsByFilter({
                "location.country": country,
                "location.city": city
            })
            .then(events => {
                events.filter(e => e.location.country === country && e.location.city === city);
                jsonR(res, 200, null, events);
            })
            .catch(err => console.log(err));
    } else if (country) {
        EventDAO
            .getEventsByFilter({"location.country": country})
            .then(events => jsonR(res, 200, null, events))
            .catch(err => {
                Loggy.error("Error occurred while filtering with country", err, __filename);
                jsonR(res, 500, "Internal server error", null)
            })
    }
    else if (city) {
        EventDAO.getEventsByFilter({"location.city": city})
            .then(events => jsonR(res, 200, null, events))
            .catch(err => {
                Loggy.error("Error occurred retrieving events from db", err, __filename);
                jsonR(res, 500, "internal server error", __filename);
            });
    }

}

module.exports = {
    getAll,
    create,
    update,
    getById,
    filter
};
