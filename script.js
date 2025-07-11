const toggleButton = document.getElementById("themeToggle");
toggleButton.onclick = () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  toggleButton.textContent = theme === "dark" ? "☀️" : "🌙";
};

window.onload = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
    toggleButton.textContent = "☀️";
  }
};

function getData(event) {
  event.preventDefault();
  const user = document.getElementById("userName").value.trim();
  const dataContainer = document.getElementById("data");

  if (!user) {
    dataContainer.innerHTML = `<p style="color:red;text-align:center;">Username cannot be empty.</p>`;
    return;
  }

  fetch(`https://leetcode-stats-api.herokuapp.com/${user}`)
    .then(res => res.json())
    .then(data => {
      if (data.status === "error") {
        throw new Error(data.message);
      }

      dataContainer.innerHTML = `
        <h3>Statistics for <span style="color:var(--accent-color);">${user}</span></h3>
        <div id="stats">
          <div class="stat-card">
            <ul>
              <li><strong>Rank:</strong> ${data.ranking.toLocaleString('en-IN')}</li>
              <li><strong>Total Solved:</strong> ${data.totalSolved}/${data.totalQuestions}</li>
              <li><strong>Acceptance Rate:</strong> ${data.acceptanceRate}%</li>
            </ul>
          </div>
          <div class="stat-card">
            <ul>
              <li><strong>Easy:</strong> ${data.easySolved}/${data.totalEasy}</li>
              <li><strong>Medium:</strong> ${data.mediumSolved}/${data.totalMedium}</li>
              <li><strong>Hard:</strong> ${data.hardSolved}/${data.totalHard}</li>
            </ul>
          </div>
        </div>`;
    })
    .catch(error => {
      console.error("Fetch error:", error);
      dataContainer.innerHTML = `<p style="color:red;text-align:center;">Could not fetch data. Please check the username.</p>`;
    });
}
