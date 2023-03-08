<script>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Preloader from "./components/Preloader.vue";
import { useRootStore } from "./stores/index";
import { mapWritableState } from "pinia";

export default {
	nama: "App",
	components: {
		RouterView,
		RouterLink,
		NavBar,
		Preloader,
	},
	computed: {
		...mapWritableState(useRootStore, [
			"isLoggedIn",
			"isLoading",
		]),
	},
	created() {
		if (localStorage.getItem("access_token")) {
			this.isLoggedIn = true;
		}
	},
};
</script>

<template>
	<NavBar />
	<div v-show="isLoading">
		<Preloader />
	</div>

	<RouterView />
</template>

<style></style>
