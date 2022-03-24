import { SimpleGrid, Button, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerJoin, PlayerAction } from "pointer-shared";
import { send } from "process";

const Room = () => {
    let params = useParams();
    const [ws, setWebSocket] = useState<WebSocket>();
    const [name, setName] = useState("Visitor");

    useEffect(() => {
        setWebSocket(new WebSocket("ws://localhost:8080/socket"));
    }, []);
    useEffect(() => {
        console.log('sending client room join')
        if (ws !== undefined) {
            ws.onopen = event => {
                if (params.roomId !== undefined) {
                    ws.send(JSON.stringify(new PlayerJoin(params.roomId)));
                }
            };
        }
    }, [ws]);

    const sendAction = (message:string) => {
        ws?.send((JSON.stringify(new PlayerAction(message))));
    }

    return <>
        <h1>You're in Room {params.roomId}!</h1>

        <TextInput
            label="Enter nickname"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            />
        <Button
        onClick={() => sendAction({name})}
        >Send</Button>

        <SimpleGrid cols={6}>
            <Button color="red" variant="light" size="xl" onClick={() => { sendAction("1")}}>1</Button>
            <Button color="red" variant="light" size="xl" onClick={() => { sendAction("2")}}>2</Button>
            <Button color="red" variant="light" size="xl" onClick={() => { sendAction("3")}}>3</Button>
            <Button color="red" variant="light" size="xl" onClick={() => { sendAction("5")}}>5</Button>
            <Button color="red" variant="light" size="xl" onClick={() => { sendAction("8")}}>8</Button>
            <Button color="red" variant="light" size="xl" onClick={() => { sendAction("13")}}>13</Button>
        </SimpleGrid>
    </>
};

export default Room;