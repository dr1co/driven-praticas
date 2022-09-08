import { Request, Response } from "express";
import { updateFighter } from "../repositories/userRepository";
import countStargazers from "../services/countStargazers";

export async function clashUsers(req: Request, res: Response) {
    const {firstUser, secondUser} = req.body
    const firstUserRepos = res.locals.firstUser;
    const secondUserRepos = res.locals.secondUser;

    const stargazersFirst = countStargazers(firstUserRepos);
    const stargazersSecond = countStargazers(secondUserRepos);

    try {
        if (stargazersFirst > stargazersSecond) {
            await updateFighter(firstUser, 'win');
            await updateFighter(secondUser, 'loss');

            res.status(200).send({
                winner: firstUser,
                loser: secondUser,
                draw: false
            });
        } else if (stargazersFirst < stargazersSecond) {
            await updateFighter(firstUser, 'loss');
            await updateFighter(secondUser, 'win');

            res.status(200).send({
                winner: secondUser,
                loser: firstUser,
                draw: false
            });
        } else {
            await updateFighter(firstUser, 'draw');
            await updateFighter(secondUser, 'draw');

            res.status(200).send({
                winner: null,
                loser: null,
                draw: true
            });
        }
    } catch (err) {
        res.status(500).send("On clashUsers: " + err);
    }
}