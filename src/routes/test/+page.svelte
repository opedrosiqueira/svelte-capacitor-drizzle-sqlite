<div class="text-bg-primary p-3">Primary with contrasting color</div>
<div class="text-bg-secondary p-3">Secondary with contrasting color</div>
<div class="text-bg-success p-3">Success with contrasting color</div>
<div class="text-bg-danger p-3">Danger with contrasting color</div>
<div class="text-bg-warning p-3">Warning with contrasting color</div>
<div class="text-bg-info p-3">Info with contrasting color</div>
<div class="text-bg-light p-3">Light with contrasting color</div>
<div class="text-bg-dark p-3">Dark with contrasting color</div>


<style>
  .container {
    margin-top: 1rem;
  }

  div > div {
    border: 1px solid var(--bs-secondary-border-subtle);
  }
  div > div > div {
    background-color: var(--bs-primary-bg-subtle);
    border: 1px solid var(--bs-primary-border-subtle);
  }
</style>
