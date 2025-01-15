<script>
  import { run } from 'svelte/legacy';

  import ReviewerCard from "./reviewer-card.svelte";

  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  /**
   * @typedef {Object} Props
   * @property {any} [cards]
   * @property {number} [cardIndex]
   * @property {boolean} [enableReview]
   * @property {import('svelte').Snippet<[any]>} [children]
   */

  /** @type {Props} */
  let {
    cards = [],
    cardIndex = 0,
    enableReview = false,
    children
  } = $props();

  let carouselPosition = tweened(0, {
    duration: 500,
    easing: cubicOut,
  });

  function shiftSlide(cardIndex) {
    carouselPosition.set(cardIndex * 100);
  }
  run(() => {
    shiftSlide(cardIndex)
  });
</script>

<style>
  .card {
    flex: 0 0 100%;
  }

  @media (min-width: 716px) {
    .card {
      flex: 0 0 65%;
    }
    .card:first-child {
		  margin-left: 17.5%;
	  }
  }
</style>


<div class="w-full relative flex aspect-[13/20] md:aspect-[1/1]">
  {#each cards as card, index (card.key)}
    <div 
      class="card flex justify-center items-center font-size-24 relative aspect-[13/20] p-2"
      style="--i: {index}; transform: translateX(-{$carouselPosition}%);"
    >
      {@render children({ index, card, show: index >= cardIndex ||  index <= cardIndex, })}
    </div>
  {/each}
</div>
