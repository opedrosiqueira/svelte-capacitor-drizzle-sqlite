<script>
    let tamanhoSenha = $state(8)
    let qtdSenhas = $state(1)
    let comMaiusculas = $state(true)
    let comMinusculas = $state(true)
    let comNumeros = $state(true)
    let comCaracteresEspeciais = $state(true)
    let senhasGeradas = $state([])
    let dialogErrorOpened = $state(false)
    const caracteresEspeciais = ["!", "#", "$", "%", "&", "*", "+", "-", ".", "?", "@"]
    import copyImg from '$lib/assets/copy.png'

    function generateNum(range){
        return Math.trunc(Math.random() * (range+1))
    }

    function gerarSenha(){
        if(!comMaiusculas && !comMinusculas && !comNumeros && !comCaracteresEspeciais || qtdSenhas < 1 || tamanhoSenha < 4){
            dialogErrorOpened = true
            return
        }
        let password = ""
        senhasGeradas = []
        for(let j = 0; j < qtdSenhas; j++){
            for(let i = 0; i < tamanhoSenha; i++){
                let char = ""
                while(char == ""){
                    char = gerarCaractere(generateNum(3))
                }
                password += char
            }
            senhasGeradas.push(password)
            password = ""
        }
    }

    function gerarCaractere(random){
        let caractere = ""
        if(random == 0 && comMaiusculas){
            caractere = String.fromCharCode(generateNum(25)+65)
        } else if(random == 1 && comMinusculas){
            caractere = String.fromCharCode(generateNum(25)+65).toLowerCase()
        } else if(random == 2 && comNumeros){
            caractere = String(generateNum(9))
        } else if(random == 3 && comCaracteresEspeciais){
            caractere = caracteresEspeciais[generateNum(caracteresEspeciais.length-1)]
        }

        return caractere
    }

    function copiar(idx){
        navigator.clipboard.writeText(senhasGeradas[idx])
    }
</script>

<center><h1>GERADOR DE SENHAS</h1></center>

<dialog open={dialogErrorOpened}>
    <center>
        <p>Você precisa gerar no mínimo 1 senha de 4 ou mais caracteres e selecionar no mínimo 1 categoria de caractere.</p>
        <button id="closeBtn" onclick={() => dialogErrorOpened = false}>FECHAR</button>
    </center>
</dialog>

<div class="box">
    {#if senhasGeradas.length > 0}
    <center><h3>Senhas:</h3></center>
    <div class="passwordsBox">
        {#each senhasGeradas as senha, i}
            <center><input class="passwordGeneratedInput" value={senha} disabled={true}> <button class="copyBtn" onclick={() => copiar(i)}><img src={copyImg} alt=""></button></center>
        {/each}
    </div>
    {/if}
    
    <center>
        <div id="selectsBox">
            Com letras maiúsculas? <br><input class="checks" type="checkbox" bind:checked={comMaiusculas}><br>
            Com letras minúsculas? <br><input class="checks" type="checkbox" bind:checked={comMinusculas}><br>
            Com números? <br><input class="checks" type="checkbox" bind:checked={comNumeros}><br>
            Com caracteres especiais? <br><input class="checks" type="checkbox" bind:checked={comCaracteresEspeciais}><br>
            Tamanho da senha: <br><input class="checks" type="number" bind:value={tamanhoSenha}><br><br>
            Quantidade de senhas: <br><input class="checks" type="number" bind:value={qtdSenhas}><br>
        </div>
    </center>
    <button id="generateBtn" onclick={gerarSenha}>GERAR SENHA</button>
</div>

<style>
* {
    font-family: 'Impact';
}
h1 {
    margin-top: 5%;
    color: white;
}
h3 {
    position: relative;
    left: 50%;
    top: 5%;
    transform: translate(-50%, 0px);
}
@keyframes show {
    0% {
        transform: scale(0) translate(-50%, -50%);
        left: 25%;
    }
    20% {
        transform: scale(0.2) translate(-50%, -50%);
        left: 30%;
    }
    40% {
        transform: scale(0.4) translate(-50%, -50%);
        left: 35%;
    }
    60% {
        transform: scale(0.6) translate(-50%, -50%);
        left: 40%;
    }
    80% {
        transform: scale(0.8) translate(-50%, -50%);
        left: 45%;
    }
    100% {
        transform: scale(1) translate(-50%, -50%);
        left: 50%;
    }
}
#closeBtn {
    color: black;
    background-color: red;
    width: 10rem;
    height: 2rem;
    margin-top: 8%;
    font-size: 18px;
}
dialog {
    border: 3px black solid;
    border-radius: 8px;
    width: 15rem;
    height: 15rem;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    box-shadow: 0 0 8px black;
    transition: 0.025s scale left;
    animation-name: show;
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-direction: normal;
}
:global(body) {
    background: linear-gradient(90deg, rgba(12,3,163,1) 0%, rgba(4,4,193,1) 35%, rgba(0,212,255,1) 100%);
}
.box {
    background-color: white;
    border-radius: 14px;
    width: 20rem;
    height: 38rem;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
    border: 4px rgb(12, 0, 117) solid;
    border-radius: 6px;
}
.passwordGeneratedInput {
    border: 3px solid black;
    border-radius: 8px;
    width: 80%;
    height: 40px;
    outline: 0;
    text-align: center;
    margin-bottom: 1%;
    color: black;
    font-size: 16px;
}
#selectsBox {
    flex-direction: row;
    flex-wrap: wrap;
    display: flexbox;
    padding-top: 3%;
}
#generateBtn {
    width: 35%;
    height: 40px;
    position: relative;
    top: 5%;
    left: 50%;
    transform: translate(-50%, 0px);
    background-color: rgb(4, 4, 196);
    color: white;
}
.copyBtn {
    background-color: chartreuse;
    width: 15%;
    height: 36px;
    position: relative;
    top: 5%;
}
button {
    border: none;
    border-radius: 6px;
    color: white;
}
.checks {
    border: 2px solid black;
    outline: 0px;
    border-radius: 6px;
    text-align: center;
}
.passwordsBox {
    overflow: auto;
    max-height: 20%;
    padding: 3%;
    border: 4px rgb(12, 0, 117) solid;
    border-radius: 6px;
}
img {
    object-fit: contain;
    width: 28px;
    height: 28px;
}
</style>