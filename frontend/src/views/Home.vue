<template>
  <v-container fluid :style="$vuetify.breakpoint.xs ? 'margin-top: 40px' : 'margin-top: 60px'">
    <div>
      <v-layout justify-center>
        <v-menu offset-x>
          <template v-slot:activator="{ on: menu }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <a>
                  <div
                    class="categoryTitle ml-4"
                    v-on="{ ...tooltip, ...menu }"
                  >{{selectedCategory}}</div>
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
          <v-row class="ml-0 mr-0">
            <v-text-field
              :label="searchMyWordBook ? 'Search in my Wordbook' : 'Search in NaverDict'"
              v-model="params.search"
              single-line
              outlined
              append-icon="mdi-magnify"
              @keydown.enter="searchOn"
              @click:append="searchOn"
            ></v-text-field>
            <v-menu bottom offset-x>
              <template v-slot:activator="{ on }">
                <a>
                  <v-icon
                    v-on="on"
                    size="30"
                    style="margin-left: 5px; margin-top: 13px"
                  >mdi-dots-vertical</v-icon>
                </a>
              </template>
              <v-list>
                <v-list-item>
                  <a>
                    <div
                      class="categorySelect"
                      @click="params.search = ''; searchMyWordBook = true"
                    >My Wordbook</div>
                  </a>
                </v-list-item>
                <v-list-item>
                  <a>
                    <div
                      class="categorySelect"
                      @click="params.search = ''; searchMyWordBook = false"
                    >NaverDict</div>
                  </a>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
          <!--  -->

          <!-- word -->
          <div style="float: right">
            <v-btn
              color="secondary"
              small
              @click="hideMean ? hideMean = false : hideMean = true"
              style="text-transform: none;"
            >{{hideMean ? 'See Mean' : 'Hide Mean'}}</v-btn>
          </div>
          <div class="mt-10">
            <v-card elevation="1" class="pa-2" color="info">
              <v-row class="mx-0" justify="space-between">
                <div class="wordText">Word</div>
                <div class="wordText">Mean</div>
                <div class="wordText">Pronounce</div>
              </v-row>
            </v-card>
            <v-flex v-for="word in wordsList" :key="word.id" class="mt-2 mx-1">
              <div class="pa-1"
              @click="wordCuDialog = { op: 'update', flag: true };
                wordForm.word=word.word;
                wordForm.mean=word.mean;
                wordForm.pronounce=word.pronounce;"
              >
                <a><v-row justify="space-between" class="mx-0">
                  <div class="wordText" style="font-family: Noto Sans JP;">{{word.word}}</div>
                  <div class="wordText" style="font-family: Noto Sans KR;" :style="hideMean ? 'visibility: hidden' : ''">{{word.mean}}</div>
                  <div
                    class="wordText" style="font-family: Noto Sans JP;"
                    :style="hideMean ? 'visibility: hidden' : ''"
                  >{{word.pronounce}}</div>
                </v-row></a>
              </div>
              <v-divider></v-divider>
            </v-flex>
          </div>
          <!--  -->
          <!-- pagination -->
          <div style="visibility: hidden" :style="{'margin-top': (30-wordsList.length)*5+'px'}">a</div>
          <div class="text-center mt-4">
            <v-pagination
            color="secondary"
              v-model="pagination.page"
              :length="setPage"
              next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left"
            ></v-pagination>
          </div>
        </v-flex>
      </v-layout>

      <!-- CU dailogs -->
      <!-- Word -->
      <v-dialog max-width="500" v-model="wordCuDialog.flag" persistent>
        <v-card max-width="500" outlined class="pa-3">
          <div class="dialogTitle">{{wordCuDialog.op === 'add' ? 'Save Word' : 'Update Word'}}</div>
          <div class="mt-1 mb-6 homeDivider"></div>
          <ValidationObserver ref="obs" v-slot="{ invalid, validated}">
            <ValidationProvider name="id" rules="required" v-slot="{ errors }">
              <v-text-field
                color="primary"
                label="Word"
                v-model="wordForm.word"
                :error-messages="errors"
                clearable
                outlined
                type="text"
              ></v-text-field>
            </ValidationProvider>
            <v-text-field
              color="primary"
              label="Mean"
              v-model="wordForm.mean"
              clearable
              outlined
              type="text"
            ></v-text-field>
            <v-text-field
              color="primary"
              label="Pronounce"
              v-model="wordForm.pronounce"
              clearable
              outlined
              type="text"
            ></v-text-field>
            <v-row justify="end" class="mx-0">
              <v-btn
              class="mr-3"
                color="primary"
                @click="wordCuDialog.op === 'add' ? saveWord() : updateWord()"
                :disabled="invalid || !validated"
              >Save</v-btn>
              <v-btn v-if="wordCuDialog.op === 'update'" color="warning" class="mr-3" @click="deleteWord()">Delete</v-btn>
              <v-btn color="error" @click="closeWordCuDialog">Cancel</v-btn>
            </v-row>
          </ValidationObserver>
        </v-card>
      </v-dialog>
      <!-- category -->
      <v-dialog max-width="500" v-model="categoryCuDialog.flag" persistent>
        <v-card max-width="500" outlined class="pa-3">
          <div class="dialogTitle">{{categoryCuDialog.op === 'add' ? 'Add Category' : 'Update Category'}}</div>
          <div class="mt-1 mb-6 homeDivider"></div>
          <ValidationObserver ref="obs" v-slot="{ invalid, validated}">
            <ValidationProvider name="id" rules="required" v-slot="{ errors }">
              <v-text-field
                color="primary"
                label="Category"
                v-model="categoryForm.category"
                :error-messages="errors"
                clearable
                outlined
                type="text"
              ></v-text-field>
            </ValidationProvider>
            <v-row justify="end" class="mx-0">
              <v-btn
                color="primary"
                @click="categoryCuDialog.op === 'add' ? createCategory() : updateCategory()"
                :disabled="invalid || !validated"
              >Save</v-btn>
              <v-btn color="error" class="ml-3" @click="closeCategoryCuDialog">Cancel</v-btn>
            </v-row>
          </ValidationObserver>
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

      <v-dialog v-model="naverDictDialog" max-width="2000" persistent>
        <v-card max-width="2000" height="1000">
          <v-row style="position: absolute; z-index: 999;" class="ml-1 mt-1">
            <v-avatar
              size="25"
              style="background-color: #5a5a5a; opacity: 0.6"
              @click="naverDictDialog = false"
            >
              <a>
                <v-icon color="white" size="20">mdi-close</v-icon>
              </a>
            </v-avatar>
          </v-row>
          <iframe
            style="width:100%; height: 100%; position: relative; z-index: 5"
            :src="searchNaverDictUrl"
          ></iframe>
        </v-card>
      </v-dialog>
      <!--  -->
      <!-- add Button -->
      <v-btn
        v-if="$vuetify.breakpoint.xs"
        small
        fab
        color="primary"
        bottom
        right
        elevation="2"
        fixed
        class="mt-n3"
        @click="wordCuDialog = { op: 'add', flag: true } "
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
        @click="wordCuDialog = { op: 'add', flag: true }"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { mapGetters } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

