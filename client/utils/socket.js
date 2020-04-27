import io from "socket.io-client";
import store from "../store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!");

  // socket.on("new-message", (message) => {
  //   store.dispatch(gotNewMessages(message));
  // });

  // socket.on("new-channel", (channel) => {
  //   store.dispatch(gotNewChannel(channel));
  // });
});

export default socket;
