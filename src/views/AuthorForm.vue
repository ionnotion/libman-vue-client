<script>
import { mapActions, mapState } from "pinia";
import { useRootStore } from "../stores";

export default {
	name: "AuthorForm",
	data() {
		return {
			title: "Add New Author",
			authorForm: {
                _id: "",
                name: ""
            },
		};
	},
	computed: {
		...mapState(useRootStore, ["authorDetail"]),
	},
	methods: {
		...mapActions(useRootStore, ["postAuthorForm","fetchAuthorById","updateAuthorForm"]),
		submitHandler() {
			if (this.$route.params.id) {
				this.updateAuthorForm(this.authorForm);
			} else {
				this.postAuthorForm(this.authorForm);
			}
		},
	},
	mounted() {
		if (this.$route.params.id) {
			this.fetchAuthorById(this.$route.params.id);
			this.title = "Edit Author Information";
		}
	},
    watch: {
		authorDetail: function () {
			if (this.$route.params.id) {
				this.authorForm = this.authorDetail;
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
						<input type="text" class="form-control" v-model="authorForm.name" />
					</div>
				</div>
				<div class="card-footer">
					<button class="btn btn-success" type="submit">Submit</button>
				</div>
			</form>
		</div>
	</div>
</template>
