export const handleRegister = (bcryptjs, db) => (req, res) => {
  let { email, name, password } = req.body;
  if (!email || !name || !password) {
    res.status(400).json({ message: "Registration Failed." });
  } else {
    // hashing password
    let salt = bcryptjs.genSaltSync(10);
    let hash = bcryptjs.hashSync(password, salt);

    db.transaction((trnx) => {
      trnx
        .insert({
          name: name,
          email: email,
          joined: new Date(),
        })
        .into("users")
        .returning("*")
        .then((user) => {
          // creating login record
          trnx
            .insert({
              id: user[0].id,
              hash: hash,
              email: email,
            })
            .into("login")
            .then((user) => {
              console.log("Login Record Created");
            });
          // returning user object as response
          res.json(user[0]);
        })
        .then(trnx.commit)
        .catch((err) => {
          trnx.rollback;
          console.log(err);
          res.status(400).json("An unexpected error occurred.");
        });
    }).catch((err) => res.status(400).json("An unexpected error occurred."));
  }
};
