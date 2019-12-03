// NPM
const Loggy = require("@elbanby/loggy");
// Custom
const Auth = require("../../../helpers/auth/Auth");
const TouristDAO = require("../../../db/mongo/tourist/DAO");
const EventDAO = require("../../../db/mongo/event/DAO");

const jsonR = require("../../../helpers/response");

function getAll(req, res) {
    TouristDAO
        .getAll()
        .then(tourists => {
            if (tourists.length !== 0) {
                tourists = tourists.map(t => {
                    t = t.toObject();
                    delete t.login.password;
                    return t;
                });
            }
            jsonR(res, 200, null, tourists);
        })
        .catch(err => jsonR(res, 500, err, null))
}

async function signup(req, res) {
    let {email, password} = req.body;

    if (!email || !password) jsonR(res, 403, "Must provide valid email and password", null);

    try {
        let tourist = await TouristDAO.getByEmail(email);
        if (tourist) {
            jsonR(res, 400, "email already exists please login", null);
            return;
        }

        password = await Auth.hash(password);

        await TouristDAO.create({login: {email, password}});
        jsonR(res, 200, null, "user added");
    } catch (err) {
        Loggy.error("Error occurred retrieving tourist by email", err, __filename);
        jsonR(res, 500, err, null);
    }
}

async function login(req, res) {
    let {email, password} = req.body;

    if (!email || !password) jsonR(res, 403, "Must provide valid email and password", null);

    try {
        let tourist = await TouristDAO.getByEmail(email);

        if (!tourist) {
            jsonR(res, 400, "user doesn't exist please signup", null);
            return;
        }

        let isValidPassword = await Auth.comparePassword(password, tourist.login.password);

        if (!isValidPassword) {
            jsonR(res, 403, "Unauthorized user. Activity reported.", null);
            return;
        }

        let jwt = await Auth.sign({email: tourist.login.email, id: tourist._id});

        tourist  = tourist.toObject();
        delete tourist.login.password;
        jsonR(res, 200, null, {jwt, tourist});
    } catch (err) {
        Loggy.error("Error occurred retrieving tourist by email", err, __filename);
        jsonR(res, 500, err, null);
    }
}
async function editprofile(req, res) {
    const {
        name,
        age,
        bio,
        phone,
        _id
    } = req.body;



    try {
        let tourist = await TouristDAO.getById(_id);

        // Host doesn't exist and should not update profile
        if (!tourist) {
            jsonR(res, 403, "Tourist doesn't exist, can't edit profile", null);
            return;
        }


        let touristUpdatedProfile = await TouristDAO.update(_id, { name, age, bio, phone });
        touristUpdatedProfile = touristUpdatedProfile.toObject();
        jsonR(res, 200, null, touristUpdatedProfile);

    } catch (err) {
        Loggy.error("Error occurred retrieving host by email for editProfile", err, __filename);
        jsonR(res, 500, err, null);
    }

}
async function joinEvent(req, res) {
    const {
        userID,
        eventID
    } = req.body;
    TouristDAO.getById(userID).then(e => {
        e['joinedEvents'].push({ "_id": eventID });
        e.save((err, event) => {
            if (err) reject(err);
        });

    }).catch(err => jsonR(res, 500, err, null))
    EventDAO.getById(eventID).then(e => {
        e['tourists'].push({ "_id": userID });
        e.save((err, event) => {
            if (err) reject(err);
        });
        jsonR(res, 200, null, { success: true });

    }).catch(err => jsonR(res, 500, err, null))

}
async function leaveEvent(req, res) {
    const {
        userID,
        eventID
    } = req.body;

    TouristDAO.getById(userID).then(e => {
        e['joinedEvents'].pop({ "_id": eventID });
        e.save((err, event) => {
            if (err) reject(err);
        });

    }).catch(err => jsonR(res, 500, err, null))
    EventDAO.getById(eventID).then(e => {
        e['tourists'].pop({ "_id": userID });
        e.save((err, event) => {
            if (err) reject(err);
        });
        jsonR(res, 200, null, { success: true });

    }).catch(err => jsonR(res, 500, err, null))

}
async function joinedEvents(req, res) {
    const {
        userID
    } = req.body;
    var events = [];
    //console.log(await EventDAO.getById(eventID._id));
    TouristDAO.getById(userID).then(async tourist => {
        const promises = tourist.joinedEvents.map(async eventID => {
            const event = await EventDAO.getById(eventID._id);
            return event
          })
          
          events = await Promise.all(promises)
          jsonR(res, 200, null, events);
    }).catch(err => jsonR(res, 500, err, null))


}
module.exports = {
    signup,
    getAll,
    login,
    editprofile,
    joinEvent,
    joinedEvents,
    leaveEvent,
};