const params = new URLSearchParams(window.location.search);
const userId = params.get("user");

if (!userId) {
  document.body.innerHTML = "Greška: Nema ID korisnika.";
} else {
  fetch(`https://selfmarking-backend.onrender.com/api/user/${userId}/panel`)
    .then(res => res.json())
    .then(panel => {
      console.log("Panel:", panel);

      const currentUserId = localStorage.getItem("userId");
      if (panel.privacy === "private" && panel.ownerId !== currentUserId) {
        document.body.innerHTML = "<h3>Ovaj self panel je privatan.</h3>";
        return;
      }

      const panelDiv = document.getElementById("panel");
      panelDiv.innerHTML = "";

      panel.categories.forEach(cat => {
        const category = document.createElement("div");
        category.innerHTML = `<h3>${cat.name}</h3><ul>` +
          cat.subcategories.map(sub => `<li>${sub.name}</li>`).join('') +
          `</ul>`;
        panelDiv.appendChild(category);
      });
    })
    .catch(err => {
      console.error("Greška pri učitavanju panela:", err);
    });
}
