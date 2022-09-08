CREATE TABLE "pessoas" (
    "id" SERIAL PRIMARY KEY,
    "nome" VARCHAR(60) NOT NULL,
    "email" VARCHAR(60) NOT NULL UNIQUE,
    "cpf" VARCHAR(11) NOT NULL UNIQUE,
    "idade" INTEGER NOT NULL,
    "data_de_nascimento" DATE NOT NULL
);

CREATE TABLE "categorias" (
    "id" SERIAL PRIMARY KEY,
    "nome" VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE "racas" (
    "id" SERIAL PRIMARY KEY,
    "nome" VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE "pets" (
    "id" SERIAL PRIMARY KEY,
    "pessoaId" INTEGER NOT NULL REFERENCES "pessoas"("id"),
    "categoriaId" INTEGER NOT NULL REFERENCES "categorias"("id"),
    "racaId" INTEGER NOT NULL REFERENCES "racas"("id"),
    "nome" VARCHAR(60) NOT NULL,
    "idade" INTEGER NOT NULL
);

INSERT INTO "pessoas" ("nome", "email", "cpf", "idade", "data_de_nascimento")
VALUES ('Adriano', 'meuemail@gmail.com', '12345678910', '20', '2001-10-30');

INSERT INTO "pessoas" ("nome", "email", "cpf", "idade", "data_de_nascimento")
VALUES ('Leandro', 'emaildoleandro@gmail.com', '98765432102', '26', '1997-02-26');

INSERT INTO "categorias" ("nome")
VALUES ('repteis');

INSERT INTO "categorias" ("nome")
VALUES ('felinos');

INSERT INTO "racas" ("nome")
VALUES ('Maine Cool');

INSERT INTO "racas" ("nome")
VALUES ('Jabuti');

INSERT INTO "pets" ("pessoaId", "categoriaId", "racaId", "nome", "idade")
VALUES (1, 1, 2, 'Jeferson', 30);

INSERT INTO "pets" ("pessoaId", "categoriaId", "racaId", "nome", "idade")
VALUES (2, 2, 1, 'Teco', 9);

SELECT pessoas.nome AS "Nome", pets.nome AS "Nome do Pet", categorias.nome AS "Raca", racas.nome AS "Espécie" FROM "pets"
JOIN "categorias" ON categorias.id = pets."categoriaId"
JOIN "pessoas" ON pessoas.id = pets."pessoaId"
JOIN "racas" ON racas.id = pets."racaId"
ORDER BY "Nome" ASC;