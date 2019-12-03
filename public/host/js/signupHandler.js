const HOST_API = "http://localhost:3000/v1/host"

function host_signup() {
  post(`${HOST_API}/signup`, {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    bio: document.getElementById("bio").value,
    phone: document.getElementById("phone").value
  })
  .then(response => {
    console.log(response);
    if (response.data !== null) {
      window.location.href = `http://localhost:3000/host/hostlogin.html`
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
