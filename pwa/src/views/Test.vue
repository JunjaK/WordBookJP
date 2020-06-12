<template>
  <v-container fluid :style="$vuetify.breakpoint.xs ? 'margin-top: 40px' : 'margin-top: 60px'">
    <div class="categoryTitle" style="text-align: center">Take Test</div>
    <div class="mx-0">
      <div class="mt-1 divider"></div>
    </div>
    <v-layout justify-center class="mt-12">
      <v-flex xs12 sm8 md6>
        <div class="categorySelect mb-4 ml-1">Select Area you take Test</div>
        <v-select :items="areas" v-model="selectedArea" outlined label="Select Area"></v-select>
        <div v-show="(selectedArea === null || selectedArea === 'All words') ? false : true">
          <div class="categorySelect" style="text-align: center">Select Type you take Test</div>
          <a class="mx-4" @click="selectedType='total'">
            <v-card style="padding: 5px 15px 5px 15px; margin: auto" outlined :color="selectedType === 'total' ? 'secondary' : ''" max-width="230">
              <div class="categorySelect" style="text-align: center" :style="selectedType === 'total' ? 'color: #ffffff' : ''">max 20 Words from Total</div>
            </v-card>
          </a>
          <div class="categorySelect my-n2" style="text-align: center">or</div>
          <a class="mx-4" @click="selectedType='recent'">
            <v-card style="padding: 5px 15px 5px 15px; margin: auto" outlined :color="selectedType === 'recent' ? 'secondary' : ''" max-width="230">
              <div class="categorySelect" style="text-align: center" :style="selectedType === 'recent' ? 'color: #ffffff' : ''">max 20 Word from Recent</div>
            </v-card>
          </a>
        </div>
        <v-row justify="center" class="mx-0 mt-5">
          <v-btn block large style="font-size: 20px" color="primary" :disabled="!buttonDisable" @click="takeTest">Take Test</v-btn>
        </v-row>
      </v-flex>
    </v-layout>
    <!-- 시험 다이얼로그 -->
    <v-dialog v-model="testDialog" persistent max-width="400">
      <v-card max-width="400" outlined class="pa-3">
        <div style="text-align: center; font-size: 22px; font-weight: 300; color: #3f3f44" class="mt-1">Test Progress</div>
        <div class="mb-5 divider"></div>
        <v-progress-linear class="mt-2 mb-5" color="secondary" height="20" :value="wordIndex/testUntil*100">
          <div style="text-align: center; font-size: 12px; font-weight: 500; color: #ffffff"> {{wordIndex}} / {{testUntil}}</div>
        </v-progress-linear>
        <div>
          <v-text-field
            color="primary"
            label="Word"
            readonly
            v-model="testWord"
            outlined
          ></v-text-field>
          <v-text-field
            ref="meanTextField"
            color="primary"
            label="Mean"
            v-model="mean"
            autofocus
            @keydown.enter="$refs.pronounceTextField.focus()"
            outlined
          ></v-text-field>
          <v-text-field
            ref="pronounceTextField"
            color="primary"
            label="Pronounce"
            v-model="pronounce"
            outlined
            @keydown.enter="loadNextWord()"
          ></v-text-field>
          <v-btn block color="primary">{{wordIndex === testUntil ? 'submit' : 'next'}}</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <!-- 결과 다이얼로그 -->
    <v-dialog v-model="testResultDialog" max-width="400" persistent>
      <v-card max-width="400" outlined class="pa-3">
        <div style="text-align: center; font-size: 22px; font-weight: 300; color: #3f3f44" class="mt-1">Test Result</div>
        <div class="mb-5 divider"></div>
        <v-row class="mx-0" justify="center">
          <div class="mr-5 contentStyle" style="font-weight: 300"><v-icon class="mt-n2" color="secondary">mdi-lightbulb-on</v-icon>
            Correct: {{correctNum}}
          </div>
          <div class="ml-5 contentStyle" style="font-weight: 300"><v-icon class="mt-n1" color="error">mdi-lightbulb-off</v-icon>
            Wrong: {{wrongNum}}
          </div>
        </v-row>
        <v-card outlined class="pa-2 my-3">
          <div class="mb-2 contentStyle" style="font-weight: 300"><v-icon class="mr-1">mdi-file-document-box-remove</v-icon>Wrong Words</div>
          <v-flex v-for="(item, index) in wrongAnswer" :key="item.id">
            <v-row justify="space-between" class="mx-0">
              <div class="mt-1" style="font-weight: 400; font-size: 16px; color: #3f3f44">{{index+1}}.</div>
              <div class="mt-1" style="font-weight: 400; font-size: 16px; color: #3f3f44">{{item.word}}</div>
              <div class="mt-1" style="font-weight: 400; font-size: 16px; color: #3f3f44">{{item.pronounce}}</div>
            </v-row>
          </v-flex>
        </v-card>
        <v-row justify="end" class="mx-0">
          <v-btn color="primary" @click="confirmTestResult()">OK</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- 에러 다이 -->
    <notify
      @clickOk="notifyClickOk"
      :onFlag="resultDialog"
      :message1="rtMsg1"
      :message2="rtMsg2"
    />
  </v-container>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { mapGetters } from 'vuex';

