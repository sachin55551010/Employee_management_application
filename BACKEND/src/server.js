import { app } from "./app.js";
import { connectMongoDB } from "./utils/connectMongoDB.js";

const PORT = process.env.PORT;

connectMongoDB();

app.listen(PORT, () => console.log(`Server running at PORT : ${PORT}`));
