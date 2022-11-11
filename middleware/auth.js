export default function ({ store, redirect }) {
  if (!store.getters.IS_AUTHENTICATED) {
    return redirect('/login');
  }
}
