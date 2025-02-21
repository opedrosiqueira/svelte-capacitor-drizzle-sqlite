<script>
	let {
		notas,
		notaEditando,
		conteudoNotaEditando = $bindable(),
		confirmarEdicao,
		cancelarEdicao,
		alterarStatus,
		editarNota,
		excluirNota,
		status = 1
	} = $props();

	let textDecoration = $derived(status == 0 ? 'text-decoration-line-through' : '');
	let statusButton = $derived(status == 0 ? 'list-task' : 'check-lg');
</script>

{#each notas as nota}
	<div class="input-group mb-1 {textDecoration}">
		{#if notaEditando == nota}
			<input class="form-control form-control-lg" bind:value={conteudoNotaEditando} />
			<button
				class="btn btn-primary input-group-text"
				aria-label="confirmar"
				onclick={confirmarEdicao}><i class="bi bi-check-lg"></i></button
			>
			<button class="btn btn-danger input-group-text" aria-label="cancelar" onclick={cancelarEdicao}
				><i class="bi bi-x-lg"></i></button
			>
		{:else}
			<button
				class="btn btn-success input-group-text"
				aria-label="concluir"
				onclick={() => alterarStatus(nota, status)}><i class="bi bi-{statusButton}"></i></button
			>
			<span class="form-control form-control-lg">{nota.conteudo}</span>
			<button
				class="btn btn-warning input-group-text"
				aria-label="editar"
				onclick={() => editarNota(nota)}><i class="bi bi-pencil"></i></button
			>
			<button
				class="btn btn-danger input-group-text"
				aria-label="excluir"
				onclick={() => excluirNota(nota)}><i class="bi bi-trash"></i></button
			>
		{/if}
	</div>
{/each}
