//create token and saving in cookies

const sendToken = (user, status, name, res) => {
  const token = user.getJwtToken();

  //Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(status).cookie(name, token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
