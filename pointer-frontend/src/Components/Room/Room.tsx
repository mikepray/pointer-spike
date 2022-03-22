import { SimpleGrid, Button } from "@mantine/core";
import { useParams } from "react-router-dom";

const Room = () => {
    let params = useParams();

    return <>
        <SimpleGrid cols={6}>
            <Button color="red" variant="light" size="xl">1</Button>
            <Button color="red" variant="light" size="xl">2</Button>
            <Button color="red" variant="light" size="xl">3</Button>
            <Button color="red" variant="light" size="xl">5</Button>
            <Button color="red" variant="light" size="xl">8</Button>
            <Button color="red" variant="light" size="xl">13</Button>
        </SimpleGrid>
        <h1>You're in Room {params.roomId}!</h1>
    </>
};

export default Room;