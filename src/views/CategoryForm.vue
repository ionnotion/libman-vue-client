<script>
import { mapActions, mapState } from "pinia";
import { useRootStore } from "../stores";

export default {
	name: "CategoryForm",
	data() {
		return {
			title: "Add New Category",
			categoryForm: {
				_id: "",
				name: "",
			},
		};
	},
	computed: {
		...mapState(useRootStore, ["categoryDetail"]),
	},
	methods: {
		...mapActions(useRootStore, [
			"postCategoryForm",
			"fetchCategoryById",
			"updateCategoryForm",
		]),
		submitHandler() {
			if (this.$route.params.id) {
				this.updateAuthorForm(this.authorForm);
			} else {
				this.postCategoryForm(this.categoryForm);
			}
		},
	},
	mounted() {
		if (this.$route.params.id) {
			this.fetchCategoryById(this.$route.params.id);
			this.title = "Edit Category Information";
		}
	},
	watch: {
		authorDetail: function () {
			if (this.$route.params.id) {
				this.categoryForm = this.categoryDetail;
			}
		},
	},
};
</script>

<template>
	<div class="container">
		<div class="card mx-auto my-4" style="width: 36rem">
			<div class="card-header p-3 m-0">
				<h5>{{ title }}</h5>
			</div>
			<form @submit.prevent="submitHandler">
				<div class="card-body">
					<div class="mb-3">
						<label class="form-label">Name</label>
						<input
							type="text"
							class="form-control"
							v-model="categoryDetail.name"
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
