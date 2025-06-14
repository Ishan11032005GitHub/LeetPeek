const toggleButton = document.getElementById("themeToggle");
    toggleButton.onclick = () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
      toggleButton.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    };
    window.onload=()=>{
      const saved=localStorage.getItem("theme");
      if (saved==="dark") document.body.classList.add("dark");
    };
function getData(event){
  event.preventDefault();
  const user=document.getElementById("userName").value;
  const dataContainer=document.getElementById("data");
  fetch(`https://leetcode-stats-api.herokuapp.com/${user}`)
  .then((res)=>res.json())
  .then((data)=>{
    dataContainer.innerHTML = 
      `<h3>Statistics</h3>
        <div id="stats">
          <div id="userIdandRank">
            ${user} <br />
            <div id="rank">Rank : ${data.ranking.toLocaleString('en-in')}</div>
          </div>
          <div id="detail">
          <ul type="none">
            <li>Questions Solved: ${data.totalSolved.toLocaleString('en-in')}/${data.totalQuestions.toLocaleString('en-in')}</li>
            <li>Easy: ${data.easySolved.toLocaleString('en-in')}/${data.totalEasy.toLocaleString('en-in')}</li>
            <li>Medium: ${data.mediumSolved.toLocaleString('en-in')}/${data.totalMedium.toLocaleString('en-in')}</li>
            <li>Hard: ${data.hardSolved.toLocaleString('en-in')}/${data.totalHard.toLocaleString('en-in')}</li>
            <li>Acceptance Rate: ${data.acceptanceRate}%</li>
          </ul>
          </div>
        </div>`;
    })
    .catch((error)=>{
      dataContainer.innerHTML = `<p style="color: red; text-align: center;">Error fetching data. Check username.</p>`;
      console.error("Error in fetching data:", error);
    });
}
document.getElementById("fetch").addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
      getData();
    }
  }
)
