import { Button, Center, Container, Grid, Group, Space, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, Outlet, useNavigate } from "react-router-dom";

const JoinRoom = () => {

    let navigate = useNavigate();

    const handleSubmit = (values: typeof form.values) => {
        return navigate(`/room/${form.values.roomName}`);
    }

    const form = useForm({
        initialValues: {
            roomName: ""
        },
        validate: {
            roomName: (value: string) => value === "" ? "Room name is required" : null
        }
    });

    return <>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Container size="sm">
                <Stack>
                    <TextInput
                        label="Join a Room"
                        description="Enter room name or number to join. If it doesn't exist, it will be created."
                        required
                        size="lg"
                        {...form.getInputProps("roomName")}
                    />
                    <Space w="xl" />
                    <Group position="right">
                        <Button
                            variant="gradient"
                            color="turquoise"
                            uppercase
                            size="md"
                            type="submit"
                        >
                            Join!
                        </Button>
                    </Group>

                </Stack>
            </Container>
            <Outlet />
        </form>
    </>
};

export default JoinRoom;