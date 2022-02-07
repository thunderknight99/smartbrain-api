import clarifai from "clarifai";

export const handleRecognize = (req, res) => {
  let app = new clarifai.App({
    apiKey: "35e64733e19649919d1014d9b47b987e",
  });

  let { imageUrl } = req.body;

  app.models
    .predict(clarifai.FACE_DETECT_MODEL, imageUrl)
    .then((response) => {
      return res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("An error occurred.");
    });
};
