<script setup>
import { reactive } from "vue";
import { checkIfObjectHasEmptyProperties } from "@/services/helpers.js";
import router from "@/router/index.js";
import { useAuthStore } from "@/stores/auth.js";

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

  if (!checkIfObjectHasEmptyProperties(errors)) {
    return;
  }

  await authStore.login(formData.email, formData.password);

  if (!checkIfObjectHasEmptyProperties(authStore.error)) {
    return;
  }

  clearFormData();
  clearErrors();

  await router.push("/");
};
</script>

<template>
  <section
    class="rounded-lg border bg-card text-card-foreground shadow-sm w-[350px]"
    data-v0-t="card"
  >
    <div class="flex flex-col space-y-1.5 p-6">
      <div class="flex justify-between items-center">
        <h3 class="text-2xl font-semibold leading-none tracking-tight">
          Login to Quiz Game
        </h3>
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-sun h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          >
            <circle
              cx="12"
              cy="12"
              r="4"
            />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-moon absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
          <span class="sr-only">Toggle theme</span>
        </button>
      </div>
      <p class="text-sm text-muted-foreground">
        Enter your credentials to access your account
      </p>
    </div>
    <div class="p-6 pt-0">
      <form>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="email"
            >Email
            </label>
            <input
              id="email"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="m@example.com"
              required=""
              type="email"
              value=""
            >
          </div>
          <div class="flex flex-col space-y-1.5">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="password"
            >Password</label><input
              id="password"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required=""
              type="password"
              value=""
            >
          </div>
        </div>
      </form>
    </div>
    <div class="items-center p-6 pt-0 flex flex-col">
      <button
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
      >
        Login
      </button>
    </div>
  </section>
</template>

<style scoped></style>
