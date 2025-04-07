## Criação do projeto

No diretório onde deseja salvar o projeto, execute:

```sh
pnpm dlx sv create svelte-capacitor-drizzle-sqlite
cd svelte-capacitor-drizzle-sqlite/
pnpm add -D @capacitor/cli drizzle-kit
pnpm add @capacitor/core @capacitor/android @capacitor/filesystem drizzle-orm sql.js bootstrap bootstrap-icons
npx cap init svelte-capacitor-drizzle-sqlite io.github.pedrosiqueira.svelteCapacitorDrizzleSqlite
npx cap add android
code -r .
```

Quando solicitado, escolha as seguintes opções:

```
┌  Welcome to the Svelte CLI! (v0.7.2)
│
◇  Which template would you like?
│  SvelteKit minimal
│
◇  Add type checking with TypeScript?
│  No
│
◆  Project created
│
◇  What would you like to add to your project? (use arrow keys / space bar)
│  prettier, eslint, sveltekit-adapter, drizzle
│
◇  sveltekit-adapter: Which SvelteKit adapter would you like to use?
│  static
│
◇  drizzle: Which database would you like to use?
│  SQLite
│
◇  drizzle: Which SQLite client would you like to use?
│  libSQL
│
◆  Successfully setup add-ons
│
◇  Which package manager do you want to install dependencies with?
│  pnpm
```

Quando solicitado `? Create free Ionic account? » (Y/n)`, digite `n`.

## Configuração do projeto

Modifique o valor da propriedade `"webDir"` do arquivo `capacitor.config.json` para `"build"`.

Adicione a propriedade `"migrate": "npx drizzle-kit generate && node runmigration.js"` no objeto `"scripts"` do arquivo `package.json`.

Adicione as seguintes linhas no locais adequados do arquivo `src/app.html`: (parei-aqui errado tem que corrigir depois. precisa importar dentro do script)

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

# Atualizando o banco

Toda vez que você editar o arquivo `src/lib/db/schema.js`, execute `pnpm migrate` para aplicar as modificações no aplicativo. O banco de dados do aplicativo deve ser excluído manualmente.

## ✅ Preparando para instalar o app no celular ou emulador

Depois de editar o código-fonte (HTML, JS, Svelte etc.) ou arquivos estáticos (CSS, imagens), e quiser testar no celular ou emulador, **construa o app com**:

```bash
pnpm build
```

Você também deve executar `npx cap sync` nas seguintes situações:

1. É a **primeira vez** que você executa o comando.
2. Você **adicionou, removeu ou atualizou** plugins (Capacitor ou Cordova) ou bibliotecas que envolvem código nativo (Android/iOS).
3. Alterou o arquivo `capacitor.config.ts` ou `capacitor.config.json` (ex: `appId`, `server.url`, `backgroundColor` etc.).

> 📌 Você *não precisa* rodar `npx cap sync` quando apenas edita o código-fonte ou arquivos estáticos.

---

## 📱 Instalando o app no emulador

Se você já seguiu o **Tutorial Preparando o Ambiente Android para CapacitorJS**, deve ter um emulador instalado. Para instalar o app no emulador:

```bash
npx cap run android
```

Se solicitado, selecione o emulador desejado.

---

## 📲 Instalando o app no celular

Você vai precisar do programa `adb`, que pode ser instalado seguindo o **Tutorial Preparando o Ambiente Android para CapacitorJS**.

### 🔌 Conectando o celular via cabo USB

1. Ative o **modo desenvolvedor** no celular (dependendo da versão, pode mudar):
   - Vá em *Configurações > Sobre o telefone* e toque várias vezes em “Número da versão” até ativar as opções de desenvolvedor.

2. Ative as **Opções do desenvolvedor** (dependendo da versão, pode mudar):
   - Vá até *Sistema > Avançado > Opções do desenvolvedor* e ative as opções:
   - **Opções do desenvolvedor**
   - **Depuração USB**
   - **Instalar via USB** (se disponível)

3. Conecte o celular ao computador. Aceite o pop-up “Permitir depuração USB” e marque "Sempre permitir".

> Se o pop-up não aparecer, desative e reative as opções do desenvolvedor e a depuração USB.

4. No terminal, verifique a conexão:

```bash
adb devices
```

5. Com o celular conectado e reconhecido, instale o app:

```bash
npx cap run android
```

Se solicitado, selecione o celular conectado.

---

### 📡 Conectando o celular via Wi-Fi

1. Ative o modo desenvolvedor e habilite a **depuração via Wi-Fi**.

2. Descubra o IP do celular (dependendo da versão, pode mudar):  
   *Configurações > Sobre o telefone > Status > Endereço IP*

3. No terminal:

```bash
adb tcpip 5555
adb connect x.x.x.x:5555
```

> Substitua `x.x.x.x` pelo IP de teu celular.

4. Instale o app via Wi-Fi:

```bash
npx cap run android --target x.x.x.x:5555
```

---

### 🛠 Instalando o app manualmente

Com o Android SDK instalado, você pode gerar o `.apk` manualmente:

```bash
cd android
./gradlew assembleDebug
```

O arquivo será gerado em:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

Para instalar via `adb`:

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

Ou copie o `.apk` para o celular e instale manualmente.

---

## 🐞 Debugando com o Chrome (WebView)

Você pode depurar teu app com o Chrome DevTools:

1. Conecte o celular com o `adb`.
2. Abra o Chrome no computador.
3. Acesse:  
   `chrome://inspect`
4. Clique em **"inspect"** abaixo do WebView de teu app para abrir as DevTools.

> 💡 Dica: você também pode adicionar `console.log` no código e o conteúdo será exibido no log da WebView.

Para acompanhar os logs gerados pelo aplicativo, filtrando pelas mensagens que você deseja ver, execute conforme teu sistema operacional:

Linux:

```bash
adb logcat | grep filtro
```

Windows:

```ps
adb logcat | Select-String -Pattern filtro
```

Onde `filtro` se refere à mensagem de log que queira filtrar.

---

## 📝 Observações

- Sobre navbar fixa com Bootstrap:
  > “Fixed navbars usam `position: fixed`, o que pode exigir ajustes de layout, como `padding-top` no `<body>` para evitar sobreposição.” — [Bootstrap docs](https://getbootstrap.com/docs/5.3/components/navbar/#placement)  
  Por isso foi usado `style="margin-bottom: 4rem;"` no `<body>`.

- Sugestão de desafio: implementar animações em Svelte usando o tutorial:  
  👉 https://svelte.dev/tutorial/svelte/animations

---
