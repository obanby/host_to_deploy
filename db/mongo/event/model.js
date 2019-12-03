const mongoose = require('mongoose');

let eventSchema = new mongoose.Schema(
    {
        hostId: String,
        name: String,
        description: String,
        location: {
            fullAddress: String,
            city: String,
            country: String,
            coords: {
                lat: Number,
                lng: Number
            }
        },
        price: String,
        tourists: [],
        touristLikes: [],
        dates: [{ start: Date, end: Date}],
        duration: String,
        groupSize: Number,
        includes: String,
        language: String,
        pictures: [
            {
                url1: String,
                url2: String
            }
        ],
        creationDate: Date,
        reviews: [
            {
                touristId: String,
                touristName: String,
                rate: Number,
                comment: String,
                date: String
            }
        ]
    }
);

const eventModel = mongoose.model("Event", eventSchema);
module.exports = eventModel;
