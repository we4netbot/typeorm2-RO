import express from 'express'
import { ForceEnt } from '../entity/force-entity'
import { ForceService } from '../services/force-service'
const router = express.Router()
const forceservice = new ForceService()


router.get('/', async (req, res) => {
    const { name, page, count } = req.query
    const force = await forceservice.findAll(
        (name || "") as string,
        parseInt(count as string),
        parseInt(page as string)
    );
    if (!force) {
        res.status(404).send("Not Found force !")
    }
    return res.json(force)
})
router.post('/', async (req, res) => {
    const { name } = req.body
    let force = new ForceEnt();
    force.name = name;
    force = await forceservice.insert(force)
    return res.json(force);
})
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    let force = await forceservice.find(parseInt(id))
    if (!force) {
        res.status(404).send("Not Found force !")
    }
    const Upforce = forceservice.Update(force, name);
    return res.json(Upforce);
})
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const force = await forceservice.find(parseInt(id))
        if (!force) {
            res.status(404).send("Not Found force !")
        }
        await forceservice.delete(parseInt(id))
        return res.json(force);
    } catch (e) {
        res.status(500).send(`Error: ${e}`)
    }
})

export {
    router as ForceController
}