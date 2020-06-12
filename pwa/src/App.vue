<template>
  <v-app id="inspire">
    <v-app-bar elevation="1" app fixed flat absolute>
      <a @click="$router.go('/')">
        <div class="subTitleStyle"><v-icon color="primary" class="mr-1 mt-n1">mdi-tag-multiple</v-icon> JP Wordbook</div>
      </a>

      <v-row class="mx-0" v-if="!$vuetify.breakpoint.xs && getToken">
        <v-spacer></v-spacer>
        <a><div @click="$router.push('/')" class="titleStyle" style="margin-left: -42px">HOME</div></a>
        <div style="color: #8ac6d1; font-size: 22px; margin-top: 0px" class="mx-7">|</div>
        <a><div @click="$router.push('/test')" class="titleStyle">TEST</div></a>
        <div style="color: #8ac6d1; font-size: 22px; margin-top: 0px" class="mx-7">|</div>
        <a><div @click="$router.push('/testresult')" class="titleStyle">TEST RESULT</div></a>
        <v-spacer></v-spacer>
        <div v-if="getToken" style="margin-top: 3px">
          <a
            @click="logOut()"
            class="subTitleStyle"
          >
            <v-icon color="primary" class="mr-1 mt-n1">mdi-account-arrow-right</v-icon>
            LOG OUT
          </a>
        </div>
        <div v-else style="margin-top: 3px">
          <a
            @click="$router.push('/login')"
            class="subTitleStyle"
          >
            <v-icon color="primary" class="mr-1 mt-n1">mdi-account-arrow-left</v-icon>
            LOG IN
          </a>
        </div>
      </v-row>
      <v-row v-else>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon v-if="getToken" style="color: #8ac6d1" @click="drawer=true"/>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer v-if="getToken" v-model="drawer" app right temporary>
      <div style="text-align: center; margin-top: 20px;" class="titleStyle">Menu</div>
      <v-list>
        <v-list-item-group color="primary" v-model="navIndex">
          <v-list-item v-for="(item, i) in navMenu" :key="i" :to="item.to">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <div v-if="item.text==='Log out'" class="contentStyle" v-text="item.text" @click="logOut"></div>
              <div v-else class="contentStyle" v-text="item.text"></div>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider class="mx-3 my-2"></v-divider>
    </v-navigation-drawer>

    <v-content>
      <router-view />
    </v-content>

    <v-footer></v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      drawer: false,
      navMenu: [
        { icon: 'mdi-account-arrow-right', text: 'Log out' },
        { icon: 'mdi-home', text: 'Home', to: { path: '/' } },
        { icon: 'mdi-file-document-box-search', text: 'Test', to: { path: '/test' } },
      ],
      navIndex: 1,
    };
  },
  computed: {
    ...mapGetters({
      getToken: 'getAccessToken',
    }),
  },
  created() {},
  mounted() {
    if (!this.getToken) {
      this.$router.push('/login');
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('commitDelToken');
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+JP:100,300,400,500&display=swap");
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500&display=swap");
#inspire {
  font-weight: 400;
}
a {
  text-decoration: none;
}
a:link {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
}
::-webkit-scrollbar {
    display: none;
}
.titleStyle {
  color: #3f3f44;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 3px;
}
.subTitleStyle {
  color: #8ac6d1;
  font-size: 20px;
  font-weight: 400;
}
.contentStyle {
  color: #343a40;
  font-size: 18px;
  font-weight: 400;
}
.smallContentStyle{
  font-size: 16px;
  font-weight: 400;
}
.dialogTitle {
  color: #343a40;
  text-align: center;
  font-size: 22px;
  font-weight: 300;
  letter-spacing: 2px;
}
.dialogSubTitle {
  color: #5a5a5a;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 2px;
}
.divider {
  width: 70px;
  margin: auto;
  background-color: #8ac6d1;
  height: 2px;
}
.categoryTitle {
  font-size: 40px;
  font-weight: 300;
  color: #3f3f44;
}
.categorySelect {
  font-size: 20px;
  font-weight: 300;
  color: #3f3f44;
}
.wordText {
  font-size: 15px;
  font-weight: 400;
  color: #3f3f44;
}
@media only screen and (max-width: 600px) {
  .categoryTitle {
    font-size: 32px;
  }
  .categorySelect {
    font-size: 16px;
  }
  .wordText {
    font-size: 13px;
  }
}
@media only screen and (max-width: 450px) {
  .categoryTitle {
    font-size: 28px;
  }
  .wordText {
    font-size: 12px;
  }
}
</style>
