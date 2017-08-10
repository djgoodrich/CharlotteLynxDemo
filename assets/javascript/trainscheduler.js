var config = {
    apiKey: "AIzaSyBmBtWtipz-GaoEtpZnnezJ2Ig_XlZy-T4",
    authDomain: "trainscheduler-2510a.firebaseapp.com",
    databaseURL: "https://trainscheduler-2510a.firebaseio.com",
    projectId: "trainscheduler-2510a",
    storageBucket: "trainscheduler-2510a.appspot.com",
    messagingSenderId: "948312350031"
};
firebase.initializeApp(config);

var database = firebase.database();

var frequency = 0;
var minutesAway = 0;
var nextArrival = "";
var destination = "";
var trainName = "";
console.log("hello world");

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());



    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    var minutesAway = 0;
    var nextArrival = "";

    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var timeRemain = diffTime % frequency;
    var minutesAway = frequency - timeRemain;
    var nextArrival = moment().add(minutesAway, "minutes");
    $(".addedTrains > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + moment(nextArrival).format("hh:mm") + "</td><td>" + minutesAway + "</td>" + "</tr>");

})


$("#submitTrain").on("click", function(event) {

    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({

        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
})