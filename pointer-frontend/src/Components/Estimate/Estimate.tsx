import { Stack, Button, Group, Badge, Center, Avatar } from "@mantine/core";
import { RoomStatePlayer } from "pointer-shared/dist/models/RoomState";

interface EstimateProperties {
    estimate: string;
    players: RoomStatePlayer[] | undefined;
    gradientFrom: string;
    gradientTo: string;
    setEstimation: React.Dispatch<React.SetStateAction<string>>;
}

export const Estimate = (props: EstimateProperties) => {

    const colors = [
        "blue",
        "red",
        "lime",
        "indigo",
        "orange",
        "yellow",
        "green",
        "cyan",
        "pink",
        "grape",
        "black",
        "violet",
        "teal",
    ];

    const getColor = (index: number) => {
        return colors[index % colors.length];
    };

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

            {props?.players?.map((player: RoomStatePlayer, index) => {
                return player.estimate === props.estimate &&
                    <Badge key={player.uid} color={getColor(index)} variant="filled">{player.name}</Badge>

                }
            )}

        </Stack>
    </>
}