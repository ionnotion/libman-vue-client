<script>
import BookTableRow from "./BookTableRow.vue";
import { useRootStore } from "../stores/";
import { mapState, mapActions } from "pinia";

export default {
	name: `BookTable`,
	components: { BookTableRow },
	computed: {
		...mapState(useRootStore, ["books"]),
	},
};
</script>

<template>
	<table class="table text-center">
		<thead>
			<tr>
				<th scope="col">No.</th>
				<th scope="col">Title</th>
				<th scope="col">Author</th>
				<th scope="col">Category</th>
				<th scope="col">Stock</th>
				<th scope="col">Available</th>
        <th scope="col"></th>
			</tr>
		</thead>
		<tbody>
			<BookTableRow
				v-for="(book, index) in books"
				:key="'book-' + book._id"
				:book="book"
				:index="index"
			/>
		</tbody>
	</table>
</template>
