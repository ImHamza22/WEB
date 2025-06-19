exports.userAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/user/login");
  }
};
exports.userLoginAuth = (req, res, next) => {
  if(req.session && req.session.admin){
    req.session.admin = null;
  }  
  next();
};
