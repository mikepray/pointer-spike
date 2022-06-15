import { SimpleGrid, Button, Space, Text, Grid, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerMessage, PlayerJoin, RoomState, BroadcastMessage, RoomStatePlayer } from "@mikepray/pointer-shared";
import { Estimate } from "../Estimate/Estimate";
import { NameModal } from "../NameModal/NameModal";
import Cookies from "js-cookie";

const Room = () => {
    let params = useParams();
    const [ws, setWebSocket] = useState<WebSocket>();
    const [name, setName] = useState("");
    const [roomState, setRoomState] = useState<RoomState>();
    const [uid, setUid] = useState("");
    const [nameModalOpened, setNameModalOpened] = useState(false);

    // socket reconnection mechanism:
    // - when browser / computer hibernates / kills socket
    // - when server restarts
    // - when internet goes out
    // - when user reloads page (or closes and rejoins)

    // join / reconnect
    useEffect(() => {
        // first see if there's a player UID already in the cookie
        const playerUid = Cookies.get("planningPokerPlayerUid");
        if (playerUid !== undefined) {
            // set the uid state, which will trigger the websocket to connect
            setUid(playerUid);
            // get player from server and set name
            fetch(`/api/player/${playerUid}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                return response.json()
            }).then(data => {
                setName(data.name);
            });
        } else {
            // otherwise open the name modal 
            setNameModalOpened(true)
        }
    }, []);

    function onNameModalSubmit(playerName: string) {
        // and then create the player on the server
        setNameModalOpened(false)
        setName(playerName);
        createPlayer(playerName).then(res => {
            setUid(res.uid);
        })
    }

    useEffect(() => {
        if (params.roomId && uid) {
            const websocket = new WebSocket(`ws://${window.location.hostname}:8080/socket?room=${params.roomId}&playerUid=${uid}`);
            setWebSocket(websocket);
        }
    }, [uid])

    function updatePlayer(estimation: string) {
        console.log(`uid from cookie: ${JSON.stringify(Cookies.get())}`)
        if (uid) {
            const player = new RoomStatePlayer(uid, name, estimation);
            fetch(`/api/player/${uid}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(player)
            });
        }
    }

    const clearAllEstimates = () => {
        fetch(`/api/room/${params.roomId}/estimates`, {
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
                console.log(`setting room state ${JSON.stringify(message.roomState)}`);
                setRoomState(message.roomState);
            } else {
                console.error(`Unknown message received: ${message}`);
            }
        }
    }

    return <>
        <Text>Hi, your UID is: {Cookies.get('planningPokerPlayerUid')}</Text>
        <NameModal opened={nameModalOpened} playerName={name} onSubmit={onNameModalSubmit} />

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
            <Estimate estimate="None" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={updatePlayer} />
            <Estimate estimate="0" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={updatePlayer} />
            <Estimate estimate="1" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={updatePlayer} />
            <Estimate estimate="2" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={updatePlayer} />
            <Estimate estimate="3" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={updatePlayer} />
            <Estimate estimate="5" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={updatePlayer} />
            <Estimate estimate="8" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={updatePlayer} />
            <Estimate estimate="13" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={updatePlayer} />
            <Estimate estimate="?" players={roomState?.players} gradientFrom="#0A83A0" gradientTo="#0A83A0" setEstimation={updatePlayer} />
        </SimpleGrid>
        <Space h="lg" />
    </>
};

export default Room;


async function createPlayer(playerName: string) {
    // 1. if it doesn't exist, then create a new player on the server
    type OmitId = Omit<RoomStatePlayer, "uid">;
    const player: OmitId = {
        "name": playerName,
        "estimate": "None"
    }
    const response = await fetch(`/api/player`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(player)
    });

    return response.json();
}