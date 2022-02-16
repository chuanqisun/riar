document.getElementById("edit").onclick = async () => {
  const contentObj = await (
    await fetch(
      `https://api.github.com/repos/${localStorage.getItem(
        "ghPath"
      )}/contents/home.html?${Date.now()}`,
      {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${localStorage.getItem("ghToken")}`,
      }
    )
  ).json();

  const contentStr = atob(contentObj.content);
  const parser = new DOMParser();
  const dom = parser.parseFromString(contentStr, "text/html");
  document.getElementById("editable").innerHTML =
    dom.getElementById("editable");
  return;
};

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.code === "KeyP") {
    e.preventDefault();
    const result = window.prompt("<owner>/<repo>:<token>");
    if (result) {
      const [path, token] = result.split(":");
      localStorage.setItem("ghPath", path);
      localStorage.setItem("ghToken", token);
    }
  }
});

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.code === "KeyS") {
    e.preventDefault();
    // fetch(window.location.href)
    //   .then((result) => result.text())
    //   .then((html) => {
    //     const parser = new DOMParser();
    //     const dom = parser.parseFromString(html, "text/html");
    //     dom.body.innerHTML = document.getElementById("editable").innerHTML;
    //     return dom.documentElement.innerHTML;
    //   })
    //   .then((html) => {
    //     console.log(html);
    //   });
  }
});
