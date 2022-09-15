import app from '../src/app';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import { prisma } from '../src/database';

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE items;`;
});

describe('Testa POST /items ', () => {
  it('Deve retornar 201, se cadastrado um item no formato correto', async () => {
    const body = {
      title: "Paçoca",
      url: "https://www.google.com",
      description: faker.random.words(3),
      amount: Number(faker.random.numeric(2))
    };

    const { status } = await supertest(app).post("/items").send(body);
    expect(status).toEqual(201);
  });
  it('Deve retornar 409, ao tentar cadastrar um item que exista', async () => {
    const body = {
      title: "Paçoca", //Como já foi adicionado um item chamado "Paçoca" no teste anterior, é pra dar erro 409
      url: "https://www.google.com",
      description: faker.random.words(3),
      amount: Number(faker.random.numeric(2))
    };

    const { status } = await supertest(app).post("/items").send(body);
    expect(status).toEqual(409);
  });
});

describe('Testa GET /items ', () => {
  it('Deve retornar status 200 e o body no formato de Array', async () => {
    const result = await supertest(app).get("/items");

    expect(result.status).toEqual(200);
    expect(result.body.length > 0).toBe(true);
  });
});

describe('Testa GET /items/:id ', () => {
  it('Deve retornar status 200 e um objeto igual a o item cadastrado', async () => {
    const { body: items } = await supertest(app).get("/items");

    const result = await supertest(app).get(`/items/${items[0].id}`);

    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject(items[0]);
  });
  it('Deve retornar status 404 caso não exista um item com esse id', async () => {
    const { status } = await supertest(app).get("/items/0");

    expect(status).toEqual(404);
  });
});
