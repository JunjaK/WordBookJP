<template>
  <v-container fluid>
    <div></div>
    <div v-if="falseNoteFlag"></div>
  </v-container>
</template>

<script>
export default {
  name: 'Test',
  components: {

  },
  data() {
    return {
      testDialog: false,
      falseNoteFlag: false,
    };
  },
};
</script>

<style>

</style>
