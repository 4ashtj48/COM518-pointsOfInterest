module.exports = {
  //ensure and forwardAuthenticated- passport

  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    //req.flash("error_msg", "Log in to view page");
    res.redirect("/");
  },

  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/home");
  },
};
