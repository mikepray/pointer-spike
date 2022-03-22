import { Anchor, Box, Button, Group, SimpleGrid, TextInput } from "@mantine/core";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const JoinRoom = () => {
    const [roomId, setValue] = useState('');

    return <>
        <SimpleGrid cols={1}>
            <TextInput 
                label="Join Room" 
                description="Enter Room Number to Join"
                value={roomId} 
                onChange={(event) => setValue(event.currentTarget.value)}
            />
            <Button 
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }} 
                uppercase 
                size="xl" 
                component={Link} 
                to={`/room/${roomId}`}
            >
                Join!
            </Button>
        </SimpleGrid>   

        <Outlet />
    </>
  };
  
  export default JoinRoom;