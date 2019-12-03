

// define variables that reference elements on our page

const body = document.getElementById('main');

const appendUser = function (UserName) {
  const user = document.createElement('div');
  user.classList.add("z-depth-1");
  user.id = UserName;
  user.setAttribute("style"," padding: 10px 0px 0px 10px");
  body.appendChild(user);
  const name = document.createElement('h5');
  name.innerHTML = UserName;
  //name.classList.add("collapsible-header");
  user.appendChild(name);
  const table = document.createElement("table");
  //table.classList.add("collapsible-body");

  user.appendChild(table);

  const thead = document.createElement("thead");
  table.appendChild(thead);
  const trthead = document.createElement("tr");
  thead.appendChild(trthead);
  const thName = document.createElement("th");
  trthead.appendChild(thName);
  thName.innerText = "Name";
  thName.width = 100;
  const thDescription = document.createElement("th");
  trthead.appendChild(thDescription);
  thDescription.innerText = "Description";
  thDescription.width = 200;

  const thDate = document.createElement("th");
  trthead.appendChild(thDate);
  thDate.innerText = "Date";
  thDate.width = 100;

  const thPricePerPerson = document.createElement("th");
  trthead.appendChild(thPricePerPerson);
  thPricePerPerson.innerText = "Price";
  thPricePerPerson.width = 100;

  const thLength = document.createElement("th");
  trthead.appendChild(thLength);
  thLength.innerText = "Length";
  thLength.width = 100;

  const tbody = document.createElement("tbody");
  tbody.id = UserName+"EventsTable";
  table.appendChild(tbody);
  /**/

  //body.innerHTML += user;
}
const appendEvent = function (host, event) {
  const body = document.getElementById(host+"EventsTable");
  const tr = document.createElement("tr");
  body.appendChild(tr);

  const td = document.createElement("td");
  tr.appendChild(td);
  td.innerText = event.Name;

  const tdName = document.createElement("td");
  tr.appendChild(tdName);
  tdName.innerText = event.Description;

  const tdDate = document.createElement("td");
  tr.appendChild(tdDate);
  tdDate.innerText = event.Date;
  
  const tdPrice = document.createElement("td");
  tr.appendChild(tdPrice);
  tdPrice.innerText = event.PricePerPerson;

  const tdLength = document.createElement("td");
  tr.appendChild(tdLength);
  tdLength.innerText = event.Length;
  //body.innerHTML += user;
}
const endUserEvents = function (user) {
  const body = document.getElementById(user.UserName);

  //body.innerHTML += user;
}



const touristLoginForm = document.getElementById("touristLoginForm");
if(touristLoginForm){
touristLoginForm.onsubmit = async function(event) {
  event.preventDefault();

  const email = touristLoginForm.elements['email'].value;
  const password = touristLoginForm.elements['password'].value;

  var obj = ({ email: email, password:password});
  //var data = JSON.stringify(obj);
  try {
    const res = await postData('http://54.159.144.142:3000/v1/tourist/login', obj );
    if(res.error == null){
      M.toast({html: 'Login Successful!', classes: 'green'})
      localStorage.setItem('user', JSON.stringify(res.data.tourist));
      window.location.href = "http://54.159.144.142:3000/tourist/TouristProfilePage.html";
    }else{
      M.toast({html: 'Login Failed!', classes: 'red'})
    }
    console.log(res.data.tourist); // JSON-string from `response.json()` call
  } catch (error) {
    console.error(error);
  }
};
}
const touristSignUpForm = document.getElementById("touristSignUpForm");
if(touristSignUpForm){
touristSignUpForm.onsubmit = async function(event) {
  event.preventDefault();

  const email = touristSignUpForm.elements['email'].value;
  const password = touristSignUpForm.elements['password'].value;
  var obj = ({ email: email, password:password});
  try {
    const res = await postData('http://54.159.144.142:3000/v1/tourist/signup', obj );
    if(res.error == null){
      M.toast({html: 'Signup Successful!', classes: 'green'})
    }else{
      M.toast({html: 'Signup Failed!', classes: 'red'})
    }
    console.log(res); // JSON-string from `response.json()` call
  } catch (error) {
    console.error(error);
  }
};
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
