import { drizzle } from 'drizzle-orm/sql-js';
import initSqlJs from 'sql.js';
import { Filesystem, Directory } from '@capacitor/filesystem';
import * as schema from '$lib/db/schema'; // Import Drizzle schema

function base64ToUint8Array(base64) {
    // em breve, será implementada a melhor versão [Uint8Array.fromBase64()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/fromBase64)
    return new Uint8Array([...atob(base64)].map((char) => char.charCodeAt(0)));
}

function uint8ArrayToBase64(bytes) {
    // em breve, será implementada a melhor versão [Uint8Array.toBase64()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/toBase64)
    return btoa(String.fromCharCode(...bytes));
}

class Connection {
    constructor(dbName = 'mydatabase.db') {
        this.db = null;
        this.client = null;
        this.dbName = dbName;
    }

    async initialize() {
        if (this.db) {
            console.log('Database already initialized.');
            return this.db; // Prevent re-initialization
        }

        if (!(await this._databaseExists())) {
            await this._createDatabase();
        }

        const SQL = await initSqlJs();
        this.client = await this._loadDatabase(SQL);
        this.db = drizzle(this.client, { schema });

        return this.db;
    }

    async _databaseExists() {
        try {
            await Filesystem.stat({ path: this.dbName, directory: Directory.Data });
            return true;
        } catch {
            return false;
        }
    }

    async _loadDatabase(SQL) {
        console.log('Loading database...');
        const { data } = await Filesystem.readFile({
            path: this.dbName,
            directory: Directory.Data,
            encoding: 'utf8'
        });
        return new SQL.Database(base64ToUint8Array(data));
    }

    async _createDatabase() {
        console.log('Creating database...');

        const response = await fetch(`/${this.dbName}`);
        if (!response.ok) throw new Error('Failed to fetch initial database file.');

        const uint8array = new Uint8Array(await response.arrayBuffer());
        const base64Data = uint8ArrayToBase64(uint8array);

        await Filesystem.writeFile({
            path: this.dbName,
            data: base64Data,
            directory: Directory.Data,
            encoding: 'utf8'
        });
    }

    async save() {
        console.log('Saving database...');
        const data = this.client.export();
        const base64Data = uint8ArrayToBase64(data);

        await Filesystem.writeFile({
            path: this.dbName,
            data: base64Data,
            directory: Directory.Data,
            encoding: 'utf8'
        });
    }
}

export const conn = new Connection(); // // Export singleton instance