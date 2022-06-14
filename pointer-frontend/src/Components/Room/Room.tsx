import { SimpleGrid, Button, Space, Text, Grid, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerMessage, PlayerJoin, RoomState, BroadcastMessage } from "@mikepray/pointer-shared";
import { Estimate } from "../Estimate/Estimate";
import { NameModal } from "../NameModal/NameModal";
import { connectPlayer } from "./ConnectPlayer";

const Room = () => {
    let params = useParams();
    const [ws, setWebSocket] = useState<WebSocket>();
    const [name, setName] = useState("");
    const [roomState, setRoomState] = useState<RoomState>();
    const [estimation, setEstimation] = useState("");
    const [uid, setUid] = useState("");
    const [nameModalOpened, setNameModalOpened] = useState(true);

    // socket reconnection mechanism:
    // - when browser / computer hibernates / kills socket
    // - when server restarts
    // - when internet goes out
    // - when user reloads page (or closes and rejoins)

    /* TODO:
        switch to async handshake that creates the uid on the server side and sets a uid cookie
        once the client receives the join response, then it opens the websocket connection

        also support if the server restarts and the client cookie is still valid
    */

    // join / reconnect
    useEffect(() => {
      connectPlayer(name);
    }, [ws, name]);

    useEffect(() => {
        const websocket = new WebSocket(`ws://${window.location.hostname}:8080/room/{id}`)// FIXME room id
        setWebSocket(websocket);
    }, []);

    useEffect(() => {
        setTimeout(keepAlive, 20000)
    }, [ws]);

    // keep the ws connection alive so that load balancers, proxies, or networking hardware don't see the connection as idle
    const keepAlive = () => {
        ws?.send(JSON.stringify(new PlayerMessage(undefined, true)));
        setTimeout(keepAlive, 20000);
    }
    
    useEffect(() => {
        // join handshake
        if (ws !== undefined) {
            ws.onopen = () => {
                if (params.roomId !== undefined) {
                    ws.send(JSON.stringify(new PlayerMessage(new PlayerJoin(params.roomId))));
                }
            };
        }
    }, [ws, params.roomId]);

    useEffect(() => {
        if (uid !== "") {
            updatePlayer();
        }
    }, [estimation]);

    const updatePlayer = () => {
        fetch(`/api/room/${params.roomId}/player/${uid}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerUid: uid,
                name: name,
                estimation: estimation
            })
        });
    }

    const clearAllEstimates = () => {
        fetch(`/api/room/${params.roomId}/estimates`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        // set the estimation to -1 after clearing the estimate. this is necessary so that the user can make the same estimation twice in a row
        setEstimation("-1");
    }

    if (ws !== undefined) {
        ws.onmessage = event => {
            const message = JSON.parse(event.data)
            if (message as BroadcastMessage && message?.roomState) {
                console.log(`setting room state ${JSON.stringify(message.roomState)}`);
                setRoomState(message.roomState);
            } else if (message as PlayerMessage) {
                // TODO: this goes away once it's switched to async handshake
                if (message?.playerJoin?.uid !== undefined) {
                    // save back the player uid assigned by the server
                    console.log(`Handshake successful, joined room: ${message.playerJoin.roomId}, UID: ${message.playerJoin.uid}`)
                    setUid(message.playerJoin.uid);
                }
            } else {
                console.error(`Unknown message received: ${message}`);
            }
        }
    }
    
    return <>
        <NameModal opened={nameModalOpened} setNameModalOpened={setNameModalOpened} playerName={name} setName={setName} />

        <Group position="apart">
            <Text>Hi {name}, you're in room {params.roomId}!</Text>

            <Button
                styles={(theme: { fn: { darken: (arg0: string, arg1: number) => any; }; }) => ({
                    root: {
                        backgroundColor: '#993320',                    
                    },
                })}
                onClick={() => clearAllEstimates()}>Clear Estimates</Button>
                
        </Group>

        <Space h="lg" />
        <SimpleGrid
            cols={8}
            breakpoints={[
                { maxWidth: 900, cols: 1, spacing: 'sm' }
            ]}
        >
            <Estimate estimate="0" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={setEstimation} />
            <Estimate estimate="1" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={setEstimation} />
            <Estimate estimate="2" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={setEstimation} />
            <Estimate estimate="3" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={setEstimation} />
            <Estimate estimate="5" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={setEstimation} />
            <Estimate estimate="8" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={setEstimation} />
            <Estimate estimate="13" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={setEstimation} />
            <Estimate estimate="?" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={setEstimation} />
        </SimpleGrid>
        <Space h="lg" />
    </>
};

export default Room;