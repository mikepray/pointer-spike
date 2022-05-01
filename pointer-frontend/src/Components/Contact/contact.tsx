import { Button, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
// import {WebSocket} from "WebSocket"

const Contact = () => {
  const [msg, setMsg] = useState("");
  const [clicked, setCount] = useState(1);
  const [message, setMessage] = useState("");
  const [ws, setWebSocket] = useState<WebSocket>();
  const [websocketPush, setWebSocketPushMessage] = useState("");

  const getApiData = async () => {
    const response = await fetch(
      "/issue/0"
    ).then((response) => response.json());

    // update the state
    setMsg(response.text);
  };

  useEffect(() => {
    getApiData();
    setWebSocket(new WebSocket(`ws://${window.location.hostname}:8080/socket`));
    // setWebSocket(new WebSocket("ws://localhost:8080/socket"));

  }, []);

  const send = () => {
    console.log('sending');
    ws?.send(message);
  }

  if (ws !== undefined) {
    ws.onmessage = event => { setMessage(event.data)}
  }

  return <>
   <div>
     {["1", "2"].map(s => { 
               return <div>hi</div>
            })}</div>
    <div>{msg}</div>
    <div><Button onClick={() => setCount(previous => previous + 1)}>{clicked}</Button></div>
    <div>mike@mikepray.dev</div>

    <TextInput
      label="Enter a Message"
      description="Enter a message to send to the server"
      value={message}
      onChange={(event) => setMessage(event.currentTarget.value)}
    />
    <Button
      onClick={() => send()}
    >Send</Button>
  </>
};

export default Contact;

