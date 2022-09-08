import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { insertFighter, locateFighter } from '../repositories/userRepository';

export async function validateUsers(req: Request, res: Response, next: NextFunction) {
    const users = req.body;

    try {
        const { data: firstUser } = await axios.get(`https://api.github.com/users/${users.firstUser}/repos`);
        const { data: secondUser } = await axios.get(`https://api.github.com/users/${users.secondUser}/repos`);

        if (firstUser.message || secondUser.message) {
            return res.status(404).send("User not found");
        }

        res.locals.firstUser = firstUser;
        res.locals.secondUser = secondUser;

        const { rows: findFirstFighter } = await locateFighter(users.firstUser);
        const { rows: findSecondFighter } = await locateFighter(users.secondUser);

        if (findFirstFighter.length === 0) {
            await insertFighter(users.firstUser);
        }

        if (findSecondFighter.length === 0) {
            await insertFighter(users.secondUser)
        }

        next();
    } catch (err) {
        res.status(500).send("On validateUsers: " + err);
    }
}