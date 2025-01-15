export const load = async ({ fetch }: any) => {
	const countRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
	const countData = await countRes.json();
	const totalPokemon = countData.count;

	// // Generate 10 random unique pokemon IDs
	const randomIds = new Set();
	while (randomIds.size < 10) {
		randomIds.add(Math.floor(Math.random() * totalPokemon) + 1);
	}

	// Fetch data for each random pokemon
	const pokemonPromises = Array.from(randomIds).map(async id => {
		try {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
			return await response.json();
		} catch (error) {
			console.error(`Error fetching pokemon ${id}:`, error);
			return null;
		}
	});

	const pokemonData = (await Promise.all(pokemonPromises)).filter(Boolean);

	const cards = pokemonData.map((p) => ({
		type: 'pokemon',
		key: p.id,
		id: p.id,
		data: {
			id: p.id,
			name: p.name,
			image: p.sprites.other['official-artwork'].front_default,
			types: p.types.map((t:any) => t.type.name)
		}
	}));

	return {
		cards,
	}
};