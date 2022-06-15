import { Button, Group, Modal, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface NameModalProperties {
    playerName: string;
    opened: boolean;
    onSubmit: (playerName: string) => void;
}

export const NameModal = (props: NameModalProperties) => {

    const handleSubmit = (values: typeof form.values) => {
        props.onSubmit(values.playerName);
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
            onClose={() => {}}
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