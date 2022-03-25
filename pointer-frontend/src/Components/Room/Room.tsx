import { SimpleGrid, Button, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Message, PlayerAction, PlayerJoin, ActionName } from "pointer-shared";

const Room = () => {
    let params = useParams();
    const [ws, setWebSocket] = useState<WebSocket>();
    const [name, setName] = useState("Visitor");
    const [uid, setUid] = useState("");

    useEffect(() => {
        setWebSocket(new WebSocket("ws://localhost:8080/socket"));
    }, []);
    useEffect(() => {
        console.log('sending client room join')
        if (ws !== undefined) {
            ws.onopen = () => {
                if (params.roomId !== undefined) {
                    ws.send(JSON.stringify(new Message(new PlayerJoin(params.roomId))));
                }
            };
        }
    }, [ws]);

    const sendAction = (action: ActionName, actionValue: string) => {
        ws?.send((JSON.stringify(new Message(undefined, new PlayerAction(uid, action, actionValue)))));
    }

    if (ws !== undefined) {
        ws.onmessage = event => {
            const message = JSON.parse(event.data)
            if (message as Message) {
                if (message?.playerJoin?.uid !== undefined) {
                    // save back the player uid assigned by the server
                    console.log(`Handshake successful, joined room: ${message.playerJoin.roomId}, UID: ${message.playerJoin.uid}`)
                    setUid(message.playerJoin.uid);
                }
                // if (message?.pl)
            }
        }
    }

    return <>
        <h1>You're in Room {params.roomId}!</h1>

        <TextInput
            label="Enter nickname"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
        />
        <Button onClick={() => sendAction(ActionName.NICKNAME, name)}>Set Nickname</Button>

        <SimpleGrid cols={6}>
            <Button color="red" variant="light" size="xl" onClick={() => { sendAction(ActionName.ESTIMATION_SELECTION, "1") }}>1</Button>
            <Button color="red" variant="light" size="xl" onClick={() => { sendAction(ActionName.ESTIMATION_SELECTION, "2") }}>2</Button>
            <Button color="red" variant="light" size="xl" onClick={() => { sendAction(ActionName.ESTIMATION_SELECTION, "3") }}>3</Button>
            <Button color="red" variant="light" size="xl" onClick={() => { sendAction(ActionName.ESTIMATION_SELECTION, "5") }}>5</Button>
            <Button color="red" variant="light" size="xl" onClick={() => { sendAction(ActionName.ESTIMATION_SELECTION, "8") }}>8</Button>
            <Button color="red" variant="light" size="xl" onClick={() => { sendAction(ActionName.ESTIMATION_SELECTION, "13") }}>13</Button>
        </SimpleGrid>
    </>
};

export default Room;