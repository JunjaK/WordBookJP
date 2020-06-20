<template>
  <v-container fluid :style="$vuetify.breakpoint.xs ? 'margin-top: 40px' : 'margin-top: 60px'">
    <div class="categoryTitle" style="text-align: center">Test Results</div>
    <div class="mx-0">
      <div class="mt-1 divider"></div>
    </div>
    <div style="text-align: center; font-size: 32px; font-weight: 400; color: #3f3f44; margin-top: 180px" v-if="(testResults.length === 0 && checkResultNum)">
      There are no test records.
    </div>
    <v-layout justify-center class="mt-12">
      <v-flex xs12 sm8 md6>
        <v-flex v-for="(test, index) in testResults" :key="test.id">
          <a>
            <v-card class="pa-1 my-2" outlined>
              <v-row
                class="mx-0"
                justify="space-between"
                @click="loadEachTestResult(test, testResults.length-index)"
              >
                <div
                  class="categorySelect"
                >{{index}}. {{test.testname === null ? `Test ${testResults.length-index}` : test.testname}}</div>
                <v-menu bottom offset-x>
                  <template v-slot:activator="{ on }">
                    <a>
                      <v-icon
                        v-on="on"
                        size="24"
                        style="margin-left: 0px; margin-top: 3px"
                      >mdi-dots-vertical</v-icon>
                    </a>
                  </template>
                  <v-list>
                    <v-list-item>
                      <a>
                        <div
                          class="categorySelect"
                          @click="renameForm.testname = test.testname;
                                  renameForm.testnum = test.testnum
                                  renameDialog = true;"
                        >Rename</div>
                      </a>
                    </v-list-item>
                    <v-list-item>
                      <a>
                        <div class="categorySelect" @click="beforeDelete(test)">Delete</div>
                      </a>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-row>
            </v-card>
          </a>
        </v-flex>
      </v-flex>
    </v-layout>
    <!-- 결과 다이얼로그 -->
    <v-dialog v-model="testResultDialog" max-width="500">
      <v-card max-width="500" outlined class="pa-3">
        <div
          style="text-align: center; font-size: 22px; font-weight: 300; color: #3f3f44"
          class="mt-1"
        >{{selectedTestResult.testname === null ? `Test ${selectedTestResult.index}` : selectedTestResult.testname}}</div>
        <div class="mb-5 divider"></div>
        <v-row class="mx-0" justify="start">
          <div class="ml-1 mr-3 contentStyle" style="font-weight: 300; font-size: 20px">Result : </div>
          <div class="mr-3 contentStyle" style="font-weight: 300; margin-top: 2px">
            <v-icon class="mt-n2" color="secondary">mdi-lightbulb-on</v-icon>
            Correct: {{selectedTestResult.correctNum}}
          </div>
          <div class="contentStyle" style="font-weight: 300; margin-top: 2px">
            <v-icon class="mt-n1" color="error">mdi-lightbulb-off</v-icon>
            Wrong: {{selectedTestResult.wrongNum}}
          </div>
        </v-row>
        <v-row justify="space-between" class="mx-0 mt-2">
          <div class="mb-2 ml-1 contentStyle" style="font-weight: 300; font-size: 20px">Wrong Words</div>
          <v-btn
            color="secondary"
            small
            @click="hideMean ? hideMean = false : hideMean = true"
            style="text-transform: none;"
          >{{hideMean ? 'See Mean' : 'Hide Mean'}}</v-btn>
        </v-row>
        <div class="mt-0 mb-5">
          <v-card elevation="1" class="pa-2" color="info">
            <v-row class="mx-0" justify="space-between">
              <div class="wordText">Word</div>
              <div class="wordText">Mean</div>
              <div class="wordText">Pronounce</div>
            </v-row>
          </v-card>
          <div
            v-if="selectedTestResult.words.length === 0"
            style="text-align:center; margin-top: 50px; font-size: 30px"
          >Empty</div>
          <v-flex v-for="word in selectedTestResult.words" :key="word.id" class="mt-2 mx-1">
            <div class="pa-1">
              <a>
                <v-row justify="space-between" class="mx-0">
                  <div class="wordText" style="font-family: Noto Sans JP;">{{word.word}}</div>
                  <div
                    class="wordText"
                    style="font-family: Noto Sans KR;"
                    :style="hideMean ? 'visibility: hidden' : ''"
                  >{{word.mean}}</div>
                  <div
                    class="wordText"
                    style="font-family: Noto Sans JP;"
                    :style="hideMean ? 'visibility: hidden' : ''"
                  >{{word.pronounce}}</div>
                </v-row>
              </a>
            </div>
            <v-divider></v-divider>
          </v-flex>
        </div>
        <v-row justify="end" class="mx-0">
          <v-btn color="primary" @click="testResultDialog = false">Close</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog max-width="500" v-model="renameDialog">
      <v-card max-width="500" outlined class="pa-3">
        <div class="dialogTitle">Rename TestResult</div>
        <div class="mt-1 mb-6 divider"></div>
        <ValidationObserver ref="obs" v-slot="{ invalid, validated}">
          <ValidationProvider name="id" rules="required" v-slot="{ errors }">
            <v-text-field
              color="primary"
              label="Name"
              v-model="renameForm.testname"
              :error-messages="errors"
              outlined
              autofocus
              type="text"
              @keydown.enter="renameTestResult()"
            ></v-text-field>
          </ValidationProvider>
          <v-row justify="end" class="mx-0">
            <v-btn
              color="primary"
              @click="renameTestResult()"
              :disabled="invalid || !validated"
            >rename</v-btn>
            <v-btn color="error" class="ml-3" @click="renameDialog=false">Cancel</v-btn>
          </v-row>
        </ValidationObserver>
      </v-card>
    </v-dialog>
    <notify @clickOk="notifyClickOk" :onFlag="resultDialog" :message1="rtMsg1" :message2="rtMsg2" />
    <alert @clickOk="checkConfirm" :onFlag="alertDialog" :message1="warnMsg1" :message2="warnMsg2" />
  </v-container>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { mapGetters } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import alert from '../components/alert.vue';
