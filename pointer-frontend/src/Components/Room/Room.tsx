import { SimpleGrid, Button, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Msg, PlayerAction, PlayerJoin } from "pointer-shared";

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
                    ws.send(JSON.stringify(new PlayerJoin(params.roomId)));
                }
            };
        }
    }, [ws]);

    const sendAction = (message:string) => {
        ws?.send((JSON.stringify(new PlayerAction(uid, message))));
        ws?.send((JSON.stringify(new Msg( message))));
    }

    if (ws !== undefined) {
        ws.onmessage = event => { 
            // join reply
            const joinReply = JSON.parse(event.data)
            if (joinReply as PlayerJoin) {
                const joinReply = event.data as PlayerJoin;
                console.log(`player join reply ${joinReply}`);
                // setUid(joinReply.uid);
                
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
        <Button onClick={() => sendAction(name)}>Set Nickname</Button>

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