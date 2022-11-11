export default function ({ $axios, req }) {
  if (req.headers.cookie === null) {
    return;
  }

  if (process.server) {
    $axios.defaults.headers.common.cookie = req.headers.cookie;
  }

  $axios.onRequest((config) => {
    if (config.headers !== null && config.headers['Allow-Cross-Origin'] === '*') {
      config.withCredentials = false;
      config.headers = {
        ...config.headers
      };
      config.responseType = 'json';
    }
    return config;
  });
}
