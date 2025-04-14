console.log(firebase);
console.log("hello");

let ob1 = {
  team_name: "Real Madrid",
  city: "Madrid",
  country: "Spain",
  top_scorers: ["Ronaldo", "Benzema", "Hazard"],
  fan_count: 798,
};

let ob2 = {
  team_name: "Barcelona",
  city: "Barcelona",
  country: "Spain",
  top_scorers: ["Messi", "Suarez", "Puyol"],
  fan_count: 738,
};

let ob3 = {
  team_name: "Manchester United",
  city: "Manchester",
  country: "England",
  top_scorers: ["Cantona", "Rooney", "Ronaldo"],
  fan_count: 755,
};

let ob4 = {
  team_name: "Manchester City",
  city: "Manchester",
  country: "England",
  top_scorers: ["Sterling", "Aguero", "Haaland"],
  fan_count: 537,
};

let ob5 = {
  team_name: "Brazil National Team",
  city: "Not applicable",
  country: "Brazil",
  top_scorers: ["Ronaldinho", "Cafu", "Bebeto"],
  fan_count: 950,
};

let ob6 = {
  team_name: "Argentina national team",
  city: "Not applicable",
  country: "Argentina",
  top_scorers: ["Messi", "Batistuta", "Maradona"],
  fan_count: 888,
};

let ob7 = {
  team_name: "Atletico Madrid",
  city: "Madrid",
  country: "Spain",
  top_scorers: ["Aragonés", "Griezmann", "Torez"],
  fan_count: 400,
};

//TASK 1

// db.collection("teams").add(ob1);
// db.collection("teams").add(ob2);
// db.collection("teams").add(ob3);
// db.collection("teams").add(ob4);
// db.collection("teams").add(ob5);
// db.collection("teams").add(ob6);
// db.collection("teams").add(ob7);

// TASK 2

const teams = db.collection("teams");
const outputDiv = document.getElementById("output");

function displayResult(title, data) {
  const section = document.createElement("div");
  section.innerHTML = `<h3>${title}</h3><pre>${JSON.stringify(
    data,
    null,
    2
  )}</pre>`;
  outputDiv.appendChild(section);
}

//Query 1 - show all teams in Spain
teams
  .where("country", "==", "Spain")
  .get()
  .then((snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data());
    displayResult("Query 1 - Teams in Spain", data);
  });

//Query 2 - show all teams in Madrid, Spain
teams
  .where("country", "==", "Spain")
  .where("city", "==", "Madrid")
  .get()
  .then((snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data());
    displayResult("Query 2 - Teams in Madrid, Spain", data);
  });

//Query 3 - Show all national teams (Remember there might be new national teams added later)
teams
  .where("city", "==", "Not applicable")
  .get()
  .then((snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data());
    displayResult("Query 3 - National Teams", data);
  });
