import { SimpleGrid, Button, Space, Text, Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerMessage, PlayerJoin, RoomState, BroadcastMessage } from "pointer-shared";
import { Estimate } from "../Estimate/Estimate";
import { NameModal } from "../NameModal/NameModal";


const Room = () => {
    let params = useParams();
    const [ws, setWebSocket] = useState<WebSocket>();
    const [name, setName] = useState("");
    const [roomState, setRoomState] = useState<RoomState>();
    const [estimation, setEstimation] = useState("");
    const [uid, setUid] = useState("");
    const [nameModalOpened, setNameModalOpened] = useState(true);

    useEffect(() => {
        setWebSocket(new WebSocket("ws://localhost:8080/socket"));
    }, []);

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
        fetch(`/room/${params.roomId}/player/${uid}`, {
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
        fetch(`/room/${params.roomId}/estimates`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    if (ws !== undefined) {
        ws.onmessage = event => {
            const message = JSON.parse(event.data)
            if (message as BroadcastMessage && message?.roomState) {
                // console.log(`setting room state ${JSON.stringify(message.roomState)}`);
                setRoomState(message.roomState);
            } else if (message as PlayerMessage) {
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
        <Grid>
            <Grid.Col span={3}>
                <Text>Hi {name}, you're in Room {params.roomId}!</Text>
            </Grid.Col>
            <Grid.Col span={2}>
                <Button
                    variant="gradient"
                    gradient={{ from: 'orange', to: 'red' }}
                    onClick={() => clearAllEstimates()}>Clear All Estimates</Button>
            </Grid.Col>
        </Grid>
        <Space h="lg" />
        <SimpleGrid cols={6}>
            <Estimate estimate="1" players={roomState?.players} gradientFrom="cyan" gradientTo="indigo" setEstimation={setEstimation} />
            <Estimate estimate="2" players={roomState?.players} gradientFrom="indigo" gradientTo="cyan" setEstimation={setEstimation} />
            <Estimate estimate="3" players={roomState?.players} gradientFrom="indigo" gradientTo="cyan" setEstimation={setEstimation} />
            <Estimate estimate="5" players={roomState?.players} gradientFrom="indigo" gradientTo="cyan" setEstimation={setEstimation} />
            <Estimate estimate="8" players={roomState?.players} gradientFrom="indigo" gradientTo="cyan" setEstimation={setEstimation} />
            <Estimate estimate="13" players={roomState?.players} gradientFrom="indigo" gradientTo="cyan" setEstimation={setEstimation} />
        </SimpleGrid>
        <Space h="lg" />
    </>
};

export default Room;