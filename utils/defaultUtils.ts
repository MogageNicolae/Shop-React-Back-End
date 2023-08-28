import express from "express";
import ClientModel from "../model/client.js";

/**
 * Checks if the token of an user is valid.
 * @param req : express.Request - The request object.
 * @param res : express.Response - The response object.
 * @param clientId : string - The id of the user.
 * @param next : express.NextFunction - The next function.
 */
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