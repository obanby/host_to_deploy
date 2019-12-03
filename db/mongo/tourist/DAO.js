// Custom
const touristModel = require("./model");

class DAO {
    static getAll() {
        return new Promise((resolve, reject) => {
            touristModel.find({}, (err, tourists) => {
                if (err) reject(err);
                resolve(tourists);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            touristModel.findById(id, (err, tourist) => {
                if (err) reject(err);
                resolve(tourist);
            });
        });
    }

    static getByEmail(email) {
        return new Promise((resolve, reject) => {
            touristModel.findOne({"login.email": email}, (err, tourist) => {
                if (err) reject(err);
                resolve(tourist);
            });
        });
    }

    static create(tourist) {
        return new Promise((resolve, reject) => {
            const t = new touristModel(tourist);
            t.save((err, tourist) => {
                if (err) reject(err);
                resolve(tourist);
            });
        });
    }
    static update(id, updatedFields) {
        return new Promise((resolve, reject) => {
          this.getById(id)
            .then(tourist => {
                tourist.profile.name = updatedFields.name;
                tourist.profile.age = updatedFields.age;
                tourist.profile.bio = updatedFields.bio;
                tourist.profile.phone = updatedFields.phone;
              tourist.save((err, tourist) => {
                if (err) reject(err);
                resolve(tourist);
              });
            })
            .catch(e => {
              reject(e);
            });
        });
      }
}

module.exports = DAO;