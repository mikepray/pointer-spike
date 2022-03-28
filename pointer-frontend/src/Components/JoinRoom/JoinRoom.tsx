import { Anchor, Box, Button, Group, SimpleGrid, TextInput } from "@mantine/core";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const JoinRoom = () => {
    const [roomId, setRoomId] = useState("");
    const [name, setName] = useState("Visitor");

    return <>
        <SimpleGrid cols={2}>
            <TextInput 
                label="Join Room" 
                description="Enter Room Number to Join"
                value={roomId}
                required
                onChange={(event) => setRoomId(event.currentTarget.value)}
            />
            <TextInput 
                label="Nickname" 
                description="Enter a name to show others"
                value={name} 
                required
                onChange={(event) => setName(event.currentTarget.value)}
            />
            <Button 
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }} 
                uppercase 
                size="md" 
                component={Link} 
                to={`/room/${roomId}/name/${name}`}
            >
                Join!
            </Button>
        </SimpleGrid>   

        <Outlet />
    </>
  };
  
  export default JoinRoom;