import { Button, Group, Modal, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

interface DisconnectedModalProperties {
    opened: boolean;
    onClick: () => void
}

export const DisconnectedModal = (props: DisconnectedModalProperties) => {

    return <>
        <Modal
            opened={props.opened}
            onClose={() => {props.onClick() }}
            title="Disconnected"
            withCloseButton={false}
            closeOnClickOutside={true}
            closeOnEscape={true}
            trapFocus={true}
        >
                <Text>The connection was lost. Click Ok to try again.</Text>
                <Group position="right" mt="md">
                    <Button
                        variant="gradient"
                        color="turquoise"
                        uppercase
                        size="md"
                        onClick={() => {props.onClick()}}
                    >Ok</Button>
                </Group>
        </Modal>
    </>
};