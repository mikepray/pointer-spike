import logo from './../../logo.svg';
import { useParams } from "react-router-dom";


const Room = () => {
    let params = useParams();

    return <>
        <h1>You're in Room {params.roomId}!</h1>
    </>
};

export default Room;