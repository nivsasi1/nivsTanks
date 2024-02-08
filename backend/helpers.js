const CarData = require("./models/carData.cjs");
const User = require("./models/users.cjs");

const handleAddTank = async (req, res) => {
  if (isManager(req)) {
    res.send(await addTank(req.body));
  } else {
    res.send({ message: "fail, not manager/connected" });
  }
};

const handleTanks = async (req, res) => {
  if (isManager(req)) {
    res.send(await getAllTanks());
  } else if (req.user) {
    res.send(await getTanksByGdud(req.user.gdud));
  } else {
    // not connected
    res.status(500);
  }
};

const handleLogin = (req, res) => {
  res.send(
    JSON.stringify({
      message: "success",
      gdud: req.user.gdud,
      isManager: req.user.isManager,
      pernr: req.user.pernr,
    })
  );
};

const handleLogout = (req, res, next) => {
  let message;
  req.logout(function (err) {
    if (err) {
      return next(err);
      // res.status(409).json({status: "failed"})
    }
    message = "Logged Out";
  });
  req.session.destroy(function (err) {
    if (!err) {
      res
        .status(200)
        .clearCookie("connect.sid", { path: "/" })
        .json({ status: "success" });
      return;
    } else {
      res.send({ message });
    }
  });
};

const isLoggedIn = (req, res) => {
  if (req.isAuthenticated()) {
    res.send(
      JSON.stringify({
        message: "authenticated",
        gdud: req.user.gdud,
        isManager: req.user.isManager,
        pernr: req.user.pernr,
      })
    );
  } else {
    res.send(JSON.stringify({ message: "not authenticated" }));
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

const doesUserExist = async (pernr) => {
  try {
    const user = await User.findOne({ pernr: pernr });
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const api = {
  handleAddTank: handleAddTank,
  handleTanks: handleTanks,
  handleLogin: handleLogin,
  handleLogout,
  doesUserExist,
  isLoggedIn,
};

module.exports = api;
