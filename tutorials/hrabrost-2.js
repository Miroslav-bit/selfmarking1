function prikaziPlanTreninga() {
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Etapa 2 – Prevazilaženje svakodnevnih strahova</h3>
    <p>Ovo je primer plana treninga za Etapu 2.</p>
    <p>Ovde će biti zadaci, dugmad za "Obavi", polje za ispit itd.</p>
  `;
  document.getElementById("etapaSelection").appendChild(div);
}
prikaziPlanTreninga();
