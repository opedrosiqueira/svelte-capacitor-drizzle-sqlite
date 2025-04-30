<script>
  import { onMount } from 'svelte';
  import Modal from '$lib/components/Modal.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import ToDoList from '$lib/components/ToDoList.svelte';
  import * as bootstrap from 'bootstrap';

  let novaNota = $state('');
  let notas = $state([]);
  let notasFazendo = $derived(notas.filter((nota) => nota.status == 0));
  let notasFeitas = $derived(notas.filter((nota) => nota.status == 1));
  let conteudoNotaEditando = $state('');
  let notaEditando = $state();
  let notaExcluindo;
  let alertaModal;
  let mensagemToast;

  async function adicionarNota() {
    novaNota = novaNota.trim();
    if (!novaNota) {
      mensagemToast.show();
      return;
    }
    notas.push({ conteudo: novaNota, status: 0 });
    novaNota = '';
  }

  function editarNota(nota) {
    notaEditando = nota;
    conteudoNotaEditando = nota.conteudo;
  }

  function confirmarEdicao() {
    conteudoNotaEditando = conteudoNotaEditando.trim();
    if (!conteudoNotaEditando) {
      mensagemToast.show();
      return;
    }

    notaEditando.conteudo = conteudoNotaEditando;
    notaEditando = undefined;
  }

  function cancelarEdicao() {
    notaEditando = undefined;
  }

  function excluirNota(nota) {
    notaExcluindo = nota;
    alertaModal.show();
  }

  function confirmarExclusao() {
    notas.splice(notas.indexOf(notaExcluindo), 1);
  }

  function alterarStatus(nota, status) {
    nota.status = status;
  }

  onMount(() => {
    mensagemToast = new bootstrap.Toast('#mensagemToast');
    alertaModal = new bootstrap.Modal('#alertaModal');
  });
</script>

<div class="fixed-top pt-5" style="z-index: 1020;">
  <form class="container-fluid input-group px-4 pt-3" onsubmit={adicionarNota}>
    <input class="form-control form-control-lg" placeholder="Nova nota" bind:value={novaNota} />
    <button type="submit" class="btn btn-primary input-group-text" aria-label="adicionar"> <i class="bi bi-plus-lg"></i> </button>
  </form>
  <Toast msg={'Digite algo!'} />
</div>

<div class="container-fluid mt-5 pt-3">
  <ToDoList notas={notasFazendo} {notaEditando} bind:conteudoNotaEditando {confirmarEdicao} {cancelarEdicao} {alterarStatus} {editarNota} {excluirNota} />
  <hr />
  <ToDoList notas={notasFeitas} {notaEditando} bind:conteudoNotaEditando {confirmarEdicao} {cancelarEdicao} {alterarStatus} {editarNota} {excluirNota} />
</div>

<Modal msg={'Deseja excluir a nota?'} {confirmarExclusao} />
