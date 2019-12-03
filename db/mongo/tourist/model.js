const mongoose = require('mongoose');

let touristSchema = new mongoose.Schema(
    {
        name: String,
        login: {
            email: String,
            password: String,
        },
        contact: {
            emails: [],
            phones: []
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
        location: {
            currentLocation: {
                coordinates: {
                    lng: Number,
                    lat: Number
                }
            }
        },
        profile: {
            name: String,
            age: Number,
            bio: String,
            phone: String,
            averageRating: String,
            interests: [],
            languages: [
                {
                    name: String,
                    fluency: String
                }
            ],
            reviews: [
                {
                    guideName: String,
                    rate: String,
                    comment: String,
                    date: Date
                }
            ],
            registeredEvents: []
        },
        likedEvents: [{id: String}],
        joinedEvents: [{id: String}],
    }
);

const model = mongoose.model("Tourist", touristSchema);
module.exports = model;
