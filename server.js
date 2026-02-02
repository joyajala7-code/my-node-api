import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 3000;

app.use("/", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
});

// You should never manually edit files inside node_modules because the folder is automatically generated and managed by package managers like npm or yarn. Whenever dependencies are installed, updated, or reinstalled, the entire node_modules folder can be rebuilt, which will erase any manual changes you made. Editing files there also breaks consistency across development environments since other developers or deployment systems will not have your local modifications, making bugs difficult to trace and reproduce. Additionally, manual edits can compromise dependency integrity, cause unexpected behavior, and create maintenance problems when libraries are updated. Instead of modifying node_modules directly, developers should use safer approaches like creating patches, forking the dependency, configuring overrides, or contributing fixes to the original library.