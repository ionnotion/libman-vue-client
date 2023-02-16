<script>
import { mapActions, mapState } from "pinia";
import { useRootStore } from "../stores";

export default {
	name: "CheckutForm",
	data() {
		return {
			title: "Book Checkout",
			checkoutForm: {
				id: "",
				name: "",
			},
		};
	},
	methods: {
		...mapActions(useRootStore, ["checkoutBookHandler"]),
		submitHandler() {
			this.checkoutBookHandler(this.$route.params.id, this.checkoutForm.id)
		},
	},
	mounted() {},
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
						<label class="form-label">User Id</label>
						<input type="text" class="form-control" v-model="checkoutForm.id" />
					</div>
				</div>
				<div class="card-footer">
					<button class="btn btn-success" type="submit">Submit</button>
				</div>
			</form>
		</div>
	</div>
</template>
