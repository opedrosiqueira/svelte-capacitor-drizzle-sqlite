import initSqlJs from 'sql.js';
import fs from 'fs/promises';
import path from 'path';

const DB_NAME = 'mydatabase.db';
const DRIZZLE_FOLDER = './drizzle';
const OUTPUT_PATH = `./static/${DB_NAME}`;

async function initializeDatabase() {
    try {
        const SQL = await initSqlJs();
        const client = new SQL.Database();

        await executeMigrations(client);
        await saveDatabase(client);

        console.log(`✅ Database successfully created: ${DB_NAME}`);
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
}

async function executeMigrations(client) {
    try {
        const files = (await fs.readdir(DRIZZLE_FOLDER))
            .filter(file => file.endsWith('.sql'))
            .sort(); // Ensure correct execution order

        for (const file of files) {
            const filePath = path.join(DRIZZLE_FOLDER, file);
            const sqlCommands = await fs.readFile(filePath, 'utf-8');

            client.run(sqlCommands);
            console.log(`✔ Executed migration: ${file}`);
        }
    } catch (error) {
        throw new Error(`Error processing migrations: ${error.message}`);
    }
}

async function saveDatabase(client) {
    try {
        const buffer = Buffer.from(client.export());
        await fs.writeFile(OUTPUT_PATH, buffer);
        console.log(`💾 Database saved at: ${OUTPUT_PATH}`);
    } catch (error) {
        throw new Error(`Error saving database: ${error.message}`);
    }
}

initializeDatabase();