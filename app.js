// Initialize Firebase.
var config = {
    apiKey: "AIzaSyBpPVhMgO29Gx35FZprI76f7TIJsoAymqs",
    authDomain: "rps-617d2.firebaseapp.com",
    databaseURL: "https://rps-617d2.firebaseio.com",
    storageBucket: "rps-617d2.appspot.com",
    messagingSenderId: "672416909249"
};

firebase.initializeApp(config);

database = firebase.database();


// Alias database levels.
names = database.ref('names');
moves = database.ref('moves');
chat = database.ref('chat');


// On-click function for submitting a name.
$('#submit-name').on('click', function() {
    name = $('#username').val();
    nameObj = {
        name: name
    };
    names.push(nameObj);
});


firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        // ...
    } else {
        // User is signed out.
        // ...
    }
    // ...
});


// On-click function for clicking a move.
$('.move').on('click', function() {
    move = $(this).data(move);
    user = $(this).data(user);
    moveObj = {
        move: move,
        user: user
    };
    moves.push(moveObj);
});


// On-click function for submitting a chat.
$('#submit-chat').on('click', function() {
    message = $('#message').val();
    timestamp = new Date();
    sender = user;
    chatObj = {
        message: message,
        timestamp: timestamp,
        sender: sender
    };
    chat.push(chatObj);
});


// On-disconnect.
database.on('disconnect', function() {
    firebase.auth().signOut();
    // This should trigger the view and data clearing functions.
});


// On value functions.
moves.on('value', function(snapshot) {
    // Check whether we have two moves.
    // If so, prompt getWinner.
});

chats.on('value', function(snapshot) {
    // Get message, sender, and timestamp sets.
    // Append all chats to the chat box.
});

names.on('value', function(snapshot) {
    // If there are two names, show the game.
    // If there is one name, show 'waiting for another player'
    // If there are no names, just show that you need a name.
});


// Clear data.
clearData = function() {
    // names.remove();
    user = '';
    // etc.
};

// Win-Loss-Draw logic.
getWinner = function() {
    // move1 v. move 2
    // if move1 === move2, recordWin()
    // if move1 === 'r' and move2 === 's', recordWin(user1)
    // if move1 === 'r' and move2 === 'p', recordWin(user2)
    // if move1 === 'p' and move2 === 'r', recordWin(user1)
    // if move1 === 'p' and move2 === 's', recordWin(user2)
    // if move1 === 's' and move2 === 'p', recordWin(user1)
    // if move1 === 's' and move2 === 'r', recordWin(user2)
};
