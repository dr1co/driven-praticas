import express from 'express';
import validateSchema from '../middlewares/validateSchemaMIddleware';
import battleSchema from '../schemas/battleSchema';
import { validateUsers } from '../middlewares/validateUsers';
import { clashUsers } from '../controllers/battleControllers';

const battleRouter = express.Router();

battleRouter.post("/battle", validateSchema(battleSchema), validateUsers, clashUsers);

export default battleRouter;