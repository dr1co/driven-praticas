import { prisma } from "../config/database";
import { IAnswerData } from "../types/answerTypes";

export async function insert(answerBody: IAnswerData, id: number) {
    const { answeredBy, answer } = answerBody;

    return await prisma.answers.create({
        data: {
            answeredBy,
            answer,
            questionId: id
        }
    });
}