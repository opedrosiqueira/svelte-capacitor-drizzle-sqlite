<script>
	import { eq } from 'drizzle-orm';
	import { conn } from '$lib/db';
	import * as tabela from '$lib/db/schema';
	import { onMount } from 'svelte';
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

	async function initDatabase() {
		await conn.initialize();
		notas = await conn.db.select().from(tabela.nota);
	}

	async function adicionarNota() {
		novaNota = novaNota.trim();
		if (!novaNota) {
			mensagemToast.show();
			return;
		}

		const [nota] = await conn.db.insert(tabela.nota).values({ conteudo: novaNota }).returning();
		notas.push(nota);
		conn.save();
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
		conn.db
			.update(tabela.nota)
			.set({ conteudo: conteudoNotaEditando })
			.where(eq(tabela.nota.id, notaEditando.id))
			.then(() => conn.save());
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
		conn.db
			.delete(tabela.nota)
			.where(eq(tabela.nota.id, notaExcluindo.id))
			.then(() => conn.save());
		notas.splice(notas.indexOf(notaExcluindo), 1);
	}

	function alterarStatus(nota, status) {
		nota.status = status;
		conn.db
			.update(tabela.nota)
			.set({ status })
			.where(eq(tabela.nota.id, nota.id))
			.then(() => conn.save());
	}

	onMount(() => {
		mensagemToast = new bootstrap.Toast('#mensagemToast');
		alertaModal = new bootstrap.Modal('#alertaModal');
	});

	initDatabase();
</script>

<div class="sticky-top">
	<nav class="navbar bg-body-tertiary">
		<div class="mx-auto navbar-brand">To-Do List</div>
	</nav>

	<div class="container-fluid mt-3 input-group mb-3">
		<input
			class="form-control form-control-lg"
			placeholder="Nova nota"
			bind:value={novaNota}
			onkeydown={(e) => e.key == 'Enter' && adicionarNota() && e.preventDefault()}
		/>
		<button class="btn btn-primary input-group-text" aria-label="adicionar" onclick={adicionarNota}>
			<i class="bi bi-plus-lg"></i>
		</button>
	</div>

	<Toast msg={'Digite algo!'} />
</div>

<div class="container-fluid mt-3">
	<ToDoList
		notas={notasFazendo}
		{notaEditando}
		bind:conteudoNotaEditando
		{confirmarEdicao}
		{cancelarEdicao}
		{alterarStatus}
		{editarNota}
		{excluirNota}
	/>
	<hr />
	<ToDoList
		notas={notasFeitas}
		status={0}
		{notaEditando}
		bind:conteudoNotaEditando
		{confirmarEdicao}
		{cancelarEdicao}
		{alterarStatus}
		{editarNota}
		{excluirNota}
	/>
</div>

<footer class="navbar bg-body-tertiary fixed-bottom">
	<div class="container-fluid">Made with SvelteKit, CapacitorJS, Drizzle, Sql.js and Bootstrap</div>
</footer>

<div class="modal fade" id="alertaModal" tabindex="-1">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-body">Tem certeza que quer excluir?</div>
			<div class="modal-footer">
				<button class="btn btn-danger" data-bs-dismiss="modal" onclick={confirmarExclusao}>
					Sim
				</button>
				<button class="btn btn-primary" data-bs-dismiss="modal">Cancelar</button>
			</div>
		</div>
	</div>
</div>