import notify from '../components/notify.vue';

export default {
  name: 'Test',
  components: {
    alert,
    notify,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      selectedTestResult: {
        testnum: null,
        testname: null,
        correctNum: 0,
        wrongNum: 0,
        words: [],
      },
      renameDialog: false,
      renameForm: {
        testname: null,
        testnum: null,
      },
      deleteForm: {
        testnum: null,
      },
      testResultDialog: false,
      testResults: [],
      hideMean: false,

      alertDialog: false,
      warnMsg1: null,
      warnMsg2: null,

      resultDialog: false,
      rtMsg1: null,
      rtMsg2: null,

      checkResultNum: false,
    };
  },
  created() {
    this.loadTestResults();
    this.initSelected();
  },
  computed: {
    ...mapGetters({
      getToken: 'getAccessToken',
      getNickname: 'getNickname',
      getUserId: 'getUserId',
    }),
  },
  methods: {
    loadTestResults() {
      this.checkResultNum = false;
      this.$axios
        .get(`/test/list/${this.getUserId}`)
        .then((r) => {
          this.testResults = r.data.r;
          this.checkResultNum = true;
        })
        .catch((e) => {
          this.resultDialog = true;
          this.rtMsg1 = `Error! http-error code ${e.response.status}`;
          this.rtMsg2 = e.response.data.msg;
        });
    },
    loadEachTestResult(param, index) {
      this.initSelected();
      this.selectedTestResult.testnum = param.testnum;
      this.selectedTestResult.testname = param.testname;
      this.selectedTestResult.correctNum = param.correct;
      this.selectedTestResult.wrongNum = param.wrong;
      this.selectedTestResult.index = index;
      this.$axios
        .get(`/test/each/${param.testnum}`)
        .then((r) => {
          this.selectedTestResult.words = r.data.r;
          this.testResultDialog = true;
        })
        .catch((e) => {
          this.resultDialog = true;
          this.rtMsg1 = `Error! http-error code ${e.response.status}`;
          this.rtMsg2 = e.response.data.msg;
        });
    },
    deleteTestResult() {
      this.$axios
        .delete(`/test/deleteResult/${this.deleteForm.testnum}`)
        .then((r) => {
          this.loadTestResults();
          this.alertDialog = false;
          this.warnMsg1 = null;
          this.warnMsg2 = null;
          this.deleteForm.testnum = null;
        })
        .catch((e) => {
          this.resultDialog = true;
          this.rtMsg1 = `Error! http-error code ${e.response.status}`;
          this.rtMsg2 = e.response.data.msg;
        });
    },
    renameTestResult() {
      this.$axios
        .put('/test/renameResult', this.renameForm)
        .then((r) => {
          this.loadTestResults();
          this.renameDialog = false;
          this.renameForm.testnum = null;
          this.renameForm.testname = null;
        })
        .catch((e) => {
          this.resultDialog = true;
          this.rtMsg1 = `Error! http-error code ${e.response.status}`;
          this.rtMsg2 = e.response.data.msg;
        });
    },
    initSelected() {
      this.selectedTestResult = {
        testnum: null,
        testname: null,
        correctNum: 0,
        wrongNum: 0,
        words: [],
      };
    },
    notifyClickOk() {
      this.resultDialog = false;
      this.rtMsg1 = null;
      this.rtMsg2 = null;
    },
    beforeDelete(param) {
      this.deleteForm.testnum = param.testnum;
      this.alertDialog = true;
      this.warnMsg1 = 'Warning!';
      this.warnMsg2 = 'Delete this Test Result.';
    },
    checkConfirm(flag) {
      if (flag) {
        this.deleteTestResult();
      } else {
        this.alertDialog = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
