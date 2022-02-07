export const handleEntries = (db) => (req, res) => {
  let { id } = req.body;
  db.from("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      if (entries.length) {
        res.json(entries[0]);
      } else {
        res.status(400).json("No user found");
      }
    })
    .catch((err) => res.status(400).json("An error occurred."));
};
