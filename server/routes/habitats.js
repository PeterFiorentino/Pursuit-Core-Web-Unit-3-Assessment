const express = require("express");
const router = express.Router();
const db = require("./researchers.js").db;


router.get('/', async (req, res) => {
    try {
        let habitats = await db.any('SELECT * FROM habitats')
        res.json({
            status: "Success.",
            message: "Retrieved all of the habitats.",
            payload: habitats
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not retrieve the habitats.",
            payload: null
        })
    }
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let habitat = await db.one(`SELECT * FROM habitats WHERE id = $1`, id)
        res.json({
            status: "Success.",
            message: `Retrieved the habitat with the ID ${id}`,
            payload: habitat
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not retrieve habitat.",
            payload: null
        })
    }
});

router.post('/', async (req, res) => {
    let category = req.body.category;
    try {
        let habitatQuery = `
        INSERT INTO habitats (category)
        VALUES ($1) 
        `
        let habitat = await db.none(habitatQuery, [category])
        res.json({
            status: "Success.",
            message: `${category} was added to habitats.`
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: `Could not add ${category} to habitats.`
        })
    }
});

module.exports = router;