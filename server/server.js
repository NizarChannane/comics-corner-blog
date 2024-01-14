import "dotenv/config";
import createApp from "./app.js";
const port = process.env.PORT || 5000;


console.log(process.env.EMAIL_ACC);
console.log(process.env.EMAIL_PWD);

const app = createApp();

app.listen(port, () => { console.log("Server started successfully"); });