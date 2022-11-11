<template>
  <v-btn
    color="#00b900"
    dark
    class="d-inline-flex flex-no-wrap justify-center mb-4 py-3 text-center"
    min-width="260px"
    min-height="44px"
    @click="navigate()"
  >
    <span class="btn-line"></span>
    <span>
      {{ lineText }}
    </span>
  </v-btn>
</template>

<script>
import random from 'crypto';

import {  } from '';


export default {
  props: {
    state: {
      type: String,
      require: true,
      default: ''
    },
    nonce: {
      type: String,
      require: true,
      default: ''
    },
    lineText: {
      type: String,
      require: true,
      default: ''
    },
    clientId: {
      type: String,
      require: true,
      default: ''
    },
    clientSecret: {
      type: String,
      require: true,
      default: ''
    },
    callbackUrl: {
      type: String,
      require: true,
      default: ''
    }
  },

  data () {
    return {
      error: null
    };
  },

  async created (context) {
    const expires = 30 * 60 * 1000;
    const cookie = '{state:' + this.state +
      ', nonce:' + this.nonce +
      ', maxAge:' + expires + '}';
    await this.setCookie(cookie);


  },

  methods: {
    navigate () {
      const URL = 'https://access.line.me/oauth2/v2.1/authorize' +
        '?response_type=code' +
        '&client_id=' + this.clientId +
        '&redirect_uri=' + this.callbackUrl +
        '&scope=profile%20openid%20email' +
        '&state=' + this.state +
        '&nonce=' + this.none;
      window.location.href = URL;
    },

    async setCookie (cookie) {
      await this.$axios.setHeader('cookie', cookie);
    },

    async getLineToken (code) {},

    async getLineProfile (token) {}
  }
};
</script>
