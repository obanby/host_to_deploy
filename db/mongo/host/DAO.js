// Custom
const hostModel = require("./model");

class DAO {
  static getAll() {
    return new Promise((resolve, reject) => {
      hostModel.find({}, (err, hosts) => {
        if (err) reject(err);
        resolve(hosts);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      hostModel.findById(id, (err, host) => {
        if (err) reject(err);
        resolve(host);
      });
    });
  }

  static getByEmail(email) {
    return new Promise((resolve, reject) => {
      hostModel.findOne({
        "login.email": email
      }, (err, hosts) => {
        if (err) reject(err);
        resolve(hosts);
      });
    });
  }

  static create(host) {
    return new Promise((resolve, reject) => {
      const h = new hostModel(host);
      h.save((err, host) => {
        if (err) reject(err);
        resolve(host);
      });
    });
  }

  // TODO: refactor the dependency on certain fields and the update & add validation
  static update(id, updatedFields) {
    return new Promise((resolve, reject) => {
      this.getById(id)
        .then(host => {
          host.profile.bio = updatedFields.bio;

          if (host.address) {
            host.address.country = updatedFields.country;
            host.address.city = updatedFields.city;
          } else {
            host.address = {
              country: updatedFields.country,
              city: updatedFields.city
            }
          }

          host.profile.languages = updatedFields.languages;
          host.profile.expertise = updatedFields.field;
          host.save((err, host) => {
            if (err) reject(err);
            resolve(host);
          });
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  static updateHostEvents(id, event) {
    return new Promise((resolve, reject) => {
      this.getById(id)
        .then(host => {
          host.events.push(event)
          host.save((err, host) => {
            if (err) reject(err);
            resolve(host);
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = DAO;
