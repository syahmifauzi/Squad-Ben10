var DATA = [];

// Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDVNjqBG3dE3sSLiaTJFvtqoxrpf1wyg3M",
  authDomain: "squad-ben10.firebaseapp.com",
  databaseURL: "https://squad-ben10.firebaseio.com",
  projectId: "squad-ben10",
  storageBucket: "squad-ben10.appspot.com",
  messagingSenderId: "699740009062",
  appId: "1:699740009062:web:ddfae8a12a94f8da0c33a7",
  measurementId: "G-YG6SC2BMET"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database().ref('/');
database.once('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    DATA.push(childSnapshot.val());
  });
});

// App Functionality
var isNumber = document.getElementById('number');
var isSort = document.getElementById('sort');
var isAll = document.getElementById('all');
var input = document.getElementById('input');
var output = document.getElementById('output');

isNumber.addEventListener('change', render);
isSort.addEventListener('change', render);
isAll.addEventListener('change', renderAll)
input.addEventListener('keyup', render);

function render() {
  var inputNames = input.value.toLowerCase().split('\n');
  var outputNames = [];
  inputNames.forEach(function (name) {
    for (var i = 0; i < DATA.length; ++i)
      if (DATA[i].nickname === name)
        outputNames.push(DATA[i].fullname);
  });
  if (isSort.checked) outputNames.sort();
  if (isNumber.checked)
    for (var i = 0; i < outputNames.length; ++i)
      outputNames[i] = i + 1 + '. ' + outputNames[i];
  output.value = outputNames.join('\n');
}

function renderAll() {
  if (isAll.checked) {
    var inputNames = DATA.map(function (name) {return name.nickname;});
    var outputNames = DATA.map(function (name) { return name.fullname; });
    input.value = inputNames.join('\n');
    output.value = outputNames.join('\n');
    if (isNumber.checked || isSort.checked) render();
  } else {
    input.value = '';
    output.value = '';
  }
}

// Copy to Clipboard
document.getElementById('copy-input').addEventListener('click', function () {
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand('copy');
});

document.getElementById('copy-output').addEventListener('click', function () {
  output.select();
  output.setSelectionRange(0, 99999);
  document.execCommand('copy');
});
