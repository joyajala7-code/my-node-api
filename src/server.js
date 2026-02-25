import express from "express";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();
import {connectToDB} from "./config/dbConnect.js";
const app = express();
import cookieParser from "cookie-parser";
app.use(cookieParser());
import cors from 'cors'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials:true
}
));

connectToDB();
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log("Connected to MongoDB OR Database connected successfully"))
//     .catch((err) => {
//         console.log("Error connecting to MongoDB:", err)
// });

app.use("/", userRoutes);

const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

if (process.env.NODE_ENV !== "production") {
    console.log("Server is running on port 2000 in development mode");
}
export default app;
// You should never manually edit files inside node_modules because the folder is automatically generated and managed by package managers like npm or yarn. Whenever dependencies are installed, updated, or reinstalled, the entire node_modules folder can be rebuilt, which will erase any manual changes you made. Editing files there also breaks consistency across development environments since other developers or deployment systems will not have your local modifications, making bugs difficult to trace and reproduce. Additionally, manual edits can compromise dependency integrity, cause unexpected behavior, and create maintenance problems when libraries are updated. Instead of modifying node_modules directly, developers should use safer approaches like creating patches, forking the dependency, configuring overrides, or contributing fixes to the original library.