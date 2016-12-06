$(document).ready(function() {

    // Firebase config.
    var config = {
        apiKey: "AIzaSyBpPVhMgO29Gx35FZprI76f7TIJsoAymqs",
        authDomain: "rps-617d2.firebaseapp.com",
        databaseURL: "https://rps-617d2.firebaseio.com",
        storageBucket: "rps-617d2.appspot.com",
        messagingSenderId: "672416909249"
    };

    // Initialize Firebase.
    firebase.initializeApp(config);

    // Save Firebase database to a variable.
    var database = firebase.database();

    // Initial variables.
    var player1 = {
    	name: '',
    	wins: 0,
    	losses: 0,
    	choice: ''
    };

    var player2 = {
    	name: '',
    	wins: 0,
    	losses: 0,
    	choice: ''
    };


    // Firebase call that happens on page load and value updates.
    database.ref().on("value", function(snapshot) {

        // Collect the data for player 1.
        if (snapshot.child('1').exists()) {
        	player1.name = snapshot.child('1').name;
            player1.wins = snapshot.child('1').wins;
            player1.losses = snapshot.child('1').losses;
            player1.choice = snapshot.child('1').choice;
        }

        // Collect the data for player 2.
        if (snapshot.child('2').exists()) {
        	player2.name = snapshot.child('2').name;
        	player2.wins = snapshot.child('2').wins;
        	player2.losses = snapshot.child('2').losses;
        	player2.choice = snapshot.child('2').choice;
        }

        // If it fails, cue error handling.
    }, function(errorObject) {

        // Log a read error and its error code.
        console.log("The read failed: " + errorObject.code);

    });


    // 
    database.ref().onDisconnect(function() {
        console.log('');
    });

    $('#submit-button').on('click', function() {

        // Take the username input.
        var name = $('#userName').val();

        // If you don't have a first user yet, set it.
        if (player1.name.length === 0) {
        	database.ref('1').set({
        		name: name
        	});
        // Otherwise, player 2 must be the one that needs to be set.
        } else {
        	database.ref('2').set({
        		name: name
        	});
        }

        // Don't refresh.
        return false;
    });

});
