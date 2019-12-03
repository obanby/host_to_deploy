const user = JSON.parse(localStorage.getItem('user'));
window.onload = async function(){
  //this.console.log(user);

  const name = document.getElementById('name');
  name.innerHTML = user.profile.name;
  const age = document.getElementById('age');
  age.innerHTML = "Age: "+user.profile.age;
  const bio = document.getElementById('bio');
  bio.innerHTML = "Bio: "+user.profile.bio;
  const phone = document.getElementById('phone');
  phone.innerHTML = "Phone: "+user.profile.phone;

  const userID = user._id;
  var obj = ({ userID: userID });

  //var data = JSON.stringify(obj);
  try {
    const res = await postData('http://54.159.144.142:3000/v1/tourist/joinedEvents', obj);
    this.addEvents(res)
    
  } catch (error) {
    console.error(error);
  }
}
function addEvents(res){
  for (var x of Object.keys(res.data)) {
    console.log(res.data[x]);
    if(res.data[x] != null){
      const events = document.getElementById('events');

    var event = res.data[x];
    const card = document.createElement("div");
    const cardContent = document.createElement("div");
    const cardTitle = document.createElement("span");
    const cardAction = document.createElement("div");
    const joinEventButton = document.createElement("a");
    const cardDescription = document.createElement("p");

    card.appendChild(cardContent);
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardDescription);
    cardContent.appendChild(cardAction);
    cardAction.appendChild(joinEventButton);

    cardDescription.innerText = event.description;
    cardTitle.innerText = event.name;
    joinEventButton.innerHTML = "Leave Event";
    joinEventButton.href = "#";
    joinEventButton.name = event._id;
    joinEventButton.onclick = async function () {

      const userID = user._id;
      const eventID = joinEventButton.name;
      var obj = ({ userID: userID, eventID: eventID });
      console.log(obj);

      //var data = JSON.stringify(obj);
      try {
        const res = await postData('http://54.159.144.142:3000/v1/tourist/leaveEvent', obj);
        console.log(res);
        if(res.error == null){
          //M.toast({html: 'Success!', classes: 'green'})
          window.location.href = "http://54.159.144.142:3000/tourist/TouristProfilePage.html";
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
  }
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