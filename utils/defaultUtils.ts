import express from "express";
import ClientModel from "../model/client.js";

export const checkToken = (req: express.Request, res: express.Response, clientId: string, next: express.NextFunction) => {
    const token: string = req.header('Auth') || '';
    ClientModel.findById({_id: clientId}).exec().then(
        (data) => {
            if (data === null || token == '' || data.token != token) {
                res.json('Invalid session.');
                return;
            }
            next();
        });
}