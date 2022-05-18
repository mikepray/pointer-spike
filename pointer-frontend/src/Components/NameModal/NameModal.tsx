import { Button, Group, Modal, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface NameModalProperties {
    playerName: string;
    opened: boolean;
    setNameModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
}

export const NameModal = (props: NameModalProperties) => {

    const handleSubmit = (values: typeof form.values) => {
        props.setName(values.playerName);
        props.setNameModalOpened(false);
    }

    const form = useForm({
        initialValues: {
            playerName: ""
        },
        validate: {
            playerName: (value: string) => value === "" ? "Name is required" : null
        }
    });

    return <>
        <Modal
            opened={props.opened}
            onClose={() => props.setNameModalOpened(false)}
            title="Introduce yourself!"
            withCloseButton={false}
            closeOnClickOutside={false}
            closeOnEscape={false}
            trapFocus={true}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Nickname"
                    description="Enter a name to show others"
                    required
                    placeholder="Agile Wizard"
                    {...form.getInputProps("playerName")}
                />
                <Space h="md" />
                <Group position="right" mt="md">
                    <Button
                        variant="gradient"
                        color="turquoise"
                        uppercase
                        size="md"
                        type="submit"
                    >Submit</Button>
                </Group>
            </form>
        </Modal>
    </>
};