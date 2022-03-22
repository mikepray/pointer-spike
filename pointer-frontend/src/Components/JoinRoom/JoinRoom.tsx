import { Anchor, Box, Button, Group } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";

const JoinRoom = () => {
    return <>
        <Anchor component={Link} to="/room/1" key={1}>
            Join Room 1
        </Anchor>

        <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Lime green</Button>

        <Outlet />
    </>
  };
  
  export default JoinRoom;