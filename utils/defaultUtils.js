import ClientModel from "../model/client.js";
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
