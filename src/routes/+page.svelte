<script>
  import Reviewer from "$lib/components/reviewer.svelte";
  import ReviewerCard from '$lib/components/reviewer-card.svelte';
  import ReviewerBack from '$lib/components/reviewer-back.svelte';
  import ReviewerFront from '$lib/components/reviewer-front.svelte';
  import cardBackground from '$lib/images/card-background.png';
  import ReviewerFactory from '$lib/components/reviewer-factory.svelte';

  let { data } = $props();

  let currentIndex = $state(0);
  let cards = $state(data.cards);

  let isFlipped = $state(false);

  const handleSubmit = (action) => {
    if (action === 'previous') {
      currentIndex--;
    } else if (action === 'next') {
      currentIndex++;
    }
    console.log('Submit', action);
  }

</script>

<div class="w-full h-full">
  <Reviewer
    bind:cardIndex={currentIndex}
    bind:cards={cards}
    enableReview={false}
>
  {#snippet children({ card: card, index: index })}
    <ReviewerCard isFlipped={currentIndex !== index}>
      {#snippet front()}
        <ReviewerFront>
          <ReviewerFactory 
            {...card} 
            hasPrevious={index > 0}
            hasNext={index < cards.length - 1}
            onsubmit={handleSubmit}
          />
        </ReviewerFront>
      {/snippet}
      {#snippet back()}
        <ReviewerBack />
      {/snippet}
    </ReviewerCard>
  {/snippet}
</Reviewer>
</div>