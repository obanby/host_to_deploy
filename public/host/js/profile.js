window.onload = function() {
  // initalize user profile
  let user = JSON.parse(localStorage.getItem("host")).host;

  console.log(user);
  let username = document.getElementById("username")
    .innerHTML = user.name;

  let email = document.getElementById("email")
    .innerHTML = `email: ${user.login.email}`;

  let phone = document.getElementById("phone")
    .innerHTML = `phone: ${user.contact.phone}`;

  let bio = document.getElementById("bio")
    .innerHTML = `"${user.profile.bio}"`;

  let country = document.getElementById("country");

  user.address ?
    country.innerHTML = `Country: ${user.address.country}` :
    country.innerHTML = "Country: "

  let city = document.getElementById("city");

  user.address ?
    city.innerHTML = `City: ${user.address.city}` :
    city.innerHTML = "City: "

  let eventListing = document.getElementById("eventListing");

  if (user.events.length != 0) {
    let str = "";
    for (let i = 0 ; i < user.events.length; i++) {
      let e = user.events[i];
        // TODO: refactor to actual element creation this is security prone
        str += `
          <div class="card event_card">
            <div class="card-content">
              Name: ${e.name}
              <div class="divider"></div>
                <p>Description: ${e.description}</p>
                <p>price: $${e.price}</p>
                <p>Dates: </p>
            </div>
          </div>
        `
    }
    eventListing.innerHTML = str;
  }

}
