export const load = async ({ fetch }: any) => {
	const countRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
	const countData = await countRes.json();
	const totalPokemon = countData.count;

	// Generate 10 random unique pokemon IDs
	const randomIds = new Set();
	while (randomIds.size < 10) {
		randomIds.add(Math.floor(Math.random() * totalPokemon) + 1);
	}

	// Fetch data for each random pokemon, including species data
	const pokemonPromises = Array.from(randomIds).map(async id => {
		try {
			const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
			const pokemonData = await pokemonResponse.json();
			
			// Fetch species data to get color and description
			const speciesResponse = await fetch(pokemonData.species.url);
			const speciesData = await speciesResponse.json();
			
			// Get English flavor text
			const englishFlavorText = speciesData.flavor_text_entries
				.find((entry: any) => entry.language.name === 'en')
				?.flavor_text
				.replace(/\f/g, ' ') // Replace form feed characters with spaces
				.replace(/\n/g, ' ') // Replace newlines with spaces
				|| 'No description available.';

			// Get two random moves
			const moves = pokemonData.moves
				.sort(() => 0.5 - Math.random())
				.slice(0, 2)
				.map((move: any) => ({
					name: move.move.name.replace('-', ' '),
					power: Math.floor(Math.random() * 50) + 30 // Random power between 30-80
				}));

			return {
				...pokemonData,
				species: speciesData,
				description: englishFlavorText,
				moves
			};
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
			types: p.types.map((t:any) => t.type.name),
			color: p.species.color.name,
			description: p.description,
			moves: p.moves,
			hp: Math.floor(p.stats[0].base_stat * 1.5), // HP scaled up for card game
			defense: p.stats[2].base_stat,
			speed: p.stats[5].base_stat
		}
	}));

	return {
		cards,
	}
};