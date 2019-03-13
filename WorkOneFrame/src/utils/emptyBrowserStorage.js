export default function () {
  localStorage.clear();
  sessionStorage.clear();
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i >= 0; i--)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}