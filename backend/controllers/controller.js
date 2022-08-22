const getGoals = (req, res) => {
  res.status(200).json({ message: "Get Goals" });
};

const setGoal = (req, res) => {
  console.log("setGoal req.body=====>",req.body)  

  if(!req.body.text){
    res.status(404).json({ message: "Please Add A Text!"})
  }

  
//   if(req.body.text){
//     res.status(404).json({ message: "Please Add A Text!"})
//   }
//   else if(!req.body.number){
//     res.status(404).json({ message: "Please Add A Number!"})
//   }
  res.json({
    message: "Set goals!",
  });
};

const updateGoal = (req, res) => {
  res.json({
    message: `Update Goal ${req.params.id}`,
  });
};

const deleteGoal = (req, res) => {
  res.json({
    message: `Delete Goal ${req.params.id}`,
  });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};


