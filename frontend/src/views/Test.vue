<template>
  <v-container fluid :style="$vuetify.breakpoint.xs ? 'margin-top: 40px' : 'margin-top: 60px'">
    <div class="categoryTitle" style="text-align: center">Take Test</div>
    <div class="mx-0">
      <div class="mt-1 divider"></div>
    </div>
    <v-layout justify-center class="mt-12">
      <v-flex xs12 sm8 md6>
        <div class="categorySelect mb-4" style="text-align: center">Select Area you take Test</div>
        <v-select :items="areas" v-model="selectedArea" outlined label="Select Area"></v-select>
        <div v-show="(selectedArea === null || selectedArea === 'All words') ? false : true">
          <div class="categorySelect" style="text-align: center">Select Type you take Test</div>
          <a class="mx-4" @click="selectedType='total'">
            <v-card style="padding: 5px 15px 5px 15px; margin: auto" outlined :color="selectedType === 'total' ? 'secondary' : ''" max-width="230">
              <div class="categorySelect" style="text-align: center" :style="selectedType === 'total' ? 'color: #ffffff' : ''">20 Words from Total</div>
            </v-card>
          </a>
          <div class="categorySelect my-n2" style="text-align: center">or</div>
          <a class="mx-4" @click="selectedType='recent'">
            <v-card style="padding: 5px 15px 5px 15px; margin: auto" outlined :color="selectedType === 'recent' ? 'secondary' : ''" max-width="230">
              <div class="categorySelect" style="text-align: center" :style="selectedType === 'recent' ? 'color: #ffffff' : ''">20 Word from Recent</div>
            </v-card>
          </a>
        </div>
        <v-row justify="center" class="mx-0 mt-5">
          <v-btn block large style="font-size: 20px" color="primary" :disabled="!buttonDisable" @click="takeTest">Take Test</v-btn>
        </v-row>
      </v-flex>
    </v-layout>
    <v-dialog v-model="testDialog" persistent>
      <v-card max-width="400" outlined class="pa-3">
        <div>
          <v-text-field
            color="primary"
            label="Mean"
            v-model="mean"
            outlined
          ></v-text-field>
          <v-text-field
            color="primary"
            label="Pronounce"
            v-model="pronounce"
            outlined
          ></v-text-field>
          <v-btn block primary>Next</v-btn>
        </div>
      </v-card>
    </v-dialog>
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
      testDialog: false,
      areas: [],
      selectedArea: null,
      selectedType: null,

      resultDialog: false,
      rtMsg1: null,
      rtMsg2: null,

      mean: null,
      pronounce: null,
      wordIndex: 0,
      answer: [],
    };
  },
  created() {
    this.loadCategory();
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
      let category = null;
      let wrong = false;
      if (this.selectedArea === 'All words') {
        category = '';
      } else if (this.selectedArea === 'Wrong words') {
        category = '';
        wrong = true;
      } else {
        category = this.selectedArea;
      }
      const params = {
        userid: this.getUserId,
        category,
        wrong,
        type: this.selectedType,
      };
      this.$axios
        .get('/test/word', { params: { params } })
        .then((r) => {
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
    notifyClickOk() {
      this.resultDialog = false;
      this.selectedArea = null;
      this.selectedType = null;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
