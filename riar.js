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
    dom.getElementById("editable").innerHTML;
};

document.getElementById("save").onclick = async () => {
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

  const sha = contentObj.sha;

  const contentStr = atob(contentObj.content);
  const parser = new DOMParser();
  const dom = parser.parseFromString(contentStr, "text/html");
  dom.getElementById("editable").innerHTML =
    document.getElementById("editable").innerHTML;
  const newContent = btoa(dom.documentElement.outerHTML);

  await fetch(
    `https://api.github.com/repos/${localStorage.getItem(
      "ghPath"
    )}/contents/home.html`,
    {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${localStorage.getItem("ghToken")}`,
      },
      body: JSON.stringify({
        message: "bot generated",
        content: newContent,
        sha,
      }),
    }
  );
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
