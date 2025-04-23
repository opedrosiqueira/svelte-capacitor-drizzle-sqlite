<script>
  let { msg } = $props();
</script>

<div id="mensagemToast" class="toast align-items-center position-absolute top-100 start-50 translate-middle-x text-bg-warning" style="z-index: 999;">
  <div class="d-flex">
    <div class="toast-body">{msg}</div>
    <button class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
