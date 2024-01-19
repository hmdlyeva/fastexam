const Users = require("../model/model");

const getAllData = async (req, res) => {
  let All = await Users.find({});
  res.send(All);
};

const deleteData = async (req, res) => {
  let id = req.params.id;
  let deleted = await Users.findByIdAndDelete({ _id: id });
  res.send(deleted);
};

const postData = async (req, res) => {
  let newData = new Users(req.body);
  newData.save();
  res.send(newData);
};

module.exports = { getAllData, deleteData, postData };
