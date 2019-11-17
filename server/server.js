const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;
const researchersRouter = require("./routes/researchers.js").router;
const speciesRouter = require("./routes/species.js");
const animalsRouter = require("./routes/animals.js");
const habitatsRouter = require("./routes/habitats");
const sightingsRouter = require("./routes/sightings");

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use("/researchers", researchersRouter);
app.use("/species", speciesRouter);
app.use("/animals", animalsRouter);
app.use("/habitats", habitatsRouter);
app.use("/sightings", sightingsRouter);

app.listen(port, () => {
    console.log(`The server is running at port ${port}`);
});