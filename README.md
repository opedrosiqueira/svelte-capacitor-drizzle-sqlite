No diretório onde deseja salvar o projeto, execute:

```sh
pnpm dlx sv create svelte-capacitor-drizzle-sqlite
cd svelte-capacitor-drizzle-sqlite/
pnpm add -D @capacitor/cli drizzle-kit
pnpm add @capacitor/core @capacitor/android @capacitor/filesystem drizzle-orm sql.js bootstrap bootstrap-icons
npx cap init svelte-capacitor-drizzle-sqlite io.github.pedrosiqueira.svelteCapacitorDrizzleSqlite
npx cap add android
npx cap sync
code -r .
```

Quando solicitado, escolha as seguintes opções:

```
◇  Which template would you like?
│  SvelteKit minimal
│
◇  Add type checking with Typescript?
│  No
│
◇  What would you like to add to your project? (use arrow keys / space bar)
│  prettier, eslint, sveltekit-adapter
│
◇  sveltekit-adapter: Which SvelteKit adapter would you like to use?
│  static
│
◇  Which package manager do you want to install dependencies with?
│  pnpm
```

Modifique o valor da propriedade `"webDir"` do arquivo `capacitor.config.json` para `"build"`.

Adicione a propriedade `"migrate": "npx drizzle-kit generate && node runmigration.js"` no objeto `"scripts"` do arquivo `package.json`.

Adicione as seguintes linhas no locais adequados do arquivo `src/app.html`:

```html
<!-- essas vão no final do head -->
<link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<!-- essa vai no final do body -->
<script src="/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
```

Crie o arquivo `src/lib/db/schema.js`:

```js
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const nota = sqliteTable('nota', {
	id: integer().primaryKey({ autoIncrement: true }),
	status: integer().notNull(),
	conteudo: text().notNull()
})
```

Crie o arquivo `drizzle.config.json`:

```json
{
    "schema": "./src/lib/db/schema.js",
    "dialect": "sqlite",
    "out": "./drizzle"
}
```

Crie o arquivo `src/routes/+layout.js`:

```js
export const prerender = true;
export const ssr = false;
```

Copie o arquivo `node_modules/sql.js/dist/sql-wasm.wasm` para a pasta `static`.

Crie o arquivo `runmigration.js`:

```js
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
```

Crie o arquivo `src/lib/db/index.js`:

```js
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
            encoding: 'base64',
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
            encoding: 'base64',
        });
    }
}

export const conn = new Connection(); // // Export singleton instance
```

Edite o arquivo `src/routes/+page.svelte`.

```svelte

```

# Teste

Toda vez que você editar o arquivo `src/lib/db/schema.js`, execute `pnpm run migrate` para aplicar as modificações no aplicativo. O banco de dados do aplicativo deve ser excluído manualmente.

Execute `pnpm run dev`.

# Preparação pra construção

Instale o "commandlinetools" (https://developer.android.com/studio)

Para instalar o sdk, execute `./bin/sdkmanager.bat --sdk_root='sdks'  "platform-tools" "build-tools;35.0.1" "platforms;android-12"` na pasta do commandlinetools.

Configure variável de ambiente ANDROID_HOME para a pasta `sdks` do commandlinetools.

Execute `.\sdks\platform-tools\adb tcpip 5555`.

Habilite o developer mode no celular. Em developer options, habilite usb debugging.

## executando no celular


Veja o IP do teu cel, No Android, vá em Settings -> About Phone -> Status -> Ip address. Conecte o Linux ao Android, substituindo o endereço IP pelo de seu Android: adb connect 192.168.0.1:5555.

Execute `pnpm run build`.

Execute `npx cap run android --target 192.168.200.183:5555`


### Debugging in Chrome (for WebView)
If your app uses a WebView (for web content), you can debug it using Chrome DevTools:

Make sure your Android device is connected and has USB debugging enabled.
Open Chrome on your computer.
Go to chrome://inspect in the address bar.
You should see your device listed. Click on inspect under your app's WebView to open the Chrome DevTools for that WebView.

If you want to filter the logs to show only those related to your app, you can use: adb logcat | grep YOUR_PACKAGE_NAME

## gerando o apk

Com o sdk instalado, abra a pasta `android` do projeto e execute `./gradlew assembleDebug`. Será compilado o arquivo `android/app/build/outputs/apk/debug/app-debug.apk`.

Para instalar: adb install app/build/outputs/apk/debug/app-debug.apk

Se não tiver o ADB, você pode copiar o .apk para o celular e instalar manualmente.

# Observações

- https://getbootstrap.com/docs/5.3/components/navbar/#placement aqui fala "Fixed navbars use position: fixed, meaning they’re pulled from the normal flow of the DOM and may require custom CSS (e.g., padding-top on the <body>) to prevent overlap with other elements.". Por isso que coloquei style="margin-bottom: 4rem;" no body.
- desafio: fazer animação? https://svelte.dev/tutorial/svelte/animations
- será que depois de editar algum fonte devo executar `npx cap sync`?














