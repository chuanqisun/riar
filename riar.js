window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.code === "KeyS") {
    e.preventDefault();
    fetch(window.location.href)
      .then((result) => result.text())
      .then((html) => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(html, "text/html");
        dom.body.innerHTML = document.getElementById("edit-area").outerHTML;
        return dom.documentElement.innerHTML;
      })
      .then((html) => {
        console.log(html);
      });
  }
});
