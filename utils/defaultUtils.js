import ClientModel from "../model/client.js";
/**
 * Checks if the token of an user is valid.
 * @param req : express.Request - The request object.
 * @param res : express.Response - The response object.
 * @param clientId : string - The id of the user.
 * @param next : express.NextFunction - The next function.
 */
export const checkToken = (req, res, clientId, next) => {
    const token = req.header('Auth') || '';
    ClientModel.findById({ _id: clientId }).exec().then((data) => {
        if (data === null || token == '' || data.token != token) {
            res.json('Invalid session.');
            return;
        }
        next();
    });
};
//# sourceMappingURL=defaultUtils.js.map