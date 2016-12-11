$(document).ready(function() {

    // Initialize Firebase.
    var config = {
        apiKey: "AIzaSyBpPVhMgO29Gx35FZprI76f7TIJsoAymqs",
        authDomain: "rps-617d2.firebaseapp.com",
        databaseURL: "https://rps-617d2.firebaseio.com",
        storageBucket: "rps-617d2.appspot.com",
        messagingSenderId: "672416909249"
    };

    firebase.initializeApp(config);

    // Alias database and sub-levels.
    var database = firebase.database();
    var chats = database.ref('chat');

    // Presence handling.
    var connections = database.ref('connections');
    // var connectedRef = firebase.database().ref('.info/connected');
    var con = '';
    var playerNumber = '';
    var messages = $('.messages');
    var username = $('#username');


    connections.on('value', function(snapshot) {
        numPlayers = Object.keys(snapshot.val()).length - 1;
        if (con.length === 0) {
            if (Object.keys(snapshot.val()).indexOf('1') === -1) {
                playerNumber = '1';
            } else if (Object.keys(snapshot.val()).indexOf('2') === -1) {
                playerNumber = '2';
            }

            // Trying to avoid having a third user break everything.
            // Only the first two users at a time get cons.
            if (playerNumber.length > 0) {
                con = connections.child(playerNumber);

                con.set({
                    name: '',
                    wins: 0,
                    losses: 0,
                    choice: ''
                });

                // When I disconnect, remove this device.
                con.onDisconnect().remove();
            } else {
                
                con = 'n/a';
                $('.error-message').show();
            }

        } else {
            changeNumPlayers = Object.keys(snapshot.val()).length - numPlayers;
            numPlayers = Object.keys(snapshot.val()).length;
        }

        if (changeNumPlayers < 0) {
            if (con === 'n/a') {
                con = '';
                $('.error-message').hide();
            }
        } else if (changeNumPlayers > 0) {
            // opponentName = Object.keys(snapshot.val()['0'].name);
        }

    });

    // On-click function for submitting a name.
    $('#submit-name').on('click', function() {
        name = username.val();
        if (name.length > 0) {
            con.update({
                name: name
            });

            DOMFunctions.showSelfJoin();
        }

        return false;
    });

    DOMFunctions = {
        showSelfJoin: function() {
            username.val('');
            $('.user-form').hide();
            $('.waiting-' + playerNumber).hide();
            $('.name-' + playerNumber).text(name);
            $('.win-loss-' + playerNumber).text('Wins: 0 | Losses: 0');
            $('.hello').text('Hello ' + name + '! You are player ' + playerNumber + '.').show();
            $('.turn').show();
            $('.chat-row').show();
            this.updateScroll();
        },
        updateScroll: function() {
            messages[0].scrollTop = messages[0].scrollHeight;
        }
    };

    // var showMoves = function(turn) {
    //     if (turn === 1) {
    //         $('.moves-1').css('display', 'flex');
    //         // Substitute in names later.
    //         $('.turn').text('Player 1\'s turn.');
    //     } else {
    //         $('.moves-2').css('display', 'flex');
    //         $('.turn').text('Player 2\'s turn.');
    //     }
    // };

    // On-click function for clicking a move.
    $('.move').on('click', function() {
        var choice = $(this).data('option');
        var move = $(this).data('text');
        con.update({
            choice: choice
        });

        $('.moves-' + playerNumber).hide();
        $('.choice-' + playerNumber).text(move).show();
    });


    // On-click function for submitting a chat.
    $('#submit-chat').on('click', function() {
        var message = $('#message');
        var timestamp = new Date().getTime();
        var chatObj = {
            message: message.val(),
            timestamp: timestamp,
            sender: name
        };
        chats.push(chatObj);

        message.val('');

        return false;
    });



    // Displaying chats.
    chats.on('value', function(snapshot) {
        messages.empty();
        var chatMessages = snapshot.val();
        var chatKeys = Object.keys(chatMessages);
        chatKeys.forEach(function(key) {
            var messageDiv = $('<div>');
            messageDiv.text(chatMessages[key].sender + ': ' + chatMessages[key].message);
            messages.append(messageDiv);
        });
        DOMFunctions.updateScroll();
    });

    // Win-Loss-Draw logic.
    // var getWinner = function() {
    //     // move1 v. move 2
    //     // if move1 === move2, recordWin()
    //     // if move1 === 'r' and move2 === 's', recordWin(user1)
    //     // if move1 === 'r' and move2 === 'p', recordWin(user2)
    //     // if move1 === 'p' and move2 === 'r', recordWin(user1)
    //     // if move1 === 'p' and move2 === 's', recordWin(user2)
    //     // if move1 === 's' and move2 === 'p', recordWin(user1)
    //     // if move1 === 's' and move2 === 'r', recordWin(user2)
    // };
});
