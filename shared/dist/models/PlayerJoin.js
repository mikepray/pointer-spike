var PlayerJoin = /** @class */ (function () {
    function PlayerJoin(roomId, clientName, message) {
        if (clientName === void 0) { clientName = ""; }
        if (message === void 0) { message = ""; }
        this.roomId = roomId;
        this.clientName = clientName;
        this.message = message;
    }
    return PlayerJoin;
}());
export { PlayerJoin };
