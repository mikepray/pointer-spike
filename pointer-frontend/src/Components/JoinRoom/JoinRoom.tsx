import { Button, Grid, TextInput } from "@mantine/core";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const JoinRoom = () => {
    const [roomId, setRoomId] = useState("");

    return <>
        <Grid>
            <Grid.Col>
                <TextInput
                    label="Join Room"
                    description="Enter room name or number to join. If it doesn't exist, it will be created."
                    value={roomId}
                    required
                    size="lg"
                    onChange={(event) => setRoomId(event.currentTarget.value)}
                />

            </Grid.Col>
            <Grid.Col>
                <Button
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                    uppercase
                    size="md"
                    component={Link}
                    to={`/room/${roomId}`}
                >
                    Join!
                </Button>

                <Outlet />

            </Grid.Col>
        </Grid>
    </>
};

export default JoinRoom;