document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const ime = document.getElementById("ime").value;
  const prezime = document.getElementById("prezime").value;
  const prebivaliste = document.getElementById("prebivaliste").value;
  const avatar = document.getElementById("avatar").value;
  const email = document.getElementById("email").value;
  const lozinka = document.getElementById("lozinka").value;

  const podaci = {
    name: ime,
    surname: prezime,
    city: prebivaliste,
    avatarUrl: avatar,
    email: email,
    password: lozinka
  };

  try {
    const res = await fetch("https://selfmarking-backend.onrender.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(podaci)
    });

    const data = await res.json();
    const poruka = document.getElementById("poruka");

    if (res.ok) {
      poruka.innerText = "Registracija uspešna! Možete se prijaviti.";
      poruka.style.color = "green";
      document.getElementById("registerForm").reset();
    } else {
      poruka.innerText = data.msg || "Greška pri registraciji.";
      poruka.style.color = "red";
    }
  } catch (err) {
    console.error("Greška:", err);
    document.getElementById("poruka").innerText = "Greška pri povezivanju sa serverom.";
  }
});
