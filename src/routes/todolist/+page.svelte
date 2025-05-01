<script>
  import { eq } from 'drizzle-orm';
  import { conn } from '$lib/db';
  import * as tabela from '$lib/db/schema';
  import { onMount } from 'svelte';
  import Modal from '$lib/components/Modal.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import ToDoList from '$lib/components/ToDoList.svelte';
  import * as bootstrap from 'bootstrap';

  let novaTarefa = $state('');
  let tarefas = $state([]);
  let tarefasPendentes = $derived(tarefas.filter((tarefa) => tarefa.status == 0));
  let tarefasConcluidas = $derived(tarefas.filter((tarefa) => tarefa.status == 1));
  let conteudoTarefaEditando = $state('');
  let tarefaEditando = $state();
  let tarefaExcluindo;
  let mensagemToast;

  async function initDatabase() {
    await conn.initialize();
    tarefas = await conn.db.select().from(tabela.tarefa);
  }

  async function adicionarTarefa() {
    novaTarefa = novaTarefa.trim();
    if (!novaTarefa) {
      mensagemToast.show();
      return;
    }

    const [tarefa] = await conn.db.insert(tabela.tarefa).values({ conteudo: novaTarefa }).returning();
    tarefas.push(tarefa);
    conn.save();
    novaTarefa = '';
  }

  function editarTarefa(tarefa) {
    tarefaEditando = tarefa;
    conteudoTarefaEditando = tarefa.conteudo;
  }

  function confirmarEdicao() {
    conteudoTarefaEditando = conteudoTarefaEditando.trim();
    if (!conteudoTarefaEditando) {
      mensagemToast.show();
      return;
    }

    tarefaEditando.conteudo = conteudoTarefaEditando;
    conn.db
      .update(tabela.tarefa)
      .set({ conteudo: conteudoTarefaEditando })
      .where(eq(tabela.tarefa.id, tarefaEditando.id))
      .then(() => conn.save());
    tarefaEditando = undefined;
  }

  function cancelarEdicao() {
    tarefaEditando = undefined;
  }

  function excluirTarefa(tarefa) {
    tarefaExcluindo = tarefa;
  }

  function confirmarExclusao() {
    conn.db
      .delete(tabela.tarefa)
      .where(eq(tabela.tarefa.id, tarefaExcluindo.id))
      .then(() => conn.save());
    tarefas.splice(tarefas.indexOf(tarefaExcluindo), 1);
  }

  function alterarStatus(tarefa, status) {
    tarefa.status = status;
    conn.db
      .update(tabela.tarefa)
      .set({ status })
      .where(eq(tabela.tarefa.id, tarefa.id))
      .then(() => conn.save());
  }

  onMount(() => {
    mensagemToast = new bootstrap.Toast('#mensagemToast');
  });

  initDatabase();
</script>

<div class="fixed-top pt-5" style="z-index: 1020;">
  <form class="container-fluid input-group px-4 pt-3" onsubmit={adicionarTarefa}>
    <input class="form-control form-control-lg" placeholder="Nova tarefa" bind:value={novaTarefa} />
    <button type="submit" class="btn btn-primary input-group-text" aria-label="adicionar"> <i class="bi bi-plus-lg"></i> </button>
  </form>
  <Toast msg={'Digite algo!'} />
</div>

<div class="container-fluid mt-5 pt-3">
  <ToDoList tarefas={tarefasPendentes} {tarefaEditando} bind:conteudoTarefaEditando {confirmarEdicao} {cancelarEdicao} {alterarStatus} {editarTarefa} {excluirTarefa} />
  <hr />
  <ToDoList tarefas={tarefasConcluidas} {tarefaEditando} bind:conteudoTarefaEditando {confirmarEdicao} {cancelarEdicao} {alterarStatus} {editarTarefa} {excluirTarefa} />
</div>

<Modal msg={'Deseja excluir a tarefa?'} acao={confirmarExclusao} />
