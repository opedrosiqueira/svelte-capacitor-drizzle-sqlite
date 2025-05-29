<script>
  let display = $state('');
  let number = '';
  let result = $state(0);

  function input(digit) {
    number += digit;
    display = number;
  }

  function plus() {
    result += Number(number);
    number = '';
    display = result;
  }

  function equals() {
    display = Number(number) + result;
    result = 0;
    number = '';
  }
</script>

<div class="text-center mt-3">
  <div class="row mb-2">
    <div class="col"><input class="form-control" readonly bind:value={display} /></div>
  </div>
  <div class="row row-cols-4 g-2">
    <div class="col"><button class="btn bg-primary-subtle w-100">CE</button></div>
    <div class="col"><button class="btn bg-primary-subtle w-100">C</button></div>
    <div class="col"><button class="btn bg-primary-subtle w-100">±</button></div>
    <div class="col"><button class="btn bg-primary-subtle w-100">%</button></div>

    <div class="col"><button class="btn btn-primary w-100" onclick={() => input('7')}>7</button></div>
    <div class="col"><button class="btn btn-primary w-100" onclick={() => input('8')}>8</button></div>
    <div class="col"><button class="btn btn-primary w-100" onclick={() => input('9')}>9</button></div>
    <div class="col"><button class="btn bg-primary-subtle w-100">/</button></div>

    <div class="col"><button class="btn btn-primary w-100" onclick={() => input('4')}>4</button></div>
    <div class="col"><button class="btn btn-primary w-100" onclick={() => input('5')}>5</button></div>
    <div class="col"><button class="btn btn-primary w-100" onclick={() => input('6')}>6</button></div>
    <div class="col"><button class="btn bg-primary-subtle w-100">*</button></div>

    <div class="col"><button class="btn btn-primary w-100" onclick={() => input('1')}>1</button></div>
    <div class="col"><button class="btn btn-primary w-100" onclick={() => input('2')}>2</button></div>
    <div class="col"><button class="btn btn-primary w-100" onclick={() => input('3')}>3</button></div>
    <div class="col"><button class="btn bg-primary-subtle w-100">-</button></div>

    <div class="col"><button class="btn btn-primary w-100" onclick={() => input('0')}>0</button></div>
    <div class="col"><button class="btn bg-primary-subtle w-100">.</button></div>
    <div class="col"><button class="btn bg-primary-subtle w-100" onclick={equals}>=</button></div>
    <div class="col"><button class="btn bg-primary-subtle w-100" onclick={plus}>+</button></div>
  </div>
</div>
