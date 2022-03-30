import { Stack, Button, Group, Badge, Center } from "@mantine/core";
import { RoomStatePlayer } from "pointer-shared/dist/models/RoomState";

interface EstimateProperties {
    estimate: string;
    players: RoomStatePlayer[] | undefined;
    gradientFrom: string;
    gradientTo: string;
    setEstimation: React.Dispatch<React.SetStateAction<string>>;
}

export const Estimate = (props: EstimateProperties) => {
    return <>
        <Stack justify="flex-start">
            <Button
                variant="gradient"
                gradient={{ from: props.gradientFrom, to: props.gradientTo, deg: 35 }}
                size="xl"
                onClick={() => {
                    props.setEstimation(props?.estimate);
                }}>
                {props.estimate}
            </Button>
            <Group>
            <Center>
                {props?.players?.map((player: RoomStatePlayer) => {
                    return player.estimate === props.estimate &&
                        <Badge key={player.uid}>{player.name}</Badge>
                }
                )}
                </Center>
            </Group>
        </Stack>
    </>
}