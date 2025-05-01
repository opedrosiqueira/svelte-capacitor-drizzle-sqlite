<script>
  let { tarefas, tarefaEditando, conteudoTarefaEditando = $bindable(), confirmarEdicao, cancelarEdicao, alterarStatus, editarTarefa, excluirTarefa } = $props();
</script>

{#each tarefas as tarefa}
  <div class="input-group mb-1 {tarefa.status == 1 ? 'text-decoration-line-through' : ''}">
    {#if tarefaEditando == tarefa}
      <input class="form-control form-control-lg" bind:value={conteudoTarefaEditando} />
      <button class="btn btn-primary input-group-text" aria-label="confirmar" onclick={confirmarEdicao}><i class="bi bi-check-lg"></i></button>
      <button class="btn btn-danger input-group-text" aria-label="cancelar" onclick={cancelarEdicao}><i class="bi bi-x-lg"></i></button>
    {:else}
      <button class="btn btn-success input-group-text" aria-label="concluir" onclick={() => alterarStatus(tarefa, tarefa.status == 0 ? 1 : 0)}><i class="bi bi-{tarefa.status == 1 ? 'list-task' : 'check-lg'}"></i></button>
      <span class="form-control form-control-lg">{tarefa.conteudo}</span>
      <button class="btn btn-warning input-group-text" aria-label="editar" onclick={() => editarTarefa(tarefa)}><i class="bi bi-pencil"></i></button>
      <button class="btn btn-danger input-group-text" aria-label="excluir" data-bs-toggle="modal" data-bs-target="#alertaModal" onclick={() => excluirTarefa(tarefa)}><i class="bi bi-trash"></i></button>
    {/if}
  </div>
{/each}
