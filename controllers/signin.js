export const handleSignin = (bcryptjs, db) => (req, res) => {
  let { email, password } = req.body;
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      if (bcryptjs.compareSync(password, data[0].hash)) {
        db.select("*")
          .from("users")
          .where("email", "=", data[0].email)
          .returning("*")
          .then((user) => {
            res.json(user[0]);
          });
      } else {
        res.status(400).json("Invalid Credentials");
      }
    })
    .catch((err) => {
      res.status(500).json("Internal Server Error. Try again later!");
    });
};
