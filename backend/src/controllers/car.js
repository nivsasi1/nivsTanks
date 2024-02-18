const CarData = require("../models/carData.cjs");

exports.handleAddTank = async (req, res) => {
    if (isManager(req)) {
      res.send(await addTank(req.body));
    } else {
      res.send({ message: "fail, not manager/connected" });
    }
};
  
exports.handleTanks = async (req, res) => {
    if (isManager(req)) {
      res.send(await getAllTanks());
    } else if (req.user) {
      res.send(await getTanksByGdud(req.user.gdud));
    } else {
      // not connected
      res.status(500).json({message: "not authorized"});
    }
};

const addTank = async (obj) => {
    try {
      return { message: "success", data: await CarData.create(obj) };
    } catch {
      return { message: "failed" };
    }
  };
  
  const getAllTanks = async () => {
    return await CarData.find();
  };
  
  const getTanksByGdud = async (gdud) => {
    return await CarData.find({ gdud: gdud });
  };

  const isManager = (req) => {
  return req.user && req.user.isManager == 1;
};