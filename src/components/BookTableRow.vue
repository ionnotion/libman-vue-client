<script>
import { mapState } from "pinia";
import { RouterLink } from "vue-router";
import { useRootStore } from "../stores";

export default {
	name: `BookTableRow`,
	props: ["book", "index"],
	computed: {
		...mapState(useRootStore, ["isLoggedIn", "isAdmin"]),
		background() {
			if (this.index % 2 === 0) {
				return "table-secondary";
			}
			return "table-light";
		},
	},
	components: { RouterLink },
};
</script>

<template>
	<tr :class="background">
		<th scope="row">{{ index + 1 }}.</th>
		<td>{{ book.title }}</td>
		<td>{{ book?.author?.name }}</td>
		<td>{{ book?.category?.name }}</td>
		<td>{{ book.amount }}</td>
		<td>{{ book.amount - book.checkouts.length }}</td>
		<td class="text-center" style="width: 12vw;">
			<RouterLink v-show="isLoggedIn" class="btn btn-secondary m-2" :to="`/book/details/${book._id}`"
				>Details</RouterLink
			>
			<RouterLink
				v-show="isLoggedIn && isAdmin"
				class="btn btn-primary m-2"
				:to="`/book/edit/${book._id}`"
				>Edit</RouterLink
			>
		</td>
	</tr>
</template>
