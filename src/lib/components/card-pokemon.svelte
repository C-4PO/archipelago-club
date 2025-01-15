<script>
  const {
    name,
    id,
    image,
    types,
    description,
    moves,
    hp,
    defense,
    speed,
    color,
    hasPrevious,
    hasNext,
    onsubmit,
  } = $props();

  // Map Pokemon types to Tailwind colors
  const typeColorMap = {
    normal: 'from-gray-400',
    fire: 'from-orange-400',
    water: 'from-blue-400',
    electric: 'from-yellow-400',
    grass: 'from-green-400',
    ice: 'from-cyan-400',
    fighting: 'from-red-400',
    poison: 'from-purple-400',
    ground: 'from-amber-600',
    flying: 'from-indigo-400',
    psychic: 'from-pink-400',
    bug: 'from-lime-400',
    rock: 'from-stone-400',
    ghost: 'from-violet-400',
    dragon: 'from-indigo-600',
    dark: 'from-gray-700',
    steel: 'from-slate-400',
    fairy: 'from-pink-300'
  };

  const typeColorMapTo = {
    normal: 'to-gray-400',
    fire: 'to-orange-400',
    water: 'to-blue-400',
    electric: 'to-yellow-400',
    grass: 'to-green-400',
    ice: 'to-cyan-400',
    fighting: 'to-red-400',
    poison: 'to-purple-400',
    ground: 'to-amber-600',
    flying: 'to-indigo-400',
    psychic: 'to-pink-400',
    bug: 'to-lime-400',
    rock: 'to-stone-400',
    ghost: 'to-violet-400',
    dragon: 'to-indigo-600',
    dark: 'to-gray-700',
    steel: 'to-slate-400',
    fairy: 'to-pink-300'
  };

  // Generate background gradient class based on types
  const getBackgroundClass = (types) => {
    if (types.length === 1) {
      const color = typeColorMap[types[0]] || 'from-gray-400';
      return `bg-gradient-to-b ${color} ${color.replace('from-', 'to-')}`;
    } else if (types.length >= 2) {
      const firstColor = typeColorMap[types[0]] || 'from-gray-400';
      const secondColor = typeColorMapTo[types[1]] || 'to-gray-400';
      return `bg-gradient-to-b ${firstColor} ${secondColor}`;
    }
    return 'bg-gray-400'; // fallback
  };

  const backgroundClass = getBackgroundClass(types);

  // Original color mapping for the content areas
  const colorMap = {
    black: ['bg-gray-800', 'bg-gray-100'],
    blue: ['bg-blue-200', 'bg-blue-50'],
    brown: ['bg-amber-200', 'bg-amber-50'],
    gray: ['bg-gray-200', 'bg-gray-50'],
    green: ['bg-green-200', 'bg-green-50'],
    pink: ['bg-pink-200', 'bg-pink-50'],
    purple: ['bg-purple-200', 'bg-purple-50'],
    red: ['bg-red-200', 'bg-red-50'],
    white: ['bg-gray-100', 'bg-gray-50'],
    yellow: ['bg-yellow-200', 'bg-yellow-50']
  };

  const [bgColor, lightBgColor] = colorMap[color] || ['bg-gray-100', 'bg-gray-50'];

  console.log('Color:', color); // Debug log
  console.log('BgColor:', bgColor); // Debug log
  console.log('LightBgColor:', lightBgColor); // Debug log

  const handlePrevious = () => {
    console.log('Previous');
  }

  // Type color mapping with background and text colors
  const typeStyles = {
    normal: { bg: 'bg-gray-400', text: 'text-white' },
    fire: { bg: 'bg-orange-400', text: 'text-white' },
    water: { bg: 'bg-blue-400', text: 'text-white' },
    electric: { bg: 'bg-yellow-400', text: 'text-black' },
    grass: { bg: 'bg-green-400', text: 'text-white' },
    ice: { bg: 'bg-cyan-400', text: 'text-black' },
    fighting: { bg: 'bg-red-500', text: 'text-white' },
    poison: { bg: 'bg-purple-500', text: 'text-white' },
    ground: { bg: 'bg-amber-600', text: 'text-white' },
    flying: { bg: 'bg-indigo-400', text: 'text-white' },
    psychic: { bg: 'bg-pink-400', text: 'text-white' },
    bug: { bg: 'bg-lime-400', text: 'text-black' },
    rock: { bg: 'bg-stone-400', text: 'text-white' },
    ghost: { bg: 'bg-violet-500', text: 'text-white' },
    dragon: { bg: 'bg-indigo-600', text: 'text-white' },
    dark: { bg: 'bg-gray-700', text: 'text-white' },
    steel: { bg: 'bg-slate-400', text: 'text-white' },
    fairy: { bg: 'bg-pink-300', text: 'text-black' }
  };

  // Function to get type style
  const getTypeStyle = (type) => {
    return typeStyles[type] || { bg: 'bg-gray-400', text: 'text-white' };
  };
</script>

<div class="flex flex-col h-full gap-5 rounded-3xl justify-between p-5 {backgroundClass}">
  <div class="flex flex-col h-full gap-5 overflow-auto rounded-xl">
    <header class="text-white px-3 text-2xl flex justify-between" >
      <p class="flex flex-wrap text-white capitalize">
        {name}
      </p>
      <p class="flex flex-wrap text-white capitalize">
        #{id}
      </p>
    </header>
    <div class="flex rounded-xl {bgColor} justify-center items-center flex-col p-3">
      <img src={image} alt={name} class="w-48 h-48 object-contain" />
    </div>
    <div class="rounded-xl {lightBgColor} p-4 flex-grow h-full text-black">
      <div class="mb-4">
        <h3 class="text-sm font-bold mb-1">Types</h3>
        <div class="flex flex-wrap gap-2">
          {#each types as type}
            {@const typeStyle = getTypeStyle(type)}
            <span class="px-3 py-1 rounded-full {typeStyle.bg} {typeStyle.text} text-sm capitalize">{type}</span>
          {/each}
        </div>
      </div>
      <div class="mb-4">
        <h3 class="text-sm font-bold mb-1">Description</h3>
        <p class="text-sm">
          {description}
        </p>
      </div>
      
      <!-- Stats Section -->
      <div class="grid grid-cols-3 gap-2 mb-4">
        <div class="text-center {bgColor} rounded-lg p-2">
          <div class="font-bold text-sm">HP</div>
          <div class="text-sm">{hp}</div>
        </div>
        <div class="text-center {bgColor} rounded-lg p-2">
          <div class="font-bold text-sm">DEF</div>
          <div class="text-sm">{defense}</div>
        </div>
        <div class="text-center {bgColor} rounded-lg p-2">
          <div class="font-bold text-sm">SPD</div>
          <div class="text-sm">{speed}</div>
        </div>
      </div>

      <!-- Moves Section -->
      <div>
        <h3 class="text-sm font-bold mb-1">Moves</h3>
        <div class="space-y-2">
          {#each moves as move}
            <div class="{bgColor} rounded-lg p-2 flex justify-between items-center">
              <span class="capitalize text-sm">{move.name}</span>
              <span class="font-bold text-orange-500 text-sm">{move.power}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
  
  <div class="flex gap-3">
    {#if hasPrevious}
      <button
        class="btn-full w-full btn-primary btn-md rounded-3xl {bgColor}"
        onclick={() => onsubmit('previous')}
      >
        Previous
      </button>
    {/if}
    {#if hasNext}
      <button
        class="btn-full w-full btn-primary btn-md rounded-3xl {bgColor}"
        onclick={() => onsubmit('next')}
      >
        Next
      </button>
    {/if}
  </div>
</div>