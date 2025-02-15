<script setup>
import {reactive, ref} from "vue";
import PrimaryButton from "@/components/shared/Button/PrimaryButton.vue";
import useAuth from "@/composables/auth.js";
import {checkIfObjectHasEmptyProperties} from "@/services/helpers.js";
import ErrorMessage from "@/components/Form/ErrorMessage.vue";
import router from "@/router/index.js";

const authService = useAuth();

const formData = reactive({
  email: "",
  password: "",
});

const clearFormData = () => {
  formData.email = "";
  formData.password = "";
};

const errors = reactive({
  email: "",
  password: "",
});

const clearErrors = () => {
  errors.email = "";
  errors.password = "";

  authService.error.message = '';
}

const validateFormData = () => {
  if (!formData.email || formData.email.length < 3) {
    errors.email = "Email is required and needs to be valid";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  }
}


const login = async () => {
  validateFormData();

  if (!checkIfObjectHasEmptyProperties(errors)) {
    return;
  }

  await authService.login(formData.email, formData.password);

  if (!checkIfObjectHasEmptyProperties(authService.error)) {
    return;
  }

  clearFormData();
  clearErrors();

  await router.push('/');
}
</script>

<template>
  <main>
    <ErrorMessage v-if='authService.error.message !== ""' :message="authService.error.message"/>
    <form
        @submit.prevent="login()"
        action="/login"
        method="POST"
    >
      <div class="input-wrapper">
        <label for="email">Email</label>
        <input
            type="email"
            v-model="formData.email"
            name="email"
            placeholder="email@example.com"
        />
      </div>
      <ErrorMessage v-if='errors.email !== ""' :message="errors.email"/>
      <div class="input-wrapper">
        <label for="password">Password</label>
        <input type="password" v-model="formData.password" name="password" min="6"/>
      </div>
      <ErrorMessage v-if='errors.password !== ""' :message="errors.password"/>
      <PrimaryButton class="submit-button" type="submit" text="Login"/>
    </form>
  </main>
</template>

<style scoped>
main {
  height: 400px;
  display: grid;
  place-items: center;


  & form {
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-150);

    @media screen and (min-width: 768px) {
      width: 60%;
    }

    @media screen and (min-width: 1100px) {
      width: 40%;
    }
  }

  & .submit-button {
    padding: var(--spacing-75) !important;
    border-radius: var(--spacing-50) !important;
  }

  & .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-25);
  }

  & input {
    padding: var(--spacing-50);
  }
}
</style>
