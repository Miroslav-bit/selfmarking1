document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("ime").value;
  const surname = document.getElementById("prezime").value;
  const city = document.getElementById("prebivaliste").value;
  const avatarUrl = document.getElementById("avatar").value;
  const email = document.getElementById("email").value;
  const lozinka = document.getElementById("lozinka").value;

  try {
    const res = await fetch("https://selfmarking-backend.onrender.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        surname,
        city,
        avatarUrl,
        email,
        password: lozinka
      })
    });

    const data = await res.json();
    const poruka = document.getElementById("poruka");

    if (res.ok) {
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", payload.id);
      localStorage.setItem("userIme", name);
      localStorage.setItem("userAvatar", avatarUrl);

      poruka.innerText = "Uspešna registracija!";
      poruka.style.color = "green";

      setTimeout(() => {
        window.location.href = `main-categories.html?user=${payload.id}`;
      }, 1500);
    } else {
      poruka.innerText = data.msg || "Greška pri registraciji.";
      poruka.style.color = "red";
    }
  } catch (err) {
    console.error("Greška:", err);
    document.getElementById("poruka").innerText = "Greška pri povezivanju sa serverom.";
  }
});