function getRatingAndRaters(cardName, cardSub, callback) {
  fetch(`https://selfmarking-backend.onrender.com/api/ratings/raters?cardName=${encodeURIComponent(cardName)}&cardSub=${encodeURIComponent(cardSub)}`)
    .then(res => res.json())
    .then(raters => {
      const zbir = raters.reduce((sum, r) => sum + (r.score || 0), 0);
      const broj = raters.length;
      const prosek = broj > 0 ? (zbir / broj).toFixed(2) : "–";
      callback({ broj, prosek, raters });
    })
    .catch(err => {
      console.error("Greška pri dohvatanju ocena:", err);
      callback({ broj: 0, prosek: "–", raters: [] });
    });
}
