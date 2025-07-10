document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("user");

  fetch(`/api/users/${username}/panel`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("user-name").innerText = data.name;
      document.getElementById("user-location-age").innerText = `${data.age} godina • ${data.location}`;
      document.getElementById("user-avatar").src = data.avatar || "avatar.png";

      const container = document.getElementById("category-container");
      data.categories.forEach(category => {
        const div = document.createElement("div");
        div.classList.add("category-block");
        div.innerHTML = `<h3>${category.name}</h3>`;
        category.subcategories.forEach(sub => {
          const subDiv = document.createElement("div");
          subDiv.innerHTML = `<a href="/posts.html?user=${username}&main=${category.name}&sub=${sub}">${sub}</a>`;
          div.appendChild(subDiv);
        });
        container.appendChild(div);
      });
    });
});
