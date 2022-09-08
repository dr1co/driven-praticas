import { Request, Response } from 'express';
import * as questionRepository from '../repositories/questionRepository';
import * as answerRepository from '../repositories/answerRepository';

export async function createQuestion(req: Request, res: Response) {
  const question = req.body;

  try {
    await questionRepository.insert(question);

    res.status(200).send("Questão enviada com sucesso!");
  } catch (err: Error | any) {
    res.status(500).send("On createQuestion: " + err);
  }
}

export async function createAnswer(req: Request, res: Response) {
  const answer = req.body;
  const { id } = req.params;

  try {
    await answerRepository.insert(answer, Number(id));

    res.status(200).send("Resposta registrada com sucesso!");
  } catch (err: Error | any) {
    res.status(500).send("On createAnswer: " + err);
  }
}

export async function get(req: Request, res: Response) {
  try {
    const questions = await questionRepository.getAll();

    res.status(200).send(questions);
  } catch (err: Error | any) {
    res.status(500).send("On get: " + err);
  }
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const question = await questionRepository.findById(Number(id));

    res.status(200).send(question);
  } catch (err: Error | any) {
    res.status(500).send("On getById: " + err);
  }
}
