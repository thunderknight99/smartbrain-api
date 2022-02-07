export const handleProfile = (db) => (req, res) => {
  let { id } = req.params;
  db.returning("*")
    .select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("User does not exist.");
      }
    })
    .catch((err) => res.status(400).json("An error occurred!"));
};
