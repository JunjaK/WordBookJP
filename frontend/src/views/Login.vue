<template>
  <v-sheet style="margin-top: 100px">
    <v-row justify="center">
      <v-col xs="10" sm="8" md="6" lg="4" class="mx-4">
        <v-card elevation="0" class="pa-4" outlined>
          <v-tabs
            class="no-transition"
            background-color="#ffffff"
            color="secondary"
            grow
            v-model="tab"
          >
            <v-tab>Login</v-tab>
            <v-tab>Sign Up</v-tab>
          </v-tabs>
          <div class="SignInTitle">
            {{title}}
            <div class="my-2 signInDivider"></div>
          </div>
          <div class="pa-12">
            <ValidationObserver ref="obs" v-slot="{ invalid, validated}">
              <v-form v-if="tab===0">
                <ValidationProvider name="id" rules="required" v-slot="{ errors }">
                  <v-text-field
                    color="secondary"
                    label="ID"
                    v-model="LoginForm.id"
                    :error-messages="errors"
                    clearable
                    filled
                    type="text"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                  <v-text-field
                    color="secondary"
                    label="Password"
                    ty
                    v-model="LoginForm.password"
                    :error-messages="errors"
                    clearable
                    filled
                    type="password"
                  ></v-text-field>
                </ValidationProvider>
                <v-row justify="end" class="mr-0 mt-n7 mb-7">
                  <v-btn
                    text
                    color="secondary"
                    style="font-weight: 400; text-transform: none"
                    @click="findPassword()"
                  >Forgot Password?</v-btn>
                </v-row>
                <v-row class="mx-0">
                  <v-btn
                    color="secondary"
                    style="margin: auto"
                    block
                    large
                    :disabled="invalid || !validated"
                    @click="Login()"
                  >
                    <div style="font-size: 18px">Login</div>
                  </v-btn>
                </v-row>
              </v-form>
              <v-form v-if="tab===1">
                <ValidationProvider
                  name="id"
                  rules="required|min:4|max:15"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    prepend-inner-icon="mdi-account"
                    v-model="SignUpForm.id"
                    :counter="15"
                    :error-messages="errors"
                    label="ID"
                    color="secondary"
                    type="text"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="nickname"
                  rules="required|min:3|max:15"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    style="margin-top: 5px"
                    prepend-inner-icon="mdi-emoticon-happy-outline"
                    v-model="SignUpForm.nickname"
                    :counter="15"
                    :error-messages="errors"
                    label="Nickname"
                    autocomplete
                    color="secondary"
                    type="text"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="password"
                  rules="required|min:6|max:30"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    style="margin-top: 5px"
                    prepend-inner-icon="mdi-lock"
                    autocomplete="new-password"
                    v-model="SignUpForm.password"
                    :counter="30"
                    :error-messages="errors"
                    label="Password"
                    color="secondary"
                    type="password"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  name="passwordConfirm"
                  rules="required|min:6|max:30|confirmed:password"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    style="margin-top: 5px"
                    prepend-inner-icon="mdi-lock"
                    autocomplete="new-password"
                    v-model="SignUpForm.passwordConfirm"
                    :error-messages="errors"
                    :counter="30"
                    label="PasswordConfirm"
                    color="secondary"
                    type="password"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                  <v-text-field
                    style="margin-top: 5px; margin-bottom: 10px"
                    prepend-inner-icon="mdi-at"
                    v-model="SignUpForm.email"
                    :error-messages="errors"
                    label="E-mail"
                    autocomplete="email"
                    type="text"
                    color="secondary"
                  ></v-text-field>
                </ValidationProvider>

                <v-btn
                  color="secondary"
                  style="margin: auto; margin-top: 40px"
                  block
                  large
                  @click="SignUp()"
                  :disabled="invalid || !validated"
                >
                  <div style="font-size: 18px">Sign Up</div>
                </v-btn>
              </v-form>
            </ValidationObserver>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>
nav {
  text-align: center;
}
</style>


<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      title: '',
      LoginForm: {
        id: '',
        password: '',
      },
      SignUpForm: {
        id: '',
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
      },
      tab: 0,
    };
  },
  created() {
    this.title = 'Log In to Throw Box';
  },
  watch: {
    tab(val) {
      if (val === 0) {
        this.title = 'Log In to Throw Box';
      } else {
        this.title = 'Sign Up to Throw Box';
      }
    },
  },
  methods: {
    Login() {
      console.log(this.LoginForm);
      // this.$axios
      //   .post('/auth/token', this.form)
      //   .then((r) => {
      //     localStorage.setItem('accessToken', r.data.accessToken);
      //     localStorage.setItem('refreshToken', r.data.refreshToken);
      //     localStorage.setItem('expiryDtime', r.data.expiryDtime);
      //     this.$axios
      //       .get('/mypage/profile', {
      //         headers: { 'X-AUTH-TOKEN': r.data.accessToken },
      //       })
      //       .then((userData) => {
      //         localStorage.setItem('userName', userData.data.engName);
      //         const base64 = `data:img/png;base64, ${userData.data.base64Photo}`;
      //         localStorage.setItem('profileIMG', base64);
      //         this.$store.dispatch('commitGetToken');
      //         this.$router.replace('/');
      //       });
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    },
    SignUp() {
      console.log(this.SignUpForm);
    },
    findPassword() {

    },
  },
};
</script>

<style lang="scss" scoped>
.signInDivider {
  width: 70px;
  margin: auto;
  background-color: #3f51b5;
  height: 2px;
}
.SignInTitle {
  margin-top: 40px;
  margin-bottom: 30px;
  text-align: center;
  font-size: 30px;
  font-weight: 300;
  letter-spacing: 2px;
}
</style>
