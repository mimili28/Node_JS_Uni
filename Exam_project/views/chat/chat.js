$(function(){
	var socket = io.connect('http://localhost:3000')

	$.get("/logged-user", details => {
		socket.emit('username', {username : details.username})
      }).fail(function (error) {
          console.log(error)
      })

	var message = $("#message")
	var send_message = $("#send_message")
	var chatroom = $("#chatroom")
    var feedback = $("#feedback")
    
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
    })

	socket.on("new_message", (data) => {
		feedback.html('');
        message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})
	
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
});