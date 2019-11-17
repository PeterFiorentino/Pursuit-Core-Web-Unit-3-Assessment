const express = require("express");
const router = express.Router();

const pgp = require('pg-promise')();
const connection = "postgress://localhost:5432/database";
const db = pgp(connection);

router.get('/',  async (req, res) => {
    try {
        let researchers = await db.any('SELECT * FROM researchers')
        res.json({
            status: "Success.",
            message: "Retrieved all of the researchers.",
            payload: researchers
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not find the researchers.",
            payload: null
        })
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let researcher = await db.one(`SELECT * FROM researchers WHERE id = ${id}`)
        res.json({
            status: "Success.",
            message: `Received the researcher with the ID ${id}.`,
            payload: researcher
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not retrieve the researcher.",
            payload: null
        })
    }
});

router.post('/', async (req, res) => {
    let name = req.body.name;
    let jobTitle = req.body.job_title;
    try {
        let researcherQuery = `
        INSERT INTO researchers (name, job_title) 
        VALUES ($1, $2)
        `
        let newResearcher = await db.none(researcherQuery, [name, jobTitle])
        res.json({
            status: "Success.",
            message: `Added ${name} to the research team.`,

        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not add a new researcher.",
            payload: null
        })
    }
});

router.patch('/:id', async (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let jobTitle = req.body.job_title; 
    try {
        if (jobTitle && name) {
        let updateQuery = `UPDATE researchers SET name = $1, job_title = $2 WHERE id = $3`
        let researcher = await db.none(updateQuery, [name, jobTitle, id])
        res.json({
            status: "Success.",
            message: "Updated Researcher's name and job title."
        }) 
        } else if (jobTitle) {
            let updateQuery = `UPDATE researchers SET job_title = $1 WHERE id = $2`
        let researcher = await db.none(updateQuery, [jobTitle, id])
        res.json({
            status: "Success.",
            message: "Updated Researcher's job title."
        }) 
        } else if (name) {
            let updateQuery = `UPDATE researchers SET name = $1 WHERE id = $2`
        let researcher = await db.none(updateQuery, [name, id])
        res.json({
            status: "Success.",
            message: "Updated Researcher's name."
        }) 
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: "Error.",
            message: "Could not update the researcher.",
            payload: null
        })
    }
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    try {
        let deletedUser = await db.none(`DELETE FROM researchers WHERE id = ${id}`)
        res.json({
            status: "Success.",
            message: `Researcher ${id} was deleted.`,
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: "Error.",
            message: "Could not delete researcher."
        })
    }
});


module.exports = {db: db, router: router};