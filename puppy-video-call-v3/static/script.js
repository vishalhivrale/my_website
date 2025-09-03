// Handle Login
if (document.getElementById("loginForm")) {
  const loginForm = document.getElementById("loginForm");
  const loginPuppy = document.getElementById("loginPuppy");
  const barkSound = document.getElementById("barkSound");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const res = await fetch("/", { method: "POST", body: formData });
    const data = await res.json();
    if (data.success) {
      loginPuppy.src = "/static/assets/shihtzu-smile.gif";
      window.location.href = "/index";
    } else {
      loginPuppy.src = "/static/assets/Barking Nicki Minaj GIF by DNCE.gif";
      barkSound.play();
      setTimeout(() => {
        loginPuppy.src = "/static/assets/shihtzu-smile.gif";
      }, 2000);
    }
  });
}

// Handle Signup
if (document.getElementById("signupForm")) {
  const signupForm = document.getElementById("signupForm");
  const signupPuppy = document.getElementById("signupPuppy");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const res = await fetch("/signup", { method: "POST", body: formData });
    const data = await res.json();
    if (data.success) {
      signupPuppy.src = "/static/assets/shihtzu-smile.gif";
      alert("Signup successful! Please login.");
      window.location.href = "/";
    } else {
      signupPuppy.src = "/static/assets/Barking Nicki Minaj GIF by DNCE.gif";
      alert(data.error === "exists" ? "User already exists!" : "Passwords do not match!");
      setTimeout(() => {
        signupPuppy.src = "/static/assets/shihtzu-smile.gif";
      }, 2000);
    }
  });
}

// Quotes Rotation
if (document.getElementById("quoteText")) {
  let quotes = [];
  fetch("/static/quotes.json")
    .then((res) => res.json())
    .then((data) => {
      quotes = data;
      let index = 0;
      setInterval(() => {
        document.getElementById("quoteText").innerText = quotes[index];
        index = (index + 1) % quotes.length;
      }, 4000);
    });
}

// Dark/Light Toggle
if (document.getElementById("darkToggle")) {
  document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
  });
}
