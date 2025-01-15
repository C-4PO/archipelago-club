<script>
  let { children } = $props();
</script>

<div  class="rounded-[50px] h-full w-full overflow-hidden bg-secondary">
  {@render children()}
</div>