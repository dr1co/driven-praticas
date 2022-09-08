import connection from "../databases/postgres";

export async function insertFighter(user: string) {
    return await connection.query(`
        INSERT INTO "fighters" ('username')
        VALUES ($1)
    `,
        [user]
    );
}

export async function locateFighter(user: string) {
    return await connection.query(`
        SELECT * FROM "fighters"
        WHERE "username" = $1
    `,
        [user]
    );
}

export async function updateFighter(user: string, result: string) {
    switch (result) {
        case 'win':
            return await connection.query(`
                UPDATE "fighters"
                SET "wins" = "wins" + 1
                WHERE "username" = $1
            `,
                [user]
            );
        case 'draw':
            return await connection.query(`
                UPDATE "fighters"
                SET "losses" = "losses" + 1
                WHERE "username" = $1
            `,
                [user]
            );
        case 'loss':
            return await connection.query(`
                UPDATE "fighters"
                SET "draws" = "draws" + 1
                WHERE "username" = $1
            `,
                [user]
            );
        default: 
            return 0;
    };
}

export async function orderRanking() {
    return await connection.query(`
        SELECT * FROM "fighters"
        ORDER BY "wins" DESC
        ORDER BY "draws" DESC
    `);
}