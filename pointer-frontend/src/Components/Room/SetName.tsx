import { Container, Group, TextInput, Button } from "@mantine/core";
import { ActionName } from "pointer-shared";

const SetName = (name: string, setName: (eventValue: string) => void, sendAction: (playerAction: ActionName, playerName: string) => void) => {

    return <>
        <Container size="xs" px="s">
            <Group direction="column">
                <TextInput
                    label="Enter nickname"
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                />
                <Button onClick={() => sendAction(ActionName.NICKNAME, name)}>Set Nickname</Button>
            </Group>
        </Container>
    </>

};

export default SetName;