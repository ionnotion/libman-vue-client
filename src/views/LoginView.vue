<script>
import { mapActions } from "pinia";
import { useRootStore } from "../stores/";
import CustomButton from "../components/CustomButton.vue";
import { RouterLink } from "vue-router";

export default {
  name: "LoginView",
  components: {
    RouterLink,
    CustomButton
  },
  data() {
    return {
      loginForm: {},
    };
  },
  methods: {
    ...mapActions(useRootStore, ["postLogin"]),
  },
  mounted() {
    this.loginForm = {
      credential: "",
      password: "",
    };
  },
};
</script>

<template>
  <div class="card container mt-5 p-0 rounded">
    <div class="card-body bg-secondary">
      <section class="mx-3">
        <form @submit.prevent="postLogin(loginForm)">
          <h3>Login:</h3>
          <div class="form-group mt-3">
            <label for="login-email">Username / Email address</label>
            <input
              type="text"
              class="form-control"
              id="login-credential"
              placeholder="Enter username / email"
              v-model="loginForm.credential"
            />
          </div>
          <div class="form-group mt-3">
            <label for="login-password">Password</label>
            <input
              type="password"
              class="form-control"
              id="login-password"
              placeholder="Password"
              v-model="loginForm.password"
            />
          </div>
          <CustomButton
            :name="'Login'"
            :type="'submit'"
            :displayClass="'btn btn-dark mt-3'"
          />
        </form>

        <p class="mt-3">
          Don't have an account?
          <RouterLink :to="'/register'" class="mt-1 text-body">register here</RouterLink>
        </p>
      </section>
    </div>
  </div>
</template>
