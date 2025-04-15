console.log(firebase);

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
  section.innerHTML = `<h3><b>${title}</b></h3><pre>${JSON.stringify(
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
    const data = snapshot.docs.map((doc) => doc.data().team_name);
    displayResult("Query 1 - Teams in Spain", data);
  });

//Query 2 - show all teams in Madrid, Spain
teams
  .where("country", "==", "Spain")
  .where("city", "==", "Madrid")
  .get()
  .then((snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data().team_name);
    displayResult("Query 2 - Teams in Madrid, Spain", data);
  });

//Query 3 - Show all national teams (Remember there might be new national teams added later)
teams
  .where("city", "==", "Not applicable")
  .get()
  .then((snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data().team_name);
    displayResult("Query 3 - National Teams", data);
  });

//Query 4 - Show all teams that are not in Spain
teams
  .where("country", "!=", "Spain")
  .get()
  .then((snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data().team_name);
    displayResult("Query 4 - Non-Spain Teams", data);
  });

//Query 5 - Show all teams that are not in Spain or England
teams
  .where("country", "!=", "Spain")
  .get()
  .then((snapshot) => {
    const nonSpainTeams = snapshot.docs.map((doc) => doc.data());
    const nonSpainOrEngland = nonSpainTeams.filter(
      (team) => team.country !== "England"
    );
    const teamNames = nonSpainOrEngland.map((team) => team.team_name);
    displayResult("Query 5 - Teams NOT in Spain or England", teamNames);
  });

//Query 6 - Show all teams in Spain with more than 700M fans
teams
  .where("country", "==", "Spain")
  .get()
  .then((snapshot) => {
    const spainTeams = snapshot.docs.map((doc) => doc.data());
    const result = spainTeams.filter((team) => team.fan_count > 700);
    const teamNames = result.map((team) => team.team_name);
    displayResult("Query 6 - Spain Teams with >700M Fans", teamNames);
  });

//Query 7 - Show all teams with a number of fans in the range of 500M and 600M
teams
  .where("fan_count", ">=", 500)
  .where("fan_count", "<=", 600)
  .get()
  .then((snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data().team_name);
    displayResult("Query 7 - Teams with 500M to 600M Fans", data);
  });

//Query 8 - Show all teams where Ronaldo is a top scorer
teams
  .where("top_scorers", "array-contains", "Ronaldo")
  .get()
  .then((snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data().team_name);
    displayResult("Query 8 - Teams where Ronaldo is a Top Scorer", data);
  });

//Query 9 - Show all teams where Ronaldo, Maradona, or Messi is a top scorer
teams
  .where("top_scorers", "array-contains-any", ["Ronaldo", "Maradona", "Messi"])
  .get()
  .then((snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data().team_name);
    displayResult(
      "Query 9 - Teams where Ronaldo, Maradona, or Messi is a Top Scorer",
      data
    );
  });

//TASK 3
//a. updating existing data

//1.

// db.collection("teams")
//   .where("team_name", "==", "Real Madrid")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs[0].ref.update({
//       fan_count: 811,
//       team_name: "Real Madrid FC",
//     });
//   });

// //2.

// db.collection("teams")
//   .where("team_name", "==", "Barcelona")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs[0].ref.update({
//       fan_count: 747,
//       team_name: "FC Barcelona",
//     });
//   });

// 3. Real Madrid FC → remove "Hazard", add "Crispo"

// db.collection("teams")
//   .where("team_name", "==", "Real Madrid FC")
//   .get()
//   .then((snapshot) => {
//     const docRef = snapshot.docs[0].ref;
//     docRef
//       .update({
//         top_scorers: firebase.firestore.FieldValue.arrayRemove("Hazard"),
//       })
//       .then(() => {
//         docRef.update({
//           top_scorers: firebase.firestore.FieldValue.arrayUnion("Crispo"),
//         });
//       });
//   });

// 4. Barcelona: Remove Puyol from the list and add Deco to the list

// db.collection("teams")
//   .where("team_name", "==", "FC Barcelona")
//   .get()
//   .then((snapshot) => {
//     const docRef = snapshot.docs[0].ref;
//     docRef
//       .update({
//         top_scorers: firebase.firestore.FieldValue.arrayRemove("Puyol"),
//       })
//       .then(() => {
//         docRef.update({
//           top_scorers: firebase.firestore.FieldValue.arrayUnion("Deco"),
//         });
//       });
//   });

// b. creating new fields (colors)

db.collection("teams")
  .where("team_name", "==", "Real Madrid FC")
  .get()
  .then((snapshot) => {
    snapshot.docs[0].ref.update({
      color: {
        home: "White",
        away: "Black",
      },
    });
  });

db.collection("teams")
  .where("team_name", "==", "FC Barcelona")
  .get()
  .then((snapshot) => {
    snapshot.docs[0].ref.update({
      color: {
        home: "White",
        away: "Black",
      },
    });
  });

// c. & d. updates to the colors

db.collection("teams")
  .where("team_name", "==", "Real Madrid FC")
  .get()
  .then((snapshot) => {
    snapshot.docs[0].ref.update({
      "color.away": "Purple",
    });
  });

db.collection("teams")
  .where("team_name", "==", "FC Barcelona")
  .get()
  .then((snapshot) => {
    snapshot.docs[0].ref.update({
      "color.away": "Pink",
    });
  });
