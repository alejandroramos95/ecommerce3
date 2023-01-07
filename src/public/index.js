(function getSessionUserEmail() {
  console.log("front cookie index", document.cookie);
  let obj = document.cookie.split("; ").reduce((prev, current) => {
    const [name, ...value] = current.split("=");
    prev[name] = value.join("=");
    return prev;
  }, {});
  console.log("front obj spliteado", obj);
  let html = decodeURIComponent(obj?.userEmail);
  document.getElementById("getUserEmail").innerHTML = html;
})();
