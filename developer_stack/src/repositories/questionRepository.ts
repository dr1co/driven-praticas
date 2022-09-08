import { prisma } from "../config/database";
import { IQuestionData } from "../types/questionTypes";

export async function insert(questionBody: IQuestionData) {
    const { askedBy, question } = questionBody;

    return await prisma.questions.create({
        data: {
            askedBy,
            question
        }
    });
}

export async function getAll() {
    return await prisma.questions.findMany();
}

export async function findById(id: number) {
    return await prisma.questions.findUnique({
        where: {
            id
        },
        include: {
            answers: true
        }
    });
}