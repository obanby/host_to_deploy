const mongoose = require('mongoose');

let hostSchema = new mongoose.Schema(
    {
        name: String,
        login: {
            email: String,
            password: String
        },
        contact: {
            emails: [],
            phone: Number
        },
        address: {
            home: String,
            city: String,
            province: String,
            country: String,
        },
        billing: {
            cardType: String,
            cardNumber: Number
        },
        finance:{
            earned: String,
            currency: Number
        },
        location:{
            currentLocation:{
                coordinates:{
                    lng: Number,
                    lat: Number
                }
            }
        },
        profile:{
            name: String,
            age: Number,
            bio: String,
            languages:[],
            averageRating: Number,
            // We only allow host to be domain specific -- for now
            expertise:String
        },
        events: [],
        hasCompletedProfile: Boolean
    }
);

const model = mongoose.model("Host", hostSchema);
module.exports = model;
