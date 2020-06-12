<template>
  <v-sheet style="margin-top: 100px">
    <v-row justify="center">
      <v-col xs="10" sm="8" md="6" lg="4" class="mx-4">
        <!--  -->
        <v-card elevation="0" class="pa-4" outlined>
          <v-tabs
            class="no-transition"
            background-color="#ffffff"
            color="primary"
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
          <div :class="$vuetify.breakpoint.xs ? 'pa-4' : 'pa-12'">
            <ValidationObserver ref="obs" v-slot="{ invalid, validated}">
              <v-form v-if="tab===0">
                <ValidationProvider name="id" rules="required" v-slot="{ errors }">
                  <v-text-field
                    color="primary"
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
                    color="primary"
                    label="Password"
                    ty
                    v-model="LoginForm.password"
                    :error-messages="errors"
                    clearable
                    filled
                    type="password"
                    @keydown.enter="Login()"
                  ></v-text-field>
                </ValidationProvider>
                <v-row class="mx-0 mt-6">
                  <v-btn
                    color="primary"
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
                <ValidationProvider name="id" rules="required|min:4|max:15" v-slot="{ errors }">
                  <v-text-field
                    prepend-inner-icon="mdi-account"
                    v-model="SignUpForm.id"
                    :counter="15"
                    :error-messages="errors"
                    label="ID"
                    color="primary"
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
                    color="primary"
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
                    color="primary"
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
                    color="primary"
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
                    color="primary"
                  ></v-text-field>
                </ValidationProvider>

                <v-btn
                  color="primary"
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
        <!--  -->
        <!--  -->
        <notify
          @clickOk="notifyClickOk"
          :onFlag="resultDialog"
          :message1="rtMsg1"
          :message2="rtMsg2"
        />
        <!--  -->
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
import notify from '../components/notify.vue';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    notify,
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
      resultDialog: false,
      isRedirect: false,
      rtMsg1: null,
      rtMsg2: null,
      tab: 0,
    };
  },
  created() {
    this.title = 'Log In to Wordbook';
    this.rtMsg1 = 'You are succesfully registered!';
    this.rtMsg2 = 'Please Log in in with your account.';
  },
  watch: {
    tab(val) {
      if (val === 0) {
        this.title = 'Log In to Wordbook';
      } else {
        this.title = 'Sign Up to Wordbook';
      }
    },
  },
  methods: {
    Login() {
      this.rtMsg1 = null;
      this.rtMsg2 = null;
      this.$axios
        .post('/sign/in', this.LoginForm)
        .then((r) => {
          localStorage.setItem('accessToken', r.data.token);
          localStorage.setItem('nickname', r.data.nickname);
          localStorage.setItem('userId', r.data.id);
          this.$store.dispatch('commitGetToken');
          this.$router.push('/');
        })
        .catch((e) => {
          this.resultDialog = true;
          this.rtMsg1 = `Error! http-error code ${e.response.status}`;
          this.rtMsg2 = e.response.data.msg;
        });
    },
    SignUp() {
      this.rtMsg1 = null;
      this.rtMsg2 = null;
      this.$axios
        .post('/sign/up', this.SignUpForm)
        .then(() => {
          this.resultDialog = true;
          this.isRedirect = true;
          this.rtMsg1 = 'You are succesfully registered JP Wordbook Service!';
          this.rtMsg2 = 'Please Log in in with your account.';
        })
        .catch((e) => {
          this.resultDialog = true;
          this.isRedirect = false;
          this.rtMsg1 = `Error! http-error code ${e.response.status}`;
          this.rtMsg2 = e.response.data.msg;
        });
    },
    notifyClickOk() {
      this.resultDialog = false;
      if (this.isRedirect) {
        this.SignUpForm = {
          id: '',
          email: '',
          password: '',
          passwordConfirm: '',
          nickname: '',
        };
        this.tab = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.signInDivider {
  width: 70px;
  margin: auto;
  background-color: #8ac6d1;
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
@media only screen and (max-width: 600px) {
  .SignInTitle {
    font-size: 27px;
  }
}
@media only screen and (max-width: 450px) {
  .SignInTitle {
    font-size: 24px;
  }
}
</style>
