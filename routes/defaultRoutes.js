import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
const jsonParser = bodyParser.json();
router.get('/', (req, res) => {
    res.json('Got a get request for the default route');
});
export default router;
//# sourceMappingURL=defaultRoutes.js.map