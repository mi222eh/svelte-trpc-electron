<script lang="ts">
	import { onMount } from 'svelte';
	import { trpc } from './lib/trpc';

	let name = '';
	let result = '';

	let dataFromSubscription = '';
	$: {
		trpc.greeting
			.query({
				name: name
			})
			.then((res) => {
				result = res.text;
			});
	}

	onMount(() => {
		trpc.greetingSubscription.subscribe(undefined, {
			onData(value) {
				dataFromSubscription = value.text;
			},
			onStarted() {
				console.log('subscription started');
			}
		});
	});
</script>

<main>
	<p>Click on the Vite and Svelte logos to learn more</p>
	<input bind:value={name} />
	<p>{result}</p>

	<h1>Subscription</h1>
	<p>{dataFromSubscription}</p>
</main>
