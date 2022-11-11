<template>
  <v-app>
    <v-navication-drawer
      v-model="drawer"
      class="bg-block py-auto"
      app
      prominent
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          dark
          router
          :to="item.route"
          exact
        >
          <v-list-item-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <template #append>
          <div>
            <v-btn
              v-if="IS_AUTHENTICATED"
              color="primary"
              class="mb-2"
              dark
              block
              @click="signOut()"
            >
              <v-icon>
                mdi-logout
              </v-icon>
              <span>
                ออกจากระบบ
              </span>
            </v-btn>
            <small
              class="d-block white pa-auto mb-2 center"
              nuxt
              to="/about"
              exact
            >
              &copy; {{ new Date().getFullYear() }} FS Exchanger
            </small>
          </div>
        </template>
      </v-list>
    </v-navication-drawer>

    <v-app-bar
      fixed
      app
      elevation="20"
      class="bg-inline pt-auto"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title class="text-h5 mx-auto">
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <template #extension>
        <v-toolbar
          color="transparent"
          elevation="0"
        >
          <v-spacer />
          <v-btn
            v-for="(top, i) in tops"
            :key="i"
            color="white"
            class="px-3 text-center text-button"
            text
            elevation="0"
            nuxt
            :to="top.to"
            exact
          >
            {{ top.title }}
          </v-btn>
          <v-spacer />
        </v-toolbar>
      </template>
      <v-speed-dial
        v-model="fab"
        top
        right
        :direction="direction"
        :transition="transition"
      >
        <template #activator>
          <v-btn
            v-model="fab"
            color="blue darken-1"
            dark
            fab
            small
          >
            <v-icon v-if="fab">
              mdi-close
            </v-icon>
            <v-icon v-else>
              mdi-plus-circle
            </v-icon>
          </v-btn>
        </template>
        <v-btn
          v-for="(speed, i) in speeds"
          :key="i"
          fab
          dark
          small
          :color="speed.color"
        >
          <a
            class="white--text medium"
            :href="speed.href"
            target="_blank"
          >
            <v-icon>
              {{ speed.icon }}
            </v-icon>
          </a>
        </v-btn>
      </v-speed-dial>
    </v-app-bar>

    <v-main class="bg-light">
      <v-container background-color="ghostwhite">
        <Nuxt />
      </v-container>
    </v-main>

    <v-bottom-navication
      class="bg-bottom"
      dark
      fixed
    >
      <v-btn
        v-for="link in links"
        :key="link.title"
        nuxt
        :to="link.route"
        exact
      >
        <span>
          {{ link.title }}
        </span>
        <v-icon>
          {{ link.icon }}
        </v-icon>
      </v-btn>
    </v-bottom-navication>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',

  data () {
    return {
      drawer: false,
      fixed: true,
      fab: null,
      title: 'FS Exchanger',
      items: [
        { title: 'Home', icon: 'mdi-home', route: '/' },
        { title: 'Currencies', icon: 'mdi-currency-usd', route: '/currencies' },
        { title: 'Guides', icon: 'mdi-cash', route: '/guides' },
        { title: 'Calculater', icon: 'mdi-coins', route: '/calculater' },
        { title: 'Contact Us', icon: 'mdi-contact', route: '/contact' },
        { title: 'About', icon: 'mdi-office', route: '/about' }
      ],
      tops: [
        { title: 'หน้าหลัก', to: '/' },
        { title: 'อัตราแลกเปลี่ยน', to: '/currencies' },
        { title: 'วิธีซื้อขาย', to: '/guides' }
      ],
      speeds: [
        { title: 'ไลน์', color: 'success', icon: 'mdi-chat', href: 'https://lin.ee/ZygrScM' },
        { title: 'เฟสบุ๊ค เมสเซ็นเจอร์', color: 'blue darken-2', icon: 'mdi-facebook-messenger', href: 'https://facebook.com/fsexchanger' },
        { title: 'โทรหาเรา', color: '#0072B5', icon: 'mdi-phone', href: 'tel: +66829914824' },
        { title: 'ทวิตเตอร์', color: 'primary', icon: 'mdi-twitter', href: 'https://twitter.com/VALUERENCY' },
        { title: 'WhatsApp', color: 'green darken-1', icon: 'mdi-whatsapp', href: '#' },
        { title: 'Skype', color: 'primary', icon: 'mdi-skype', href: '#' },
        { title: 'อีเมลล์', color: 'pink', icon: 'mdi-email', href: 'mailto: info@fs-exchange.com' }
      ]
    };
  },

  head () {
    return {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' },
        { ref: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
        { ref: 'stylesheet', href: 'https://materialdesignicons.com/icon' }
      ]
    };
  },

  computed: {
    IS_AUTHENTICATED () {
      return this.$store.getters.IS_AUTHENTICATED;
    },
    authUser () {
      return this.$store.state.authUser;
    },
    isLoggedIn () {
      return this.$store.state.authUser.uid !== null
        && this.$store.state.authUser.uid !== undefined;
    },
    links () {
      let link = [
        { title: 'เข้าสู่ระบบ', icon: 'mdi-login', route: '/login' },
        { title: 'สมัครสมาชิก', icon: 'mdi-account-plus', route: '/register' },
        { title: 'แจ้งโอน', icon: 'mdi-plus', route: '/neworder' },
        { title: 'ติดต่อเรา', icon: 'mdi-contact', route: '/contact' }
      ];
      if (this.IS_AUTHENTICATED && this.isLoggedIn) {
        link = [
          { title: 'ศูนย์สมาชิก', icon: 'mdi-account', route: { name: 'users-id', params: { id: this.authUser.uid } } },
          { title: 'แจ้งโอน', icon: 'mdi-plus', route: '/neworder' },
          { title: 'ประวัติ', icon: 'mdi-notes', route: '/orders' },
          { title: 'ติดต่อเรา', icon: 'mdi-contact', route: '/contact' }
        ];
      }
      return link;
    }
  },

  methods: {
    async signOut () {
      await this.$store.dispatch('signOut');
      this.$router.push('/');
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');

html,
body,
template {
  font-family: 'Roboto', 'sans-serif';
  font-size: 0.993rem;
  font-weight: 400;
  word-spacing: 1px;
  letter-spacing: .0175em;
  text-decoration: none;
  text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.t-btn {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 0.9rem;
  letter-spacing: .0175em;
}

a {
  text-decoration: none;
}

.white {
	background-color: white !important;
	color: #555555 !important;
}

.bg-white {
	background-color: white !important;
}

.bg-light {
  background-color: ghostwhite !important;
}

.light {
  background-color: ghostwhite !important;
  color: #555555 !important;
}

.light {
  background-color: ghostwhite !important;
  color: #555555 !important;
}

.light-text {
	color: #555555;
}

.bd-inline {
  border: 1px solid grey;
}

.center {
	text-align: center !important;
	vertical-align: baseline !important;
}

.user-bg {
	background-image: url('https://res.cloudinary.com/dzre5cq2d/image/upload/v1659030021/public/profile_oty4xu.jpg');
	background-size: cover;
	background-position: center;
	color: white;
}

.bg-inline {
  background-image: url('https://res.cloudinary.com/dzre5cq2d/image/upload/v1659035592/public/catstop_no0gwe.jpg');
  background-size: cover;
  background-position: center;
  color: white;
}

.bg-block {
  background-image: url('https://res.cloudinary.com/dzre5cq2d/image/upload/v1659671537/public/cats300x1600-3_bnghul.jpg');
  background-size: cover;
  background-position: center;
  color: white;
}

.bg-bottom {
  background-image: url('https://res.cloudinary.com/dzre5cq2d/image/upload/v1659035813/public/catsbottom_eiephv.jpg');
  background-size: cover;
  background-position: center;
  color: white;
}

.btn-line {
  width: 44px;
  height: 44px;
  background: url('https://firebasestorage.googleapis.com/v0/b/fs-exchange-364104.appspot.com/o/public%2Fline_88.png?alt=media&token=d8760a51-ec34-46bd-ade6-f11cd80cebdc');
  background-size: 44px 44px;
}

.bg-75 {
  background-image: url('https://res.cloudinary.com/dzre5cq2d/image/upload/v1659035813/public/catsbottom_eiephv.jpg');
  background-size: cover;
  background-position: center;
  color: white;
}

.bg-image-dark {
	background-image: url('https://res.cloudinary.com/dzre5cq2d/image/upload/v1659704392/public/bg011_yashbj.jpg');
	background-size: cover;
	background-position: center;
}

.bg-image-light {
	background-image: url('https://res.cloudinary.com/dzre5cq2d/image/upload/v1659704392/public/bg-white2_wlcjq8.jpg');
	background-size: cover;
	background-position: center;
}

.transparent {
  background-color: transparent !important;
}

.hide {
	display: none;
}

.medium {
  font-size: 0.875rem;
  font-weight: 400;
  font-family: Roboto;
  letter-spacing: .0178571429em;
}

.small {
  font-size: 10px;
}

.t-text {
	font-size: 11px;
}
</style>
