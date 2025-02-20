<script setup>
import {reactive} from "vue";
import {checkIfObjectHasEmptyProperties} from "@/services/helpers.js";
import router from "@/router/index.js";
import {useAuthStore} from "@/stores/auth.js";

const authStore = useAuthStore();

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

  authStore.error.message = '';
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

  await authStore.login(formData.email, formData.password);

  if (!checkIfObjectHasEmptyProperties(authStore.error)) {
    return;
  }

  clearFormData();
  clearErrors();

  await router.push('/');
}
</script>

<template>
</template>

<style scoped>
</style>
