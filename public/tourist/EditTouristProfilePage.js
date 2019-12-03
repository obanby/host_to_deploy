const user = JSON.parse(localStorage.getItem('user'));
window.onload = function(){
  const name = document.getElementById('name');
  name.value = user.profile.name;
  const age = document.getElementById('age');
  age.value = user.profile.age;
  const bio = document.getElementById('bio');
  bio.value = user.profile.bio;
  const phone = document.getElementById('phone');
  phone.value = user.profile.phone;
}
const EditTouristProfilePageForm = document.getElementById("EditTouristProfilePageForm");
if(EditTouristProfilePageForm){
  EditTouristProfilePageForm.onsubmit = async function(event) {

  event.preventDefault();

  const name = EditTouristProfilePageForm.elements['name'].value;
  const age = EditTouristProfilePageForm.elements['age'].value;
  const bio = EditTouristProfilePageForm.elements['bio'].value;
  const phone = EditTouristProfilePageForm.elements['phone'].value;
  var obj = ({ name: name, age: age,bio: bio,phone: phone,_id:user._id});
  //var data = JSON.stringify(obj);
  try {
    const res = await postData('http://localhost:3000/v1/tourist/editprofile', obj );
    console.log(res);
    if(res.error == null){
      M.toast({html: 'Edit Successful!', classes: 'green'})
      localStorage.setItem('user', JSON.stringify(res.data));
      window.location.href = "http://localhost:3000/tourist/TouristProfilePage.html";
    }else{
      M.toast({html: 'Edit Failed!', classes: 'red'})
    }
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