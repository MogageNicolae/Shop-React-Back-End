import express from 'express';
import bodyParser from 'body-parser';
import ClientModel from "../model/client.js";
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();
const jsonParser = bodyParser.json();
router.post('/register', jsonParser, async (req, res) => {
    ClientModel.findOne({ email: req.body.email }).exec().then((data) => {
        if (data !== null) {
            res.json('User already exists');
        }
        else {
            const client = new ClientModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                token: '',
                age: req.body.age,
            });
            client.save().then((data) => {
                res.json(data);
            });
        }
    });
});
router.post('/login', jsonParser, async (req, res) => {
    const bodyEmail = req.body.email;
    ClientModel.findOne({ email: bodyEmail, password: req.body.password }).exec().then((data) => {
        if (data) {
            data.token = uuidv4();
            ClientModel.updateOne({ email: bodyEmail }, data).exec();
            res.json({ token: data.token, id: data._id });
        }
        else {
            res.json('User not found.');
        }
    });
});
router.post('/logout', jsonParser, async (req, res) => {
    ClientModel.findOneAndUpdate({ token: req.header('Auth') }, { token: '' }).exec().then((data) => {
        if (data === null) {
            res.json('Invalid session.');
        }
        else {
            res.json('Logged out.');
        }
    });
});
export default router;
