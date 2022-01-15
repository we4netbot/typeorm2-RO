import express from 'express'
import { TeamEnt } from '../entity/team-entity'
import { ForceService } from '../services/force-service'
import { TeamService } from '../services/team-service'

const router = express.Router()
const teamservice = new TeamService()
const forceservice = new ForceService()
router.get('/', async (req, res) => {
    const { name, page, count } = req.query
    const team = await teamservice.findAll(
        ((name || "") as string),
        parseInt(count as string),
        parseInt(page as string));
    return res.json(team)
})
router.post('/', async (req, res) => {
    const { name } = req.body
    let team = new TeamEnt();
    team.name = name;
    team = await teamservice.insert(team)
    return res.json(team);
})
router.put('/:teamId/new-force/:forceId', async (req, res) => {
    const { teamId, forceId } = req.params;
    const team = await teamservice.find(parseInt(teamId))
    if (!team) {
        res.status(404).send("Team is not found :(")
    }
    const force = await forceservice.find(parseInt(forceId))
    if (!force) {
        res.status(404).send("Force is not found :(")
    }
    const updatedTeam = await teamservice.addForce(team, force);
    return res.json(updatedTeam);
})
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await teamservice.find(parseInt(id))
        if (!team) {
            res.status(404).send("Not Found Team !")
        }
        await teamservice.delete(parseInt(id))
        return res.json(team);
    } catch (e) {
        res.status(500).send(`Error: ${e}`)
    }
})


export {
    router as TeamController
}