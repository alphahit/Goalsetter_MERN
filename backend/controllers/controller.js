const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");
const User = require("../model/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user.id});
  res.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, res) => {
  console.log("setGoal req.body=====>", req.body);

  if (!req.body.text) {
    res.status(400);
    throw new Error("Please Add A Text Field");
  }

  //   if(req.body.text){
  //     res.status(404).json({ message: "Please Add A Text!"})
  //   }
  //   else if(!req.body.number){
  //     res.status(404).json({ message: "Please Add A Number!"})
  //   }

  const goal = await Goal.create({ text: req.body.text, user: req.user.id });

  res.json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found!!!");
  }


  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error("User Not Found")
  }


  if(goal.user.toString()!==user.id){
    res.status(401)
    throw new Error("User Not Authorized")
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, 
    {
    new: true,
  }
  );
  res.json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found!!!");
  }
  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error("User Not Found")
  }


  if(goal.user.toString()!==user.id){
    res.status(401)
    throw new Error("User Not Authorized")
  }
  await goal.remove()
  res.status(200).json({id: req.params.id})

  // const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
  // res.json(deletedGoal);
  
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
