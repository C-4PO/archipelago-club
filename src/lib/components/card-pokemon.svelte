<script>
  const {
    name,
    id,
    image,
    types,
    hasPrevious,
    hasNext,
    onsubmit,
  } = $props();

  const handlePrevious = () => {
    console.log('Previous');
  }
</script>

<div class="flex flex-col h-full gap-5 rounded-3xl justify-between p-5">
  <div class="flex flex-col h-full gap-5 overflow-auto rounded-3xl">
    <header class="flex justify-center items-center flex-col">
      <img src={image} alt={name} class="w-48 h-48 object-contain" />
    </header>
    <div class="rounded-3xl bg-white p-3 text-black">
      <h3 class="text-xl font-bold text-center pb-1">Name</h3>
      <p class="flex justify-center flex-wrap">
        {name}
      </p>
    </div>
    <div class="rounded-3xl bg-white p-3 text-black">
      <h3 class="text-xl font-bold text-center pb-1">ID</h3>
      <p class="flex justify-center flex-wrap">
        #{id}
      </p>
    </div>
    <div class="rounded-3xl bg-white p-3 text-black">
      <h3 class="text-xl font-bold text-center pb-1">Types</h3>
      <p class="flex justify-center flex-wrap gap-2">
        {#each types as type}
          <span class="px-3 py-1 rounded-full bg-gray-200">{type}</span>
        {/each}
      </p>
    </div>
  </div>
  <div class="flex gap-2">
    {#if hasPrevious}
      <button
        class="btn-full w-full btn-primary btn-md rounded-3xl bg-[#fbedd7] "
        onclick={() => onsubmit('previous')}
      >
        Previous
      </button>
    {/if}
    {#if hasNext}
      <button
        class="btn-full w-full btn-primary btn-md rounded-3xl bg-[#fbedd7] "
        onclick={() => onsubmit('next')}
      >
        Next
      </button>
    {/if}
  </div>
</div>