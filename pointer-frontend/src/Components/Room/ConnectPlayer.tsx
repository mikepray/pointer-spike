import cookies from 'js-cookie';

export async function connectPlayer(playerName: string) {
    const playerUID = await getPlayerUID(playerName);
    
    
    // two ways to get the websocket to connect: 
    //  1. websocket send with the player UID (simplest)
    //  2. PATCH on player resource and send the entire websocket object. probably not good.
    // 1.b. websocket send with the player UID
    //      server updates its websocket client cache
}

async function getPlayerUID(playerName: string) {
    // 1. check for cookie. 
    const playerUid = cookies.get('planningPokerPlayerUid');
    if (playerUid !== undefined) {
        return playerUid;
    }
    // 1. if it doesn't exist, then create a new player on the server
    const response = await fetch(`/api/player`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            name: playerName,
            estimate: -1
        })
    });
    const data = await response.json();
    
    // TODO returns the cookie as data?    
    // 1.a. get the new player's UID from the POST response
    /*.then(data => {
        // save the cookie
        console.log(data)
        // cookies.set('planningPokerPlayerUid', data)
    });*/
}

async function addPlayerToRoom(roomId: string, playerUid: string) {
    return fetch(`/api/room/${roomId}/player/${playerUid}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',

        }
    })
    .then(response => {
        console.log(response);
        response.json();
    })
}