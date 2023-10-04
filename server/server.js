import createApp from "./app.js";
import "dotenv/config";
const port = process.env.PORT || 5000;
const db = {};

const app = createApp(db);

app.listen(port, () => { console.log("Server started successfully"); });