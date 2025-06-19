exports.adminAuth = (req, res, next) => {
  if (req.session && req.session.admin) {
    next();
  } else {
    res.redirect("/admin/login");
  }
};

exports.adminLoginAuth = (req, res, next) => {
  if(req.session && req.session.user){
    req.session.user = null;
  }  
  next();
};