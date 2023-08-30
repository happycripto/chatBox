import { Router } from "express";

const router = Router();

let users = [];

router.get('/api/user', (req, res) => {
    res.send(users);
})

router.post('/api/user', (req, res) => {
    let user = req.body;

    if (!user.firstName || !user.lastName || !user.id) {
        return res.status(400).send({ status: 'error', error: 'Valores incompletos' })
    }

    users.push(user);
    res.send({ status: 'success', message: 'Usuario creado' });
})

export default router