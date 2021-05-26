import consumer from "./consumer"

consumer.subscriptions.create({ channel: "RoomChannel" }, {
	connected() {
		console.log("Connected to Room channel");
	},

	received: function(data) {
		window.location.reload();
  }
})