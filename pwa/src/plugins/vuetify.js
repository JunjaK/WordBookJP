import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#8ac6d1',
        secondary: '#87DEBB',
        accent: '#cceabb',
        error: '#fe8a71',
        info: '#fffdf9',
        success: '#d1eaa3',
        warning: '#ffe3ed',
        normaltext: '#3f3f44',
      },
    },
  },
});
