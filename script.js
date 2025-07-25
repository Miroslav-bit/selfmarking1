window.onload = function () {
  loadPosts();
};

async function addPost() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Morate biti prijavljeni da biste objavljivali.");
    return;
  }

  const textArea = document.getElementById("postText");
  const text = textArea.value.trim();

  if (text === "") {
    alert("Unesi neki tekst.");
    return;
  }

  try {
    const res = await fetch("https://selfmarking-backend.onrender.com/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ text })
    });

    if (res.status === 401) {
      alert("Molimo Vas da se prijavite.");
      window.location.href = "login.html";
      return;
    }

    if (res.ok) {
      textArea.value = "";
      loadPosts();
    } else {
      const data = await res.json();
      alert(data.msg || "Greška pri objavljivanju.");
    }
  } catch (err) {
    console.error("Greška:", err);
    alert("Greška pri slanju objave.");
  }
}

async function loadPosts() {
  try {
    const res = await fetch("https://selfmarking-backend.onrender.com/api/posts");
    const posts = await res.json();

    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";

    posts.forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.className = "post";

      const date = document.createElement("div");
      date.className = "post-date";
      date.innerText = new Date(post.date).toLocaleString("sr-RS");

      const content = document.createElement("div");
      content.innerText = post.text;

      const autor = document.createElement("div");
      autor.style.fontSize = "14px";
      autor.style.color = "#666";
      autor.innerText = `Objavio: ${post.user?.ime || "Nepoznat"}`;

      postDiv.appendChild(date);
      postDiv.appendChild(content);
      postDiv.appendChild(autor);

      postsContainer.appendChild(postDiv);
    });
  } catch (err) {
    console.error("Greška:", err);
    alert("Greška pri učitavanju objava.");
  }
}
