<script>
import { mapActions, mapState } from "pinia";
import { useRootStore } from "../stores";

export default {
	name: "AuthorList",
	computed: {
		...mapState(useRootStore, ["authors"]),
	},
	methods: {
		...mapActions(useRootStore, ["fetchAuthors"]),
	},
	mounted() {
		if (!this.authors.length) {
            console.log("fetch")
			this.fetchAuthors();
		}
	},
};
</script>

<template>
	<table class="table text-center">
		<thead>
			<tr>
				<th scope="col">No.</th>
				<th scope="col">Name</th>
				<th scope="col"></th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(author, index) in authors">
            <th>{{ index+1 }}</th>
            <td>{{ author.name }}</td>
            <td><RouterLink :to="`/author/edit/${author._id}`" class="btn btn-primary">Edit</RouterLink></td>
            </tr>
		</tbody>
	</table>
</template>
