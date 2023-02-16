import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import BookForm from '../views/BookForm.vue'
import AuthorForm from '../views/AuthorForm.vue'
import CategoryForm from '../views/CategoryForm.vue'
import BookDetails from '../views/BookDetails.vue'
import AuthorList from '../views/AuthorList.vue'
import CategoryList from '../views/CategoryList.vue'
import CheckoutForm from '../views/CheckoutForm.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/book/add',
      name : 'addBook',
      component : BookForm
    },
    {
      path: '/book/edit/:id',
      name : 'editBook',
      component : BookForm
    },
    {
      path: '/book/details/:id',
      name : 'bookDetails',
      component : BookDetails
    },
    {
      path: '/book/details/checkout/:id',
      name : 'bookCheckout',
      component : CheckoutForm
    },
    {
      path: '/author',
      name : 'authorList',
      component : AuthorList
    },
    {
      path: '/author/add',
      name : 'addAuthor',
      component : AuthorForm
    },
    {
      path: '/author/edit/:id',
      name : 'editAuthor',
      component : AuthorForm
    },
    {
      path: '/category',
      name : 'categoryList',
      component : CategoryList
    },
    {
      path: '/category/add',
      name : 'addCategory',
      component : CategoryForm
    },
    {
      path: '/category/edit/:id',
      name : 'editCategory',
      component : CategoryForm
    },
  ]
})

export default router
