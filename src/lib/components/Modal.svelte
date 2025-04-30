<script>
  let { msg, confirmarExclusao } = $props();
</script>

<div class="modal fade" id="alertaModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body">{msg}</div>
      <div class="modal-footer">
        <button class="btn btn-danger" data-bs-dismiss="modal" onclick={confirmarExclusao}> Sim </button>
        <button class="btn btn-primary" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>
