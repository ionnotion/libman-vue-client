<script>
import { mapActions, mapState } from "pinia";
import { useRootStore } from "../stores";

export default {
	name: "CategoryList",
	computed: {
		...mapState(useRootStore, ["categories"]),
	},
	methods: {
		...mapActions(useRootStore, ["fetchCategories"]),
	},
	mounted() {
		if (!this.categories.length) {
			this.fetchCategories();
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
			<tr v-for="(category, index) in categories">
            <th>{{ index+1 }}</th>
            <td>{{ category.name }}</td>
            <td><RouterLink :to="`/category/edit/${category._id}`" class="btn btn-primary">Edit</RouterLink></td>
            </tr>
		</tbody>
	</table>
</template>
