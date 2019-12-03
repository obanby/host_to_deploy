const Event_API = "http://54.159.144.142:3000/v1/event"

function postEvent() {
  let name = document.getElementById("name").value;
  let description = document.getElementById("description").value
  let country = document.getElementById("country").value;
  let city = document.getElementById("city").value;
  let price = document.getElementById("price").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;

  if (!name || !description || !country || !city || !price || !startDate || !endDate) {
    window.alert("Please fill all the fields");
    return;
  }

  post(`${Event_API}/create`, {
      name,
      description,
      dates: [{
        startDate,
        endDate
      }],
      price,
      location: {
        city,
        country
      }
    })
    .then(response => {
      let ls = JSON.parse(localStorage.getItem("host"));

      let host = ls.host;

      if (host.events) {
        host.events.push(response.data);
      } else {
          host.events = [response.data];
      }

      localStorage.setItem("host", JSON.stringify(ls));
      window.location.href = "http://54.159.144.142:3000/host/profile.html";
    })
    .catch(err => {
      console.log(err)
    });
}


// TO be imported from other files
function post(url, data) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'jwt': JSON.parse(localStorage.getItem("host")).jwt
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data)
      });

      resolve(response.json());
    } catch (err) {
      reject(err)
    }
  })
}
