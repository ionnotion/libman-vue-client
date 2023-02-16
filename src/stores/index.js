import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = `http://localhost:8080`;

export const useRootStore = defineStore("root", {
	state: () => ({
		isLoggedIn: false,
		isAdmin: false,
		isLoading: false,
		books: [],
		bookDetail: "",
		authors: [],
		authorDetail: "",
		categories: [],
		categoryDetail: "",
		searchQuery: "",
		currentPage: 0,
		totalBooks: 0,
		bookDetail: {},
		loggedUserDetails: {},
	}),
	actions: {
		setCredential(data) {
			localStorage.setItem(`username`, data.username);
			localStorage.setItem(`isAdmin`, data.isAdmin);
		},
		checkCredentials() {
			if (localStorage.getItem("access_token")) {
				this.setLoggedIn();
			}
			if (localStorage.getItem("isAdmin")) {
				this.setAdmin();
			}
		},
		setLoggedIn() {
			this.isLoggedIn = true;
		},
		setAdmin() {
			this.isAdmin = true;
		},
		async postLogin(payload) {
			try {
				this.isLoading = true;

				const { data } = await axios.post(`${baseUrl}/user/login`, {
					credential: payload.credential,
					password: payload.password,
				});

				localStorage.setItem(`access_token`, data.access_token);
				this.setCredential(data);

				this.isLoggedIn = true;
				this.isAdmin = data.isAdmin;
				this.router.push("/");

				Swal.fire({
					position: "top-end",
					title: "Success!",
					icon: "success",
					text: `Welcome back, ${data.username}!`,
					showConfirmButton: false,
					timer: 1250,
					timerProgressBar: true,
				});
			} catch (error) {
				Swal.fire({
					title: "An Error has occured...",
					icon: "error",
					text: error.response.data.message,
				});
			} finally {
				this.isLoading = false;
			}
		},
		async postregister(payload) {
			try {
				this.isLoading = true;
				await axios.post(`${baseUrl}/user/register`, {
					username: payload.username,
					email: payload.email,
					password: payload.password,
					firstName: payload.firstName,
					lastName: payload.lastName,
				});
				this.isLoading = false;

				let result = await Swal.fire({
					icon: "success",
					title: "Register successful!",
					text: "Do you want to login immediately?",
					showCancelButton: true,
					confirmButtonText: "Login",
				});

				if (result.isConfirmed) {
					const loginForm = {
						email: payload.email,
						password: payload.password,
					};
					await this.postLogin(loginForm);
				}
			} catch (error) {
				Swal.fire({
					title: "An Error has occured...",
					icon: "error",
					html: error.response.data.message.join("<br>"),
				});
			} finally {
				this.isLoading = false;
			}
		},
		logout() {
			localStorage.clear();
			Swal.fire({
				position: "top-end",
				title: "Success!",
				icon: "success",
				text: `Logged out successfully!`,
				showConfirmButton: false,
				timer: 1250,
				timerProgressBar: true,
			});
			this.isLoggedIn = false;
			this.router.push("/");
		},
		flushSearch() {
			this.searchQuery = "";
		},
		async fetchBooks() {
			try {
				const { data } = await axios.get(`${baseUrl}/book`);
				this.books = data;
			} catch (error) {
				console.log(error);
			}
		},
		async fetchBookById(id) {
			try {
				const { data } = await axios.get(`${baseUrl}/book/${id}`);
				// console.log(data)
				this.bookDetail = data;
			} catch (error) {
				console.log(error);
			}
		},
		async fetchAuthors() {
			try {
				const { data } = await axios.get(`${baseUrl}/author`);
				this.authors = data;
			} catch (error) {
				console.log(error);
			}
		},
		async fetchAuthorById(id) {
			try {
				const { data } = await axios.get(`${baseUrl}/author/${id}`);
				console.log(data);
				this.authorDetail = data;
			} catch (error) {
				console.log(error);
			}
		},
		async fetchCategories() {
			try {
				const { data } = await axios.get(`${baseUrl}/category`);
				this.categories = data;
			} catch (error) {
				console.log(error);
			}
		},
		async fetchCategoryById(id) {
			try {
				const { data } = await axios.get(`${baseUrl}/category/${id}`);
				this.categoryDetail = data;
			} catch (error) {
				console.log(error);
			}
		},
		async postBookForm(bookForm) {
			try {
        console.log(bookForm,"<<<<<<<<<<")
				const { data } = await axios.post(`${baseUrl}/book`, bookForm, {
					headers: {
						Authorization: `bearer ${localStorage.getItem("access_token")}`,
					},
				});

				this.router.push("/");

				Swal.fire({
					position: "top-end",
					title: "Success!",
					icon: "success",
					text: `Success adding new book!`,
					showConfirmButton: false,
					timer: 1250,
					timerProgressBar: true,
				});
			} catch ({ response }) {
				Swal.fire({
					title: "An Error has occured...",
					icon: "error",
					text: response.data.message,
				});
			}
		},
		async updateBookForm(bookForm, id) {
			try {
				const { data } = await axios.put(`${baseUrl}/book/${id}`, bookForm, {
					headers: {
						Authorization: `bearer ${localStorage.getItem("access_token")}`,
					},
				});

				this.router.push("/");

				Swal.fire({
					position: "top-end",
					title: "Success!",
					icon: "success",
					text: `Succes updating book!`,
					showConfirmButton: false,
					timer: 1250,
					timerProgressBar: true,
				});
			} catch ({ response }) {
				Swal.fire({
					title: "An Error has occured...",
					icon: "error",
					text: response.data.message,
				});
			}
		},
		async postAuthorForm({ name }) {
			try {
				const { data } = await axios.post(`${baseUrl}/author`, {name}, {
					headers: {
						Authorization: `bearer ${localStorage.getItem("access_token")}`,
					},
				});

				this.router.push("/");

				Swal.fire({
					position: "top-end",
					title: "Success!",
					icon: "success",
					text: `Success adding new author!`,
					showConfirmButton: false,
					timer: 1250,
					timerProgressBar: true,
				});

				this.fetchAuthors();
				console.log(data);
			} catch ({ response }) {
				Swal.fire({
					title: "An Error has occured...",
					icon: "error",
					text: response.data.message,
				});
			}
		},
    async updateAuthorForm({name, _id}) {
			try {
				const { data } = await axios.put(`${baseUrl}/author/${_id}`, {name}, {
					headers: {
						Authorization: `bearer ${localStorage.getItem("access_token")}`,
					},
				});

				this.router.push("/");

				Swal.fire({
					position: "top-end",
					title: "Success!",
					icon: "success",
					text: `Success updating author!`,
					showConfirmButton: false,
					timer: 1250,
					timerProgressBar: true,
				});

				this.fetchAuthors();
			} catch ({ response }) {
				Swal.fire({
					title: "An Error has occured...",
					icon: "error",
					text: response.data.message,
				});
			}
		},
		async postCategoryForm({name}) {
			try {
				const { data } = await axios.post(`${baseUrl}/category`, {name}, {
					headers: {
						Authorization: `bearer ${localStorage.getItem("access_token")}`,
					},
				});

				this.router.push("/");

				Swal.fire({
					position: "top-end",
					title: "Success!",
					icon: "success",
					text: `Success adding new category!`,
					showConfirmButton: false,
					timer: 1250,
					timerProgressBar: true,
				});

				this.fetchCategories();

				console.log(data);
			} catch ({ response }) {
				Swal.fire({
					title: "An Error has occured...",
					icon: "error",
					text: response.data.message,
				});
			}
		},
    async updateCategoryForm({name,_id}) {
			try {
				const { data } = await axios.put(`${baseUrl}/category/${_id}`, {name}, {
					headers: {
						Authorization: `bearer ${localStorage.getItem("access_token")}`,
					},
				});

				this.router.push("/");

				Swal.fire({
					position: "top-end",
					title: "Success!",
					icon: "success",
					text: `Success updating category!`,
					showConfirmButton: false,
					timer: 1250,
					timerProgressBar: true,
				});

				this.fetchCategories();
			} catch ({ response }) {
				Swal.fire({
					title: "An Error has occured...",
					icon: "error",
					text: response.data.message,
				});
			}
		},
	},
});