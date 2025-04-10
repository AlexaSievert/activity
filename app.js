let rm = {
  name: "real madrid",
  city: "madrid",
  country: "spain",
  top_scorers: ["ronaldo", "benzema", "hazard"],
  fans_count: 798,
};

db.collection("teams").add(rm);
