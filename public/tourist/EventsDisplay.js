const user = JSON.parse(localStorage.getItem('user'));

window.onload = async function () {
  const events = document.getElementById('events');
  console.log(user);
  try {
    const res = await getData('http://localhost:3000/v1/event');
    if (res.error == null) {
      //M.toast({ html: 'Successful!', classes: 'green' })
      console.log(res);
      for (var x of Object.keys(res.data)) {
        var event = res.data[x];
        const card = document.createElement("div");
        const cardContent = document.createElement("div");
        const cardTitle = document.createElement("span");
        const cardAction = document.createElement("div");
        const joinEventButton = document.createElement("a");
        const cardDescription = document.createElement("p");
        card.setAttribute("name","event");
        card.setAttribute("id",event.name);
        card.appendChild(cardContent);
        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardDescription);
        cardContent.appendChild(cardAction);
        cardAction.appendChild(joinEventButton);

        cardDescription.innerText = event.description;
        cardTitle.innerText = event.name;
        joinEventButton.innerHTML = "Join Event";
        joinEventButton.href = "#";
        joinEventButton.name = event._id;
        joinEventButton.onclick = async function () {

          const userID = user._id;
          const eventID = joinEventButton.name;
          var obj = ({ userID: userID, eventID: eventID });
          console.log(obj);

          //var data = JSON.stringify(obj);
          try {
            const res = await postData('http://localhost:3000/v1/tourist/joinEvent', obj);
            console.log(res);
            if(res.error == null){
              //M.toast({html: 'Success!', classes: 'green'})
              window.location.href = "http://localhost:3000/tourist/TouristProfilePage.html";
            }else{
              //M.toast({html: 'Failed!', classes: 'red'})
            }
          } catch (error) {
            console.error(error);
          }
        };
        cardTitle.classList.add("card-title");
        cardContent.classList.add("card-content");
        cardContent.classList.add("white-text");

        cardAction.classList.add("card-action");


        card.classList.add("section");
        card.classList.add("left-align");
        card.classList.add("col");
        card.classList.add("s4");
        card.classList.add("card");
        card.classList.add("blue-grey");
        card.classList.add("darken-1");
        card.classList.add("darken-1");

        events.appendChild(card);
      }
    } else {
      //M.toast({ html: 'Failed!', classes: 'red' })
    }
  } catch (error) {
    console.error(error);
  }
}

function sortEvents(){
  var input = document.getElementById("filter").value;
  var events = document.getElementsByName("event");
  var filter = input.toLowerCase();
  events.forEach(function sort(value, index, array){
   var event = value.id.toLowerCase();
    if(event.includes(filter)){
      value.style.display = "block";
    }else{
      value.style.display = "none";
    }
  });
}

async function getData(url = '') {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer' // no-referrer, *client
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}
