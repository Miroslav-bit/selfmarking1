const params = new URLSearchParams(window.location.search);
const userId = params.get("user");

if (!userId) {
  document.body.innerHTML = "Greška: Nema ID korisnika.";
} else {
  const token = localStorage.getItem("token");

  const headers = token ? { 'Authorization': 'Bearer ' + token } : {};

  fetch(`https://selfmarking-backend.onrender.com/api/user/${userId}/panel`, {
    headers: headers
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Panel nije dostupan.");
      }
      return res.json();
    })
    .then(panel => {
      if (!panel) return;
      console.log("Panel:", panel);
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
      document.getElementById("panel").innerHTML = "Panel trenutno nije dostupan.";
    });
}
