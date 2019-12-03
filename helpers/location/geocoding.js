const https = require("https");
const Loggy = require("@elbanby/loggy");

class GeoCode {
    constructor(API_TOKEN) {
        if (API_TOKEN == undefined || API_TOKEN == null) {
            throw Error(Loggy.error("Please add API Token", `API token is ${API_TOKEN}` , __filename));
        }
        this.TOKEN = API_TOKEN;
        this.API_URL = "https://maps.googleapis.com/maps/api/geocode/json"
    }

    geocode(address) {
        return new  Promise((resolve, reject) => {
            https.get(`${this.API_URL}?address=${address}&key=${this.TOKEN}`, response => {

                let data = {};

                response.on('data', (chunk) => { data += chunk; });

                response.on('end', () => {
                    resolve(JSON.parse(data));
                });

            }).on("error", (error) => {
                Loggy.error("Error occurred sending a get request", error, __filename);
                reject(error);
            });
        });
    }

}

module.exports = GeoCode;