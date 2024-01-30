import "dotenv/config";
import createApp from "./app.js";
const port = process.env.PORT || 5000;

const app = createApp();

app.listen(port, () => { console.log("Server started successfully"); });