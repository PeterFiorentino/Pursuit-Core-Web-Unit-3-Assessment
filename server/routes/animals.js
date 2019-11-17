const express = require("express");
const router = express.Router();
const db = require("./researchers").db;

router.get('/',  async (req, res) => {
    try {
        let animals = await db.any('SELECT * FROM animals')
        res.json({
            status: "Success.",
            message: "Retrieved all of the animals.",
            payload: animals
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not find the animals.",
            payload: null
        })
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let animal = await db.one(`SELECT * FROM animals WHERE id = ${id}`)
        res.json({
            status: "Success.",
            message: `Received the animal with the ID ${id}.`,
            payload: animal
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not retrieve the animal.",
            payload: null
        })
    }
});

router.post('/', async (req, res) => {
    let nickname = req.body.nickname;
    let speciesID = req.body.species_id;
    try {
        let animalQuery = `
        INSERT INTO animals (nickname, species_id) 
        VALUES ($1, $2)
        `
        let newAnimal = await db.none(animalQuery, [nickname, speciesID])
        res.json({
            status: "Success.",
            message: `Added ${nickname} to animals.`,
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not add a new animal.",
            payload: null
        })
    }
});

router.patch('/:id', async (req, res) => {
    let id = req.params.id;
    let nickname = req.body.nickname;
    let speciesID = req.body.species_id; 
    try {
        if (speciesID && nickname) {
        let updateQuery = `UPDATE animals SET nickname = $1, species_id = $2 WHERE id = $3`
        let animal = await db.none(updateQuery, [nickname, speciesID, id])
        res.json({
            status: "Success.",
            message: "Updated animal's name and nickname and species."
        }) 
        } else if (speciesID) {
            let updateQuery = `UPDATE animals SET species_id = $1 WHERE id = $2`
        let animal = await db.none(updateQuery, [speciesID, id])
        res.json({
            status: "Success.",
            message: "Updated animal's species."
        }) 
        } else if (nickname) {
            let updateQuery = `UPDATE animals SET nickname = $1 WHERE id = $2`
        let animal = await db.none(updateQuery, [nickname, id])
        res.json({
            status: "Success.",
            message: "Updated the animal's nickname."
        }) 
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: "Error.",
            message: "Could not update the animal.",
            payload: null
        })
    }
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    try {
        let deletedAnimal = await db.none(`DELETE FROM animals WHERE id = ${id}`)
        res.json({
            status: "Success.",
            message: `Animal ${id} was deleted.`,
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not delete animal."
        })
    }
});


module.exports = router;