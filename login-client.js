window.onload = function () {
  loadPosts();
};

function addPost() {
  const textArea = document.getElementById("postText");
  const text = textArea.value.trim();

  if (text === "") {
    alert("Unesi neki tekst.");
    return;
  }

  const post = {
    text: text,
    date: new Date().toLocaleString("sr-RS")
  };

  let posts = JSON.parse(localStorage.getItem("snagaPosts")) || [];
  posts.unshift(post);
  localStorage.setItem("snagaPosts", JSON.stringify(posts));

  textArea.value = "";
  loadPosts();
}

function loadPosts() {
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = "";

  const posts = JSON.parse(localStorage.getItem("snagaPosts")) || [];

  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    const date = document.createElement("div");
    date.className = "post-date";
    date.innerText = post.date;

    const content = document.createElement("div");
    content.innerText = post.text;

    postDiv.appendChild(date);
    postDiv.appendChild(content);
    postsContainer.appendChild(postDiv);
  });
}
