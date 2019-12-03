// Custom
const compareAndMatch = require("../../../helpers/compareAndMatch");
const eventModel = require("./model");

class DAO {
    static getAll() {
        return new Promise((resolve, reject) => {
            eventModel.find({}, (err, events) => {
                if (err) reject(err);
                resolve(events);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            eventModel.findById(id, (err, event) => {
                if (err) reject(err);
                resolve(event);
            });
        });
    }

    static getEventsByFilter(filter) {
        return new Promise((resolve, reject) => {
            eventModel.find(filter, (err, events) => {
                if (err) reject(err);
                resolve(events);
            });
        });
    }

    static create(event) {
        return new Promise((resolve, reject) => {
            const e = new eventModel(event);
            e.save((err, event) => {
                if (err) reject(err);
                resolve(event);
            });
        });
    }

    static update(id, newEvent) {
        return new Promise((resolve, reject) => {
            this.getById(id)
                .then(event => {
                   compareAndMatch(event, newEvent);
                   event.save((err, e) => {
                       if (err) reject(err);
                       resolve(e);
                   });
                });
        });
    }
}

module.exports = DAO;