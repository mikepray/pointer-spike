import { Button, Modal, Space, TextInput } from '@mantine/core';

interface NameModalProperties {
    playerName: string;
    opened: boolean;
    setNameModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
}

export const NameModal = (props: NameModalProperties) => {
    return <Modal
        opened={props.opened}
        onClose={() => props.setNameModalOpened(false)}
        title="Introduce yourself!"
        withCloseButton={false}
        closeOnClickOutside={false}
        closeOnEscape={false}
        trapFocus={true}
    >

        <TextInput
            label="Nickname"
            description="Enter a name to show others"
            required
            value={props.playerName}
            onChange={(event) => props.setName(event.currentTarget.value)}
        />
        <Space h="md" />
        <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
            uppercase
            size="md"
            placeholder="Agile Wizard"
            disabled={props.playerName === ""}
            onClick={() => {props.setNameModalOpened(false)}}
        >Ok</Button>

    </Modal>
};