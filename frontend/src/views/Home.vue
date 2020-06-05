<template>
  <v-sheet :style="$vuetify.breakpoint.xs ? 'margin-top: 80px' : 'margin-top: 100px'">
    <div>
      <v-menu offset-x>
        <template v-slot:activator="{ on: menu }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-row class="mx-0" justify="center">
                <a>
                  <div class="categoryTitle" v-on="{ ...tooltip, ...menu }">{{selectedCategory}}</div>
                </a>
              </v-row>
            </template>
            <span>Select Category</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item v-for="(item) in categories" @click="selectedCategory = item" :key="item.id">
            <div class="categorySelect">{{ item }}</div>
          </v-list-item>
        </v-list>
      </v-menu>
      <div class="mt-1 homeDivider"></div>
    </div>
    <a>
      <div></div>
    </a>
  </v-sheet>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      categories: ['Default'],
      selectedCategory: 'Default',
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
      alertDialog: false,
      resultDialog: false,
      searchMyWordBook: true,
    };
  },
  created() {},
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
    loadCategory() {},
    loadWords() {},
    saveWord() {},
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
