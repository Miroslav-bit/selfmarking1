const params = new URLSearchParams(window.location.search);
const userId = params.get("user");

if (!userId) {
  document.body.innerHTML = "Greška: Nema ID korisnika.";
} else {
  fetch(`https://selfmarking-backend.onrender.com/api/user/${userId}/panel`)
    .then(res => res.json())
    .then(data => {
      console.log("Panel za korisnika:", data);
      // Ovde dodaj prikaz podataka na stranici
    })
    .catch(err => {
      console.error("Greška pri učitavanju panela:", err);
    });
}
