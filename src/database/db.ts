import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'laravel',
    password: 'jervi175',
    port: 5432,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
