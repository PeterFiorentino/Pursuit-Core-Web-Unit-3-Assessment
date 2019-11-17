const express = require("express");
const router = express.Router();
const db = require("./researchers.js").db;

router.get("/", async (req, res) => {
    try {
        let sightings = await db.any(`
        SELECT researchers.namE AS researcher, species.name AS species, habitats.category AS habitat
        FROM researchers JOIN sightings ON researchers.id = sightings.researcher_id
                         JOIN species ON species.id = sightings.species_id
                         JOIN habitats ON habitats.id = sightings.habitat_id
                         `)
        res.json({
            status: "Success.",
            message: "Retrieved all the sightings.",
            payload: sightings
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not retrieve the sightings.",
            payload: null
        })
    }
});

router.get("/species/:id", async (req, res) => {
    let id = req.params.id;
    try {
    let sighting = await db.any(`SELECT * FROM sightings WHERE species_id = ${id}`)
        res.json({
            status: "Success.",
            message: `Retrieved all the sightings of species ${id}`,
            payload: sighting
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not retrieve the sightings.",
            payload: null
        })
    }
});

router.get("/researchers/:id", async (req, res) => {
    let id = req.params.id;
    try {
    let sighting = await db.any(`
    SELECT researchers.name AS researcher, species.name AS species, habitats.category AS habitat
    FROM researchers JOIN sightings ON researchers.id = sightings.researcher_id
                     JOIN species ON species.id = sightings.species_id
                     JOIN habitats ON habitats.id = sightings.habitat_id
    WHERE researchers.id = ${id}`);
        res.json({
            status: "Success.",
            message: `Retrieved all the sightings of researcher ${id}`,
            payload: sighting
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not retrieve the sightings.",
            payload: null
        })
    }
});

router.get("/habitats/:id", async (req, res) => {
    let id = req.params.id;
    try {
    let sighting = await db.any(`SELECT * FROM sightings WHERE habitat_id = ${id}`)
        res.json({
            status: "Success.",
            message: `Retrieved all the sightings in ${id}`,
            payload: sighting
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not retrieve the sightings.",
            payload: null
        })
    }
});

router.post("/", async (req, res) => {
    let researcherID = req.body.researcher_id;
    let speciesID = req.body.species_id;
    let habitatID = req.body.habitat_id;
    try {
        let sightingQuery = `
        INSERT INTO sightings (researcher_id, species_id, habitat_id)
        VALUES ($1, $2, $3)
        `
        let sighting = await db.none(sightingQuery, [researcherID, speciesID, habitatID])
        res.json({
            status: "Success.",
            message: "Added a new sighting."
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not add a new sighting."
        })
    }
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let sighting = await db.none(`DELETE FROM sightings WHERE id = ${id}`)
        res.json({
            status: "Success.",
            message: `Deleted sighting ${id}`
        })
    } catch (error) {
        res.json({
            status: "Error.",
            message: "Could not delete sighting"
        })
    }
})

module.exports = router;