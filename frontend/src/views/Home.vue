<template>
  <v-container fluid :style="$vuetify.breakpoint.xs ? 'margin-top: 40px' : 'margin-top: 60px'">
    <div>
      <v-layout justify-center>
        <v-menu offset-x>
          <template v-slot:activator="{ on: menu }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <a>
                  <div class="categoryTitle ml-4" v-on="{ ...tooltip, ...menu }">{{selectedCategory}}</div>
                </a>
              </template>
              <span>Select Category</span>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-item
              v-for="(item) in categories"
              @click="selectedCategory = item"
              :key="item.id"
            >
              <div class="categorySelect">{{ item }}</div>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu bottom offset-x>
          <template v-slot:activator="{ on }">
            <a>
              <v-icon
                :size="$vuetify.breakpoint.xs ? 25 : 30"
                v-on="on"
                style="margin-left: 10px;"
                :class="$vuetify.breakpoint.xs ? 'mt-3' : 'mt-5'"
              >mdi-view-headline</v-icon>
            </a>
          </template>

          <v-list>
            <v-list-item
              v-for="(operation, i) in categoryOp"
              :key="i"
              @click="callCudCategory(operation)"
            >
              <div class="categorySelect">{{ operation }}</div>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-layout>

      <div class="mr-4">
        <div class="mt-1 homeDivider"></div>
      </div>

      <v-layout justify-center class="mt-12">
        <v-flex xs12 sm8 md6>
          <!-- search -->
          <v-row class="ml-5 mr-2">
            <v-text-field
              :label="searchMyWordBook ? 'Search in my Wordbook' : 'Search in NaverDict'"
              single-line
              outlined
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
            <v-menu bottom offset-x>
              <template v-slot:activator="{ on }">
                <a>
                  <v-icon
                    v-on="on"
                    size="30"
                    style="margin-left: 5px;margin-top: 13px"
                  >mdi-dots-vertical</v-icon>
                </a>
              </template>
              <v-list>
                <v-list-item>
                  <a>
                    <div class="categorySelect" @click="searchMyWordBook = true">My Wordbook</div>
                  </a>
                </v-list-item>
                <v-list-item>
                  <a>
                    <div class="categorySelect" @click="searchMyWordBook = false">NaverDict</div>
                  </a>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
          <!--  -->

          <!-- word -->
          <v-flex v-for="word in words" :key="word.id">
            <v-card outlined>
              <v-row justify="space-between" class="mx-0">
                <div class="wordText">{{word.word}}</div>
                <div class="wordText">{{word.mean}}</div>
                <div class="wordText">{{word.pronounce}}</div>
              </v-row>
            </v-card>
            <v-divider></v-divider>
          </v-flex>
          <!--  -->
        </v-flex>
      </v-layout>
      <!-- CU dailogs -->
      <v-dialog max-width="500" v-model="wordCuDialog.flag">
        <v-card max-width="500" outlined class="pa-3">
          <div></div>
          <v-row justify="end">
            <v-btn @click="saveWord">Save</v-btn>
            <v-btn @click="s">Cancel</v-btn>
          </v-row>
        </v-card>
      </v-dialog>
      <!--  -->
      <!-- dialogs -->
      <notify
          @clickOk="notifyClickOk"
          :onFlag="resultDialog"
          :message1="rtMsg1"
          :message2="rtMsg2"
        />
      <!--  -->
      <!-- add Button -->
      <v-btn
        v-if="$vuetify.breakpoint.xs"
        fab
        color="primary"
        bottom
        right
        elevation="2"
        fixed
        @click="wordCuDialog.flag = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        v-else
        fab
        color="primary"
        top
        right
        elevation="2"
        fixed
        style="margin-top: 125px; margin-right: 30px"
        @click="wordCuDialog = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import alert from '../components/alert.vue';
import notify from '../components/notify.vue';

export default {
  name: 'Home',
  components: {
    alert,
    notify,
  },
  data() {
    return {
      userInfo: null,

      // category
      categoryForm: {
        category: null,
      },
      categories: ['All Words'],
      categoryOp: ['Create', 'Update', 'Delete'],
      selectedCategory: 'All words',

      // wordbook
      words: [],
      wordForm: {
        word: null,
        mean: null,
        pronounce: null,
        uesrid: null,
        category: null,
      },
      params: {
        category: null,
        search: null,
        limit: 30,
      },
      pagination: {
        page: 1,
        totalItems: 0,
        rowsPerPage: 30,
      },

      // dialog
      categoryCuDialog: { op: 'add', flag: false },
      wordCuDialog: { op: 'add', flag: false },
      alertDialog: false,
      resultDialog: false,

      searchMyWordBook: true,

      rtMsg1: null,
      rtMsg2: null,
      //
    };
  },
  created() {
    this.getUserInfo();
  },
  computed: {
    setSkip() {
      if (this.pagination.page <= 0) return 0;
      return (this.pagination.page - 1) * this.pagination.rowsPerPage;
    },
    setPage() {
      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage,
      );
    },
  },
  watch: {
    'pagination.page': {
      handler() {
        this.loadWords();
      },
    },
  },
  methods: {
    getUserInfo() {
      this.$axios
        .get('/profile/myinfo')
        .then((r) => {
          this.userInfo = r.data.r;
        })
        .catch((e) => {
          this.resultDialog = true;
          this.rtMsg1 = `Error! http-error code ${e.response.status}`;
          this.rtMsg2 = e.response.data.msg;
        });
    },
    loadCategory() {

    },
    callCudCategory(op) {
      if (op === 'Create') {
        this.categoryForm.category = null;
        this.categoryCuDialog = true;
      } else if (op === 'Update') {
        this.categoryForm.category = this.params.category;
        this.categoryCuDialog = true;
      } else {
        this.alertDialog = true;
      }
    },
    createCategory() {

    },
    updateCategory() {

    },
    deleteCategory() {

    },

    loadWords() {
      this.params.category = this.selectedCategory === 'All Words' ? '' : this.selectedCategory;
    },

    saveWord() {
      this.wordCuDialog.flag = false;
      this.wordForm.userid = this.userInfo.id;
      this.wordForm.category = this.selectedCategory === 'All Words' ? '' : this.selectedCategory;
      this.$axios
        .get('/word/save', this.wordForm)
        .then((r) => {
          this.userInfo = r.data.r;
        })
        .catch((e) => {
          this.resultDialog = true;
          this.rtMsg1 = `Error! http-error code ${e.response.status}`;
          this.rtMsg2 = e.response.data.msg;
        });
    },

    updateWord() {},
    deleteWord() {},

    changeSearchModel() {
      this.params.search = null;
      if (this.searchMyWordBook) {
        console.log();
      } else {
        console.log();
      }
    },
    checkWordCu(op) {
      if (op === 'add') {
        this.wordCuDialog.op = 'add';
      } else {
        this.wordCuDialog.op = 'update';
      }
      this.wordCuDialog.flag = true;
    },
    checkCategoryCu(op) {
      if (op === 'add') {
        this.categoryCuDialog.op = 'add';
      } else {
        this.categoryCuDialog.op = 'update';
      }
      this.categoryCuDialog.flag = true;
    },
    notifyClickOk() {
      this.resultDialog = false;
      this.wordForm.word = null;
      this.wordForm.mean = null;
      this.wordForm.pronounce = null;
      this.categoryForm.category = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.homeDivider {
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
  font-size: 14px;
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
