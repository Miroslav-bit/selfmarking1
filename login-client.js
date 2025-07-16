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
      body: JSON.stringify({
        email,
        password: lozinka
      })
    });

    const data = await res.json();
    const poruka = document.getElementById("poruka");

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userIme", data.user.name);
      localStorage.setItem("userPrezime", data.user.surname);
      localStorage.setItem("userAvatar", data.user.avatarUrl);
      localStorage.setItem("userId", data.user.id);

      poruka.innerText = "Uspešno prijavljeni!";
      poruka.style.color = "green";

      setTimeout(() => {
        window.location.href = `main-categories.html?user=${data.user.id}`;
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
