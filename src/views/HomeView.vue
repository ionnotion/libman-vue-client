<script>
import { useRootStore } from "../stores/index.js";
import { mapActions, mapState } from "pinia";
import BookTable from "../components/BookTable.vue";

export default {
	nama: "HomeView",
	components: {
		BookTable,
	},
	data() {
		return {
			searchQuery: "",
		};
	},
	methods: {
		...mapActions(useRootStore, [
			"fetchBooks",
			"fetchAuthors",
			"fetchCategories",
			"flushSearch",
			"checkCredentials",
		]),
		fetchWithQuery() {
			this.fetchBooks(this.searchQuery);
		},
		clearSearch() {
			this.searchQuery = "";
			this.flushSearch();
		},
	},
	computed: {
		...mapState(useRootStore, [
			"books",
			"authors",
			"categories",
			"isLoggedIn",
			"isAdmin",
		]),
	},
	created() {
		this.fetchBooks();
		this.fetchAuthors();
		this.fetchCategories();
	},
	mounted() {
		this.checkCredentials();
	},
};
</script>

<template>
	<div class="container-fluid">
		<div class="container d-flex justify-content-around">
			<div class="card justify-content-between text-center mx-4 my-4">
				<div class="card-body p-4">
					<h6>Books Available in Database:</h6>
					<h4>{{ books.length }}</h4>
				</div>
				<div
					v-show="isLoggedIn && isAdmin"
					class="card-footer text-center bg-secondary"
				>
					<RouterLink class="btn btn-secondary m-2" :to="'/book/add'"
						>Add New Book</RouterLink
					>
				</div>
			</div>

			<div class="card justify-content-between text-center mx-4 my-4">
				<div class="card-body p-4">
					<h6>Total Authors in Database:</h6>
					<h4>{{ authors.length }}</h4>
				</div>
				<div v-show="isLoggedIn && isAdmin" class="card-footer bg-secondary">
					<RouterLink class="btn btn-secondary m-2" :to="'/author/add'"
						>Add New Author</RouterLink
					>
				</div>
			</div>

			<div class="card justify-content-between text-center mx-4 my-4">
				<div class="card-body p-4">
					<h6>Total Categories in Database:</h6>
					<h4>{{ categories.length }}</h4>
				</div>
				<div
					v-show="isLoggedIn && isAdmin"
					class="card-footer text-center bg-secondary"
				>
					<RouterLink class="btn btn-secondary m-2" :to="'/category/add'"
						>Add New Category</RouterLink
					>
				</div>
			</div>
		</div>

		<div class="container d-flex justify-content-around"></div>

		<div class="card d-flex justify-content-between mx-4 my-4">
			<BookTable />
		</div>
	</div>
</template>
