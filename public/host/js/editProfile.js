const HOST_API = "http://localhost:3000/v1/host"

window.onload = function() {
  let user = JSON.parse(localStorage.getItem("host"));
  let host = user.host;

  let bio = document.getElementById("bio");
  bio.value = host.profile.bio;

  let bioLbl = document.getElementById("bioLbl").classList.add("active");

  let country = document.getElementById("country");
  let countryLbl = document.getElementById("countryLbl");

  let city = document.getElementById("city");
  let cityLbl = document.getElementById("cityLbl");

  let language = document.getElementById("language");
  let languageLbl = document.getElementById("languageLbl");

  let field = document.getElementById("field");

  if (host.address)  {
    country.value = host.address.country;
    countryLbl.classList.add("active");
  }

  if (host.address)  {
    city.value = host.address.city;
    cityLbl.classList.add("active");
  }

  if (host.profile && host.profile.languages.length != 0) {
    let langStr = "";

    for (let i = 0; i < host.profile.languages.length; i++) {
        langStr += host.profile.languages[i] + ", "
    }

    language.value = langStr;
    languageLbl.classList.add("active");
  }
}

function updateProfile() {
  let bio = document.getElementById("bio").value;
  let country = document.getElementById("country").value;
  let city = document.getElementById("city").value;
  let languages = document.getElementById("language").value.split(",");
  let field = document.getElementById("field").value;

  // TODO: 2- Make sure to submit the form so you update the profiel
  post(`${HOST_API}/editprofile`, {
    bio,
    country,
    city,
    languages,
    field
  })
  .then(response => {
    if (response.data !== null) {
        let ls =  JSON.parse(localStorage.getItem("host"));
        ls.host = response.data;
        localStorage.setItem("host", JSON.stringify(ls));
        window.location.href = `http://localhost:3000/host/profile.html`
        return;
    }
    window.alert("Please fill all the fields");
  })
  .catch(err => {
    console.log(err);
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
          'jwt':  JSON.parse(localStorage.getItem("host")).jwt
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data)
      });

      resolve(response.json());
    }
    catch(err) {
      reject(err)
    }
  })
}
