const HOST_API = "http://54.159.144.142:3000/v1/host"

function host_login() {
  post(`${HOST_API}/login`, {
    email: document.getElementById("hostEmail").value,
    password: document.getElementById("hostPassword").value
  })
  .then(response => {
    if (response.data !== null) {
      localStorage.setItem('host', JSON.stringify(response.data) );
      // TODO: make sure to change that to the correct end point
      window.location.href = `http://54.159.144.142:3000/host/profile.html`
    }
  })
  .catch(err => {
    window.alert(err);
  })
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
          'Content-Type': 'application/json'
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
