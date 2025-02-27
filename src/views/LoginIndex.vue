<script setup>
import { reactive } from "vue";
import { checkIfObjectHasEmptyProperties } from "@/services/helpers.js";
import router from "@/router/index.js";
import { useAuthStore } from "@/stores/auth.js";
import BaseInput from "@/components/shared/forms/BaseInput.vue";
import ThemeToggle from "@/components/shared/ThemeToggle.vue";
import BaseErrorMessage from "@/components/shared/forms/BaseErrorMessage.vue";
import SubmitButton from "@/components/shared/buttons/SubmitButton.vue";

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
  authStore.error.message = "";
};

const validateFormData = () => {
  if (!formData.email || formData.email.length < 3) {
    errors.email = "Email is required and needs to be valid";
  }
  if (!formData.password) {
    errors.password = "Password is required";
  }
};

const login = async () => {
  validateFormData();
  if (!checkIfObjectHasEmptyProperties(errors)) return;

  await authStore.login(formData.email, formData.password);
  if (!checkIfObjectHasEmptyProperties(authStore.error)) return;

  clearFormData();
  clearErrors();
  await router.push("/");
};
</script>

<template>
  <div class="wrapper min-h-screen flex items-center justify-center">
    <section
      class="rounded-lg border bg-card text-card-foreground shadow-sm w-[350px]"
    >
      <div class="flex flex-col space-y-1.5 p-6">
        <div class="flex justify-between items-center">
          <h3 class="text-2xl font-semibold">
            Login
          </h3>
          <ThemeToggle />
        </div>
        <p class="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      <div class="p-6 pt-0">
        <form @submit.prevent="login">
          <div class="grid w-full items-center gap-4">
            <BaseInput
              v-model="formData.email"
              label="Email"
              type="email"
              placeholder="m@example.com"
              :required="true"
            />
            <BaseInput
              v-model="formData.password"
              label="Password"
              type="password"
              :required="true"
            />
            <BaseErrorMessage :text="authStore.error.message" />
            <div class="items-center flex flex-col">
              <SubmitButton
                class="w-full"
                type="submit"
              >
                Login
              </SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
