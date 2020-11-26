const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const number = document.querySelector("#number");
var firebaseConfig = {
  apiKey: "AIzaSyDiwv47C-cyXWirvGU4_tCB_-CrOf48LUA",
  authDomain: "fir-crud-e37a3.firebaseapp.com",
  databaseURL: "https://fir-crud-e37a3.firebaseio.com",
  projectId: "fir-crud-e37a3",
  storageBucket: "fir-crud-e37a3.appspot.com",
  messagingSenderId: "943156400611",
  appId: "1:943156400611:web:b2b47ac74e7f6eab71d0d6",
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore(app);
var database = firebase.database();
var firebase = firebase.auth();
document.getElementById("submit").addEventListener("click", writeData);

function writeData() {
  const userName = name.value;
  const userEmail = email.value;
  const userPassword = password.value;
  const userNumber = number.value;
  //   db.collection("users")
  //     .add({
  //       name: userName,
  //       email: userEmail,
  //       number: userNumber,
  //     })
  //     .then(function (value) {
  //       console.log("success ", value);
  //     })
  //     .catch(function (e) {
  //       console.log(e);
  //     });
  if (userEmail !== null || userPassword !== null) {
    firebase
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then((user) => {
        firebase.onAuthStateChanged((user) => {
          if (user) {
            var uId = user.uid;
            console.log(uId);
            database
              .ref("/users/" + uId)
              .set({
                name: userName,
                email: userEmail,
                number: userNumber,
              })
              .then(() => {
                console.log("success");
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  } else {
    window.alert("Enter Email and Password");
  }
}
