import createApp from "./app.js";
import "dotenv/config";
const port = process.env.PORT || 5000;

const app = createApp();

app.listen(port, () => { console.log("Server started successfully"); });