import alert from '../components/alert.vue';
import notify from '../components/notify.vue';

export default {
  name: 'Home',
  components: {
    alert,
    notify,
    ValidationProvider,
    ValidationObserver,
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
      wordsList: [],
      selectedWord: {},
      wordForm: {
        word: null,
        mean: null,
        pronounce: null,
        uesrid: null,
        category: null,
      },
      params: {
        category: null,
        search: '',
        limit: 30,
      },
      pagination: {
        page: 1,
        totalItems: 0,
        rowsPerPage: 30,
      },
      hideMean: false,
      // dialog
      categoryCuDialog: { op: 'add', flag: false },
      wordCuDialog: { op: 'add', flag: false },
      alertDialog: false,
      resultDialog: false,
      naverDictDialog: false,
      searchNaverDictUrl: null,
      searchMyWordBook: true,

      rtMsg1: null,
      rtMsg2: null,
      //
    };
  },
  created() {
    this.getUserInfo();
    this.loadWords();
  },
  computed: {
    ...mapGetters({
      getToken: 'getAccessToken',
      getNickname: 'getNickname',
    }),
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
    createDummy() {
      this.$axios.get('/word/dummy')
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    },
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
    loadCategory() {},
    callCudCategory(op) {
      if (op === 'Create') {
        this.categoryForm.category = null;
        this.categoryCuDialog = { op: 'add', flag: true };
      } else if (op === 'Update') {
        if (this.selectedCategory === 'All words') {
          this.resultDialog = true;
          this.rtMsg1 = 'All words Category cannot Update';
        } else {
          this.categoryForm.category = this.selectedCategory;
          this.categoryCuDialog = { op: 'add', flag: true };
        }
      } else if (this.selectedCategory === 'All words') {
        this.resultDialog = true;
        this.rtMsg1 = 'All words Category cannot Delete';
      } else {
        this.categoryForm.category = this.selectedCategory;
        this.deleteCategory();
      }
    },
    createCategory() {},
    updateCategory() {},
    deleteCategory() {},

    loadWords() {
      this.params.skip = this.setSkip;
      this.params.userid = this.getNickname;
      this.params.category = this.selectedCategory === 'All words' ? '' : this.selectedCategory;
      this.$axios
        .get('/word/list', { params: this.params })
        .then((r) => {
          this.wordsList = r.data.r.list;
          this.pagination.totalItems = r.data.r.total;
        })
        .catch((e) => {
          this.resultDialog = true;
          this.rtMsg1 = `Error! http-error code ${e.response.status}`;
          this.rtMsg2 = e.response.data.msg;
        });
    },

    saveWord() {
      this.wordCuDialog.flag = false;
      this.wordForm.userid = this.userInfo.id;
      this.wordForm.category = this.selectedCategory === 'All words' ? '' : this.selectedCategory;
      this.$axios
        .post('/word/save', this.wordForm)
        .then((r) => {
          this.userInfo = r.data.r;
          this.closeWordCuDialog();
          this.loadWords();
        })
        .catch((e) => {
          this.resultDialog = true;
          this.rtMsg1 = `Error! http-error code ${e.response.status}`;
          this.rtMsg2 = e.response.data.msg;
        });
    },

    updateWord() {},
    deleteWord() {},

    searchOn() {
      if (this.searchMyWordBook) {
        this.loadWords();
      } else {
        this.naverDictDialog = true;
        this.searchNaverDictUrl = `https://ja.dict.naver.com/#/search?query=${this.params.search}&range=all`;
      }
    },
    notifyClickOk() {
      this.resultDialog = false;
      this.wordForm.word = null;
      this.wordForm.mean = null;
      this.wordForm.pronounce = null;
      this.categoryForm.category = null;
    },
    closeWordCuDialog() {
      this.wordCuDialog.flag = false;
      this.wordForm.word = null;
      this.wordForm.mean = null;
      this.wordForm.pronounce = null;
    },
    closeCategoryCuDialog() {
      this.categoryCuDialog.flag = false;
      this.categoryForm.category = null;
    },
  },
};
</script>

<style lang="scss" scoped>
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
