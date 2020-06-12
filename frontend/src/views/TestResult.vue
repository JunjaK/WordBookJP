<template>
  <v-container fluid :style="$vuetify.breakpoint.xs ? 'margin-top: 40px' : 'margin-top: 60px'">
    <div class="categoryTitle" style="text-align: center">Test Results</div>
    <div class="mx-0">
      <div class="mt-1 divider"></div>
    </div>
    <v-layout justify-center class="mt-12">
      <v-flex xs12 sm8 md6>

      </v-flex>
    </v-layout>
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
  methods: {
    loadCategory() {
      this.$axios
        .get(`/category/list/${this.getUserId}`)
        .then((r) => {
          this.areas = ['All words', 'Wrong Word'];
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
  },
};
</script>

<style lang="scss" scoped>
</style>
