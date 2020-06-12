<template>
  <v-dialog max-width="400" v-model="onFlag" persistent>
    <v-card outlined max-width="400" class="pa-4">
      <div class="dialogTitle">Alert</div>
      <div class="mt-1 mb-4 signInDivider"></div>
      <div class="dialogSubTitle">{{message1}}</div>
      <div class="dialogSubTitle">{{message2}}</div>
      <v-row justify="end" class="mx-0 mt-5">
        <v-btn small color="error" class="mr-3" @click="$emit('clickOk', true)">Confirm</v-btn>
        <v-btn small color="primary" @click="$emit('clickOk', false)">Close</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Notify',
  props: {
    onFlag: {
      type: Boolean,
      default: false,
    },
    message1: {
      type: String,
      default: null,
    },
    message2: {
      type: String,
      default: null,
    },
  },
  created() {
  },
};
</script>

<style scoped>
.signInDivider {
  width: 70px;
  margin: auto;
  background-color: #8ac6d1;
  height: 2px;
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
</style>
