
<script>
	import CardPokemon from './card-pokemon.svelte';
	const { type, data, hasPrevious, hasNext, onsubmit } = $props();

  const componentMap = {
    pokemon: CardPokemon,
  }

  const Component = componentMap[type];
</script>


<Component {...data} hasPrevious={hasPrevious} hasNext={hasNext} onsubmit={onsubmit} />