import alert from '../components/alert.vue';
import notify from '../components/notify.vue';

export default {
  name: 'Test',
  components: {
    alert,
    notify,
  },
  data() {
    return {
      testUntil: 0,
      testDialog: false,
      testResultDialog: true,
      areas: [],
      selectedArea: null,
      selectedType: null,

      resultDialog: false,
      rtMsg1: null,
      rtMsg2: null,
      testWord: null,
      mean: null,
      pronounce: null,
      wordIndex: null,
      testWords: [],

      correctNum: null,
      wrongNum: null,
      wrongAnswer: null,
      answers: null,
    };
  },
  created() {
    this.loadCategory();
    this.initTest();
  },
  computed: {
    ...mapGetters({
      getToken: 'getAccessToken',
      getNickname: 'getNickname',
      getUserId: 'getUserId',
    }),
    buttonDisable() {
      if (this.selectedArea === null) {
        return false;
      }
      if (this.selectedArea === 'All words') {
        return true;
      }
      if (this.selectedType === null) {
        return false;
      }
      return true;
    },
  },
  watch: {
    selectedArea() {
      this.selectedType = null;
    },
  },
  methods: {
    loadCategory() {
      this.$axios
        .get(`/category/list/${this.getUserId}`)
        .then((r) => {
          this.areas = ['All words', 'Wrong words'];
          r.data.r.forEach((elem) => {
            this.areas.push(elem.category);
          });
        })
        .catch((e) => {
          this.resultDialog = true;
          this.rtMsg1 = `Error! http-error code ${e.response.status}`;
          this.rtMsg2 = e.response.data.msg;
        });
    },
    takeTest() {
      const form = {
        userid: this.getUserId,
        area: this.selectedArea,
        type: this.selectedType,
      };
      this.$axios
        .post('/test/take', form)
        .then((r) => {
          this.initTest();
          this.testWords = r.data.r;
          this.testWord = this.testWords[0].word;
          this.testUntil = this.testWords.length > 20 ? 20 : this.testWords.length;
          this.selectedArea = null;
          this.selectedType = null;
          this.testDialog = true;
        })
        .catch((e) => {
          this.resultDialog = true;
          this.rtMsg1 = `Error! http-error code ${e.response.status}`;
          this.rtMsg2 = e.response.data.msg;
        });
    },
    submitTest() {
      const form = {
        userid: this.getUserId,
        answers: this.answers,
        correct: this.correctNum,
        wrong: this.wrongNum,
      };
      this.$axios
        .post('/test/submit', form)
        .then((r) => {
          this.testDialog = false;
          this.testResultDialog = true;
        })
        .catch((e) => {
          this.resultDialog = true;
          this.rtMsg1 = `Error! http-error code ${e.response.status}`;
          this.rtMsg2 = e.response.data.msg;
        });
    },
    loadNextWord() {
      const answer = this.testWords[this.wordIndex - 1];
      if (answer.mean.replace(/(\s*)/g, '') === this.mean.replace(/(\s*)/g, '') && answer.pronounce === this.pronounce) {
        this.correctNum += 1;
        this.answers.push({ corrent: true, word: answer });
      } else {
        this.wrongNum += 1;
        this.wrongAnswer.push(answer);
        this.answers.push({ corrent: false, word: answer });
      }
      if (this.wordIndex === this.testUntil) {
        this.submitTest();
      } else {
        this.mean = null;
        this.pronounce = null;
        this.testWord = this.testWords[this.wordIndex].word;
        this.wordIndex += 1;
        this.$refs.meanTextField.focus();
      }
    },
    notifyClickOk() {
      this.resultDialog = false;
      this.selectedArea = null;
      this.selectedType = null;
    },
    confirmTestResult() {
      this.testResultDialog = false;
      this.initTest();
    },
    initTest() {
      this.mean = null;
      this.pronounce = null;
      this.wordIndex = 1;
      this.wrongAnswer = [];
      this.answers = [];
      this.wrongNum = 0;
      this.correctNum = 0;
      this.testResultDialog = false;
      this.testDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
