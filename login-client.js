document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const lozinka = document.getElementById("lozinka").value;

  try {
    const res = await fetch("https://selfmarking-backend.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, lozinka })
    });

    const data = await res.json();
    const poruka = document.getElementById("poruka");

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userIme", data.user.ime);
      localStorage.setItem("userAvatar", data.user.avatar);

      poruka.innerText = "Uspešno prijavljeni!";
      poruka.style.color = "green";

      // Redirekcija na korisnički panel (npr. index.html)
      setTimeout(() => {
        window.location.href = "panel.html";
      }, 1500);
    } else {
      poruka.innerText = data.msg || "Greška pri prijavi.";
      poruka.style.color = "red";
    }
  } catch (err) {
    console.error("Greška:", err);
    document.getElementById("poruka").innerText = "Greška pri povezivanju sa serverom.";
  }
});
