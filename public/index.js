(function getSessionUserEmail() {
  let obj = document.cookie.split("; ").reduce((prev, current) => {
    const [name, ...value] = current.split("=");
    prev[name] = value.join("=");
    return prev;
  }, {});
  let html = decodeURIComponent(obj?.userEmail);
  document.getElementById("getUserEmail").innerHTML = html;
})();
