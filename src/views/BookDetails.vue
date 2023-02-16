<script>
import { mapActions, mapState } from "pinia";
import { useRootStore } from "../stores";

export default {
	name: "BookDetails",
	data() {
		return {};
	},
	computed: {
		...mapState(useRootStore, ["bookDetail", "isAdmin"]),
		remaining() {
			return this.bookDetail.amount - this.bookDetail?.checkouts?.length;
		},
	},
	methods: {
		...mapActions(useRootStore, ["fetchBookById", "returnBookHandler","deleteBookHandler"]),
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
						<p>{{ bookDetail?.author?.name }}</p>
					</div>
					<div class="m-4">
						<h6>Category:</h6>
						<p>{{ bookDetail?.category?.name }}</p>
						<h6>Stock:</h6>
						<p>{{ remaining }} / {{ bookDetail.amount }}</p>
					</div>
				</div>
				<div class="d-flex flex-column p-4">
					<RouterLink
						:to="`/book/edit/${$route.params.id}`"
						class="btn m-2 btn-primary"
						>Edit</RouterLink
					>
					<RouterLink
						v-if="remaining > 0"
						:to="`/book/details/checkout/${$route.params.id}`"
						class="btn m-2 btn-success"
						>Checkout</RouterLink
					>
					<button v-if="remaining <= 0" class="btn m-2 btn-secondary">
						Checkout
					</button>
					<button
						v-if="remaining !== bookDetail.amount"
						class="btn m-2 btn-secondary"
					>
						Delete
					</button>
					<button
						v-if="remaining === bookDetail.amount"
						class="btn m-2 btn-danger"
						@click="deleteBookHandler(bookDetail._id)"
					>
						Delete
					</button>
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
							<th scope="col">Checkout Date</th>
							<th scope="col">Due Date</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(checkout, index) in bookDetail.checkouts">
							<th scope="col">{{ index + 1 }}</th>
							<td>{{ checkout.username }}</td>
							<td>{{ new Date(checkout.checkoutDate).toDateString() }}</td>
							<td>{{ new Date(checkout.dueDate).toDateString() }}</td>
							<td v-show="isAdmin">
								<button
									@click="returnBookHandler($route.params.id, checkout._id)"
									class="btn btn-sm btn-primary"
								>
									Return
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
