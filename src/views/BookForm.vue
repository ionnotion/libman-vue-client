<script>
import { mapActions, mapState } from "pinia";
import { useRootStore } from "../stores";
import { watch } from "vue";

export default {
	name: "BookForm",
	data() {
		return {
			title: "Add New Book",
			bookForm: {
				title: "",
				author: "",
				summary: "",
				category: "",
				amount: 1,
			},
		};
	},
	computed: {
		...mapState(useRootStore, ["bookDetail", "authors", "categories","isLoggedIn","isAdmin"]),
	},
	methods: {
		...mapActions(useRootStore, [
			"postBookForm",
            "updateBookForm",
			"fetchBookById",
			"fetchAuthors",
			"fetchCategories",
		]),
		submitHandler() {
			if (this.$route.params.id) {
				this.updateBookForm(this.bookForm, this.bookDetail._id);
			} else {
				this.postBookForm(this.bookForm);
			}
		},
	},
	created() {
		if (!this.authors.length) {
			this.fetchAuthors();
		}
		if (!this.categories.length) {
			this.fetchCategories();
		}
		if (this.$route.params.id) {
			this.fetchBookById(this.$route.params.id);
			this.title = "Edit Book";
		}
	},
	watch: {
		bookDetail: function () {
			if (this.$route.params.id) {
				this.bookForm = this.bookDetail;
			}
		},
	},
};
</script>

<template>
	<div class="container my-4">
		<div class="card mx-auto" style="width: 42rem">
			<div class="card-header p-3 m-0">
				<h5>{{ title }}</h5>
			</div>
			<form @submit.prevent="submitHandler">
				<div class="card-body">
					<div class="mb-3">
						<label class="form-label">Title</label>
						<input type="text" class="form-control" v-model="bookForm.title" />

						<label class="form-label">Author</label>
						<select class="form-select" v-model="bookForm.author">
							<option v-for="author in authors" :value="author._id">
								{{ author.name }}
							</option>
						</select>

						<label class="form-label">Category</label>
						<select class="form-select" v-model="bookForm.category">
							<option v-for="category in categories" :value="category._id">
								{{ category.name }}
							</option>
						</select>

						<label class="form-label">Summary</label>
						<textarea
							type="text"
							class="form-control"
							v-model="bookForm.summary"
						></textarea>
						<label class="form-label">Stock</label>
						<input
							type="number"
							class="form-control"
							v-model="bookForm.amount"
						/>
					</div>
				</div>
				<div class="card-footer">
					<button class="btn btn-success" type="submit">Submit</button>
				</div>
			</form>
		</div>
	</div>
</template>
