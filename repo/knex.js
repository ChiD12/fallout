import knex from 'knex';
import * as path from 'path';
const __dirname = path.resolve();

export const connectedKnex = knex({
    client: "sqlite3",
    connection:{
        filename: "./db.sqlite3"
    },
    useNullAsDefault: true
})