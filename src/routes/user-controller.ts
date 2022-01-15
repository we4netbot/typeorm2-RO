import express from 'express'
import { UserEnt } from '../entity/user-entity'
import { TeamService } from '../services/team-service';
import { UserService } from '../services/user-service'

const router = express.Router()
const userservice = new UserService();
const teamservice = new TeamService();

router.get('/', async (req, res) => {
    const { last_name, page, count } = req.query
    const user = await userservice.findAll(
        ((last_name || "") as string),
        parseInt(count as string),
        parseInt(page as string));
    return res.json(user)
})
router.post('/', async (req, res) => {
    const { first_name, last_name } = req.body;
    let user = new UserEnt();
    user.first_name = first_name;
    user.last_name = last_name;
    user = await userservice.insert(user)
    return res.json(user);
})
router.put('/:userId/new-team/:teamId', async (req, res) => {
    const { userId, teamId } = req.params;
    const user = await userservice.find(parseInt(userId))
    if (!user) {
        res.status(404).send("User is not found :(")
    }
    const team = await teamservice.find(parseInt(teamId))
    if (!team) {
        res.status(404).send("Team is not found :(")
    }
    const updatedUser = await userservice.addTeam(user, team);
    return res.json(updatedUser);
})
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userservice.find(parseInt(id))
        if (!user) {
            res.status(404).send("Not Found User !")
        }
        await userservice.delete(parseInt(id))
        return res.json(user);
    } catch (e) {
        res.status(500).send(`Error: ${e}`)
    }
})

export {
    router as UserController
}