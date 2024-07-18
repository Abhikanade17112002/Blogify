const jwt = require("jsonwebtoken");
const user = require("../models/user.model");

const handleIsUserLoggedIn = async (request, response, next) => {
  const currentUserToken = request.cookies.token;
  if (currentUserToken) {
    const currentLoggedInUser = await jwt.verify(
      currentUserToken,
      process.env.JWTSECERET
    );

    const currentLoggedInUserInfo = await user.findOne({
      email: currentLoggedInUser.email,
    });

    request.currentUser = currentLoggedInUserInfo;

    next();
  } else {
    return response.redirect("/signin");
  }
};

module.exports = handleIsUserLoggedIn;
