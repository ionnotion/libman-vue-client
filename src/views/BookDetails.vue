<script>
import { mapActions, mapState } from "pinia";
import { useRootStore } from "../stores";

export default {
	name: "BookDetails",
	data() {
		return {
			bookForm: {
				title: "",
				author: {},
				summary: "",
				category: {},
				amount: 1,
			},
		};
	},
	computed: {
		...mapState(useRootStore, ["bookDetail"]),
	},
	methods: {
		...mapActions(useRootStore, ["fetchBookById"]),
	},
	created() {
		if (this.$route.params.id) {
			this.fetchBookById(this.$route.params.id);
		}
	},
};
</script>

<template>
	<div class="container">
		<div class="card my-4">
			<div class="card-header d-flex justify-content-between">
				<div class="d-flex">
					<div class="m-4">
						<h6>Title:</h6>
						<p>{{ bookDetail.title }}</p>
						<h6>Author:</h6>
						<p>{{ bookDetail.author.name }}</p>
					</div>
					<div class="m-4">
						<h6>Category:</h6>
						<p>{{ bookDetail.category.name }}</p>
						<h6>Stock:</h6>
						<p>{{ bookDetail.amount }}</p>
					</div>
				</div>
				<div class="d-flex flex-column p-4">
					<button class="btn m-2 btn-success">Checkout</button>
					<button class="btn m-2 btn-danger">Delete</button>
				</div>
			</div>
			<div class="card-body">
				<h5>Summary:</h5>
				<p>{{ bookDetail.summary }}</p>
			</div>
			<div class="card-footer">
				<h6>Borrowed By:</h6>
				<table class="table table-light text-center">
					<thead>
						<tr>
							<th scope="col">No.</th>
							<th scope="col">Username</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="user in bookDetail.borrowedBy">
							<th scope="col"></th>
							<td>{{ user.username }}</td>
							<td>{{ user._id }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
