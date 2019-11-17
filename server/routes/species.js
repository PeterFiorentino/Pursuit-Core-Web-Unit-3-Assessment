const express = require("express");
const router = express.Router();
const db = require("./researchers.js").db;


router.get('/', async (req, res) => {
    try {
        let species = await db.any('SELECT * FROM species')
        res.json({
            status: "Success.",
            message: "Retrieved all of the species.",
            payload: species
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not retrieve the users.",
            payload: null
        })
    }
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let species = await db.one(`SELECT * FROM species WHERE id = ${id}`)
        res.json({
            status: "Success.",
            message: `Retrieved species with the ID ${id}`,
            payload: species
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not retrieve species.",
            payload: null
        })
    }
});

router.post('/', async (req, res) => {
    let name = req.body.name;
    let mammal = req.body.is_mammal;
    try {
        let speciesQuery = `
        INSERT INTO species (name, is_mammal)
        VALUES ($1, $2) 
        `
        let species = await db.none(speciesQuery, [name, mammal])
        res.json({
            status: "Success.",
            message: `${name} was added to species.`
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: `Could not add ${name} to species.`
        })
    }
});

module.exports = router;