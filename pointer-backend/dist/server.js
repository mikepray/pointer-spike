"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const issue_1 = __importDefault(require("./routes/issue")); // Route connected
const PORT = 8080;
//Create an app
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Hello world\n');
});
app.use('/issue', issue_1.default);
// Below route is triggered when any error is is thrown
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(PORT);
//Listen port
console.log(`Running on port ${PORT}`);
