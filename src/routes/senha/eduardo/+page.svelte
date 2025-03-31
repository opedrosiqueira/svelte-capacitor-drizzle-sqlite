<script>
    let tamanho = ""; 
    let quantidadeSenhas = ""; 
    let senhasGeradas = [];
    let incluirMaiusculas = true;
    let incluirMinusculas = true;
    let incluirNumeros = true;
    let incluirEspeciais = true;

    function botaocopiarsenha(index) {
        var copyText = document.getElementById("senha-" + index);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert("Senha copiada: " + copyText.value);
    
        
    }

    function gerarSenhas() {
        let caracteres = "";
        if (incluirMaiusculas) caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (incluirMinusculas) caracteres += "abcdefghijklmnopqrstuvwxyz";
        if (incluirNumeros) caracteres += "0123456789";
        if (incluirEspeciais) caracteres += "!@#$%^&*()_+{}[]:;<>,.?/";

        if (caracteres === "") {
            alert("Selecione pelo menos um tipo de caractere!");
            return;
        }

        senhasGeradas = [];
        for (let j = 0; j < quantidadeSenhas; j++) {
            let senha = "";
            for (let i = 0; i < tamanho; i++) {
                senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }
            senhasGeradas.push(senha);
        }
    }
</script>

<style>
    .container {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        text-align: center;
        width: 100%;
        max-width: 500px;
    }

    input, button {
        padding: 10px;
        font-size: 18px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        background-color: #007bff;
        color: white;
        cursor: pointer;
        
    }

    button:hover {
        background-color: #0056b3;
    }

    label {
        font-size: 18px;
        margin: 10px 0;
    }

    .senha-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
    }

    .senha {
        font-size: 20px;
        font-weight: bold;
        color: #333;
        flex: 1;
        text-align: left;
    }

    .senha-input {
        flex: 2;
        margin-right: 10px;
    }

    p {
        color: rgb(120, 120, 231);
        font-size: 18px;
        margin: 10px 0;
    }
    h3 {
        color: rgb(120, 120, 231);
        font-size: 24px;
        margin: 10px 0;
    }
</style>

<div class="container">
    <h3> GERADOR DE SENHA </h3>
    <br>
    <p>Escolha o tamanho da senha:</p>
    <input type="range" min="4" max="32" bind:value={tamanho} />
    <p>Tamanho: {tamanho}</p>
    <hr>
    
    <p>Escolha a quantidade de senhas:</p>
    <input type="number" min="1" max="10" bind:value={quantidadeSenhas} />
    <hr>
    <p>O que deve incluir sua senha?</p>
    <label><input type="checkbox" bind:checked={incluirMaiusculas} /> L. Maiúsculas</label>
    <label><input type="checkbox" bind:checked={incluirMinusculas} /> L. Minúsculas</label>
    <label><input type="checkbox" bind:checked={incluirNumeros} /> Números</label>
    <label><input type="checkbox" bind:checked={incluirEspeciais} /> Caracteres Especiais</label>

    <p><button type="button" on:click={gerarSenhas}>Gerar Senhas</button></p>
    <div id="senhas">
        {#each senhasGeradas as senha, index}
            <div class="senha-container">
                <p class="senha">Senha {index + 1}:</p>
                <input type="text" id="senha-{index}" value={senha} readonly class="senha-input" />
                <button on:click={() => botaocopiarsenha(index)}>Copiar</button>
            </div>
        {/each}
    </div>
    
 
</div>
