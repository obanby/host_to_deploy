exports function Request(url) {
}

Request.prototype.post = async function(url, data) {
  return new Promise((resolve, reject) => {
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


Request.prototype.get = async function(url, data) {
  return new Promise((resolve, reject) => {
    try {
      let response = await fetch(url, {
        method: 'GET',
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
