<template>
  <div class="wrapper d-flex justify-center align-center">
    <div style="margin-top: -10%">
      <h1 class="text-md-h3 mb-5 white--text text-center">Admin Dashboard</h1>
      <v-card elevation="2" outlined class="card" :max-width="$device.isMobile ? 376 : 400">
        <v-card-title class="pb-1">
          <v-icon class="mx-auto my-0 p-0" size="36">mdi-view-dashboard</v-icon>
        </v-card-title>
        <div class="px-3">
          <!-- name -->
          <v-text-field
            label="Email"
            v-model="email"
            :rules="[rules.textField('Email')]"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            label="Password"
            v-model="password"
            :rules="[rules.textField('Password')]"
            type="password"
            required
          ></v-text-field>
          <p class="red--text" v-if="message != ''">{{ message }}</p>
          <v-btn
            class="my-5 ml-auto d-block"
            type="submit"
            color="primary"
            elavation="2"
            @click="handleLogin"
          >Login</v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import rules from "../mixins/validationRules"
export default {
    layout: 'auth',
    mixins: [rules],
    data() {
        return {
            email: "",
            password: "",
            message: ""
        }
    },
    methods: {
        async handleLogin() {
            const data = {
                email: this.email,
                password: this.password
            }
            await this.$store.dispatch("authLogin", {
                data,
                onSuccess: async data => {
                    console.log('hello: ', data)
                    localStorage.setItem("session", JSON.stringify(data))
                    this.$router.push("/course");
                },
                onError: err => {
                    console.log("Course Update Error: ", err)
                    this.message = "Login Fail. Please Try Again"
                    setTimeout(() => {
                        this.message = ""
                    }, 5000)
                }
            });
        }
    }
}
</script>

<style scoped>
.wrapper {
  margin: 0;
  padding: 0 15px;
  height: 100vh;
  width: 100%;
  background-image: url("../assets/login-bg.jpg");
  background-size: cover;
}
</style>