const express = require("express");
const router = express.Router();
const Quiz = require("../models/question");

router.post("/post", (req, res) => {
  const { question, options, ans } = req.body;
  if (!question || !options || !ans) {
    return res.status(400).json({
      errors: [{ msg: "Tags and description required" }],
    });
  }
  let quiz = new Quiz({
    question,
    ans,
    options: Array.isArray(options)
      ? options
      : options.split(",").map((options) => options.trim()),
  });
  quiz.save((err, quiz) => {
    if (err) {
      return res.status(400).json({
        errors: [{ msg: "Something Went wrong" }],
      });
    }
    res.json(quiz);
  });
});

router.post("/ans/:quesId", (req, res) => {
  const { ans } = req.body;
  Quiz.findById(req.params.quesId).then((question) => {
    if (question.ans === ans) {
      return res.status(200).json({ ans: true });
    }
    return res.status(200).json({ ans: false });
  });
});

const shuffle = (ques) => {
  return ques.slice().sort(() => Math.random() - 0.5);
};

router.get("/allQues", (req, res) => {
  Quiz.find().then((ques) => {
    return res.status(200).json(shuffle(ques));
  });
});

module.exports = router;
