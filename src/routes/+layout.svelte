<script>
	import "../app.css";
	import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition'
  import Logo from '$lib/svgs/logo.svelte';
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';
  let { data, children } = $props();
</script>

<div class="md:max-w-[717px] cardwidth:w-[450px] md:w-[717px] mx-auto p-3 flex flex-col">
	<header class="navbar bg-base-10 mb-3 bg-neutral rounded-md justify-between">
    <div class="flex">
      <a class="btn btn-ghost normal-case text-xl">Pokemon Cards</a>
    </div>
	</header>
  <main
    class="w-100 max-h-full bg-neutral rounded-[50px] md:rounded mb-3 overflow-hidden"
    in:fade|global={{ duration: 300, delay: 300 }}
    out:fade|global={{ duration: 300,  delay: 0}}
  >
    {@render children()}
  </main>
  <!-- <footer class="flex justify-between items-center footer p-4 bg-neutral text-neutral-content rounded">
    <div class="flex items-center">
      <!-- <Logo class="fill-current h-[36px] w-[36px]"/>
      <span class="text-center">Pokemon Cards</span>
    </div>
    <div class="flex gap-4">

    </div>
  </footer> -->
</div>
