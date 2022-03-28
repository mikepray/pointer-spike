import { SimpleGrid, Button, TextInput, Badge, Container, Group, Space, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerMessage, PlayerAction, PlayerJoin, ActionName, RoomState, BroadcastMessage } from "pointer-shared";
import { v4 as uuidv4 } from "uuid";
import SetName from "./SetName";

const Room = () => {
    let params = useParams();
    const [ws, setWebSocket] = useState<WebSocket>();
    const [roomState, setRoomState] = useState<RoomState>();
    const [uid, setUid] = useState("");

    const [oneEstPlayers, setOneEstPlayers] = useState<string[]>([])
    const [twoEstPlayers, setTwoEstPlayers] = useState<string[]>([])
    const [threeEstPlayers, setThreeEstPlayers] = useState<string[]>([])
    const [fiveEstPlayers, setFiveEstPlayers] = useState<string[]>([])
    const [eightEstPlayers, setEightEstPlayers] = useState<string[]>([])
    const [thirteenEstPlayers, setThirteenEstPlayers] = useState<string[]>([])

    useEffect(() => {
        setWebSocket(new WebSocket("ws://localhost:8080/socket"));
    }, []);
    useEffect(() => {
        console.log('sending client room join')
        if (ws !== undefined) {
            ws.onopen = () => {
                if (params.roomId !== undefined) {
                    ws.send(JSON.stringify(new PlayerMessage(new PlayerJoin(params.roomId))));
                }
            };
        }
    }, [ws]);

    const sendAction = (action: ActionName, actionValue: string) => {
        ws?.send((JSON.stringify(new PlayerMessage(undefined, new PlayerAction(uid, action, actionValue)))));
    }

    if (ws !== undefined) {
        ws.onmessage = event => {
            console.log(`onmessage`);
            const message = JSON.parse(event.data)
            if (message as BroadcastMessage && message?.roomState) {
                console.log(`setting room state ${JSON.stringify(message.roomState)}`);
                setRoomState(message.roomState);
            }
            if (message as PlayerMessage) {
                if (message?.playerJoin?.uid !== undefined) {
                    // save back the player uid assigned by the server
                    console.log(`Handshake successful, joined room: ${message.playerJoin.roomId}, UID: ${message.playerJoin.uid}`)
                    setUid(message.playerJoin.uid);
                }


                // TODO refactor all the below to use the server-generated state
                if (message?.broadcastPlayerAction !== undefined) {
                    console.log(`Received a broadcast message: ${JSON.stringify(message?.broadcastPlayerAction)}`);
                    if (message?.broadcastPlayerAction.actionName.toString() === ActionName.ESTIMATION_SELECTION.toString()) {
                        switch (message?.broadcastPlayerAction.actionValue) {
                            case "1": {
                                console.log("was one")
                                addPlayerEstimation(setOneEstPlayers, message?.broadcastPlayerAction.playerName);
                                break;
                            }
                            case "2": {
                                console.log("was two")
                                addPlayerEstimation(setTwoEstPlayers, message?.broadcastPlayerAction.playerName);
                                break;
                            }
                            case "3": {
                                console.log("was three")
                                addPlayerEstimation(setThreeEstPlayers, message?.broadcastPlayerAction.playerName);
                                break;
                            }
                            case "5": {
                                console.log("was five")
                                addPlayerEstimation(setFiveEstPlayers, message?.broadcastPlayerAction.playerName);
                                break;
                            }
                            case "8": {
                                console.log("was eight")
                                addPlayerEstimation(setEightEstPlayers, message?.broadcastPlayerAction.playerName);
                                break;
                            }
                            case "13": {
                                console.log("was thirteen")
                                addPlayerEstimation(setThirteenEstPlayers, message?.broadcastPlayerAction.playerName);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    const addPlayerEstimation = (setFunction: React.Dispatch<React.SetStateAction<string[]>>, playerName: string) => {
        setFunction(setter => {
            console.log("in func")
            const a: string[] = [];
            setter.forEach(el => a.push(el));
            a.push(playerName);
            return a;
        });
    }
    // oneEst.push(message?.broadcastPlayerAction.playerName);  
    // console.log(oneEst);
    // return [...oneEst]; // spread the old array to a new array to update the reference so that React will re-render effected components
    // TODO Why does the spread operator code above duplicate entries in the list?
    return <>
        <Text>Hi {params.name}, you're in Room {params.roomId}!</Text>
        <Space h="lg" />
        

        <SimpleGrid cols={6}>
            <Group>
                <Group>
                    {oneEstPlayers.map((item, index) =>
                        <div key={uuidv4()}><Badge key={uuidv4()}>{item}</Badge></div>
                    )}
                </Group>
                <Button color="red" variant="light" size="xl" onClick={() => { sendAction(ActionName.ESTIMATION_SELECTION, "1") }}>1</Button>
            </Group>
            <Group>
                <Group>
                    {twoEstPlayers.map((item, index) =>
                        <div key={uuidv4()}><Badge key={uuidv4()}>{item}</Badge></div>
                    )}
                </Group>
                <Button color="red" variant="light" size="xl" onClick={() => { sendAction(ActionName.ESTIMATION_SELECTION, "2") }}>2</Button>
            </Group>
            <Group>
                <Group>
                    {threeEstPlayers.map((item, index) =>
                        <div key={uuidv4()}><Badge key={uuidv4()}>{item}</Badge></div>
                    )}
                </Group>
                <Button color="red" variant="light" size="xl" onClick={() => { sendAction(ActionName.ESTIMATION_SELECTION, "3") }}>3</Button>
            </Group>
            <Group>
                <Group>
                    {fiveEstPlayers.map((item, index) =>
                        <div key={uuidv4()}><Badge key={uuidv4()}>{item}</Badge></div>
                    )}
                </Group>
                <Button color="red" variant="light" size="xl" onClick={() => { sendAction(ActionName.ESTIMATION_SELECTION, "5") }}>5</Button>
            </Group>
            <Group>
                <Group>
                    {eightEstPlayers.map((item, index) =>
                        <div key={uuidv4()}><Badge key={uuidv4()}>{item}</Badge></div>
                    )}
                </Group>
                <Button color="red" variant="light" size="xl" onClick={() => { sendAction(ActionName.ESTIMATION_SELECTION, "8") }}>8</Button>
            </Group>
            <Group>
                <Group>
                    {thirteenEstPlayers.map((item, index) =>
                        <div key={uuidv4()}><Badge key={uuidv4()}>{item}</Badge></div>
                    )}
                </Group>
                <Button color="red" variant="light" size="xl" onClick={() => { sendAction(ActionName.ESTIMATION_SELECTION, "13") }}>13</Button>
            </Group>

        </SimpleGrid>


    </>
};

export default Room;