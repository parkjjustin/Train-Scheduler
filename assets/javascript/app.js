(function(){
    $(document).ready(function(){

  var config = {
    apiKey: "AIzaSyCk1lpfWZyCoifB2C4HYhypDE8F7e8tcKs",
    authDomain: "train-3c502.firebaseapp.com",
    databaseURL: "https://train-3c502.firebaseio.com",
    storageBucket: "train-3c502.appspot.com",
    messagingSenderId: "943497169702"
  };
  firebase.initializeApp(config);
        var database = firebase.database();


        // form enter function

        $("#form").on("submit", function(){
            var name = $("#name").val().trim();
            var destination = $("#destination").val().trim();
            var startTime = $("#startTime").val().trim();
            var frequency = $("#frequency").val().trim();

            database.ref().push({
                name: name,
                destination: destination,
                startTime: startTime,
                frequency: frequency
            });

            $("#name").val("");
            $("#destination").val("");
            $("#startTime").val("");
            $("#frequency").val("");
            return false;
        });


        // Display function when child is added on firebase 

        database.ref().on("child_added", function(childSnapshot){

            var away = calcTime((childSnapshot.val().startTime), (childSnapshot.val().frequency));
            var trainTime = moment().add(away, "m").format("HH:mm A");

            var row = $("<tr>");
            var nameData = $("<td>").text(childSnapshot.val().name);
            var desData = $("<td>").text(childSnapshot.val().destination);
            var freqData = $("<td>").text(childSnapshot.val().frequency + " min");
            var nextArrival = $("<td>").text(trainTime);
            var minAway = $("<td>").text(away + " min");

            row.append(nameData);
            row.append(desData);
            row.append(freqData);
            row.append(nextArrival);
            row.append(minAway);
            $(".table").append(row);
        })


        // function to calc minutes until next train

        function calcTime(start, rate){
            var timeDiff = moment(start, "hh:mm").diff(moment(), "minutes");
            if (timeDiff > 0){
                var away = timeDiff%rate+1;
            } else {
                var fresh = timeDiff+1440;
                var away = fresh%rate;
            }
            return away;
        }

    });
})(this);