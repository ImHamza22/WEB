const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    error: null,
    layout: "layouts/default",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("auth/login", {
        error: "User not found.",
        old: {email: email},
        layout: "layouts/default",
        });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.render("auth/login", {
                error: "Invalid password.",
                old: {email: email},
                layout: "layouts/default",
                });    
        }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.render("auth/login", {
                error: "Something went wrong.",
                old: {email: email},
                layout: "layouts/default",
                }); 
    }
};

exports.getRegister = (req, res) => {
    return res.render("auth/register", {
        error: null,
        layout: "layouts/default",
        });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.render("auth/register", {
            error: "Email is already registered.",
            old: {name: name, email: email},
            layout: "layouts/default",
            });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    return res.render("auth/login", {
        error: null,
        layout: "layouts/default",
    });
  } catch (err) {
    console.error(err);
    return res.render("auth/register", {
            error: "Registration Failed",
            old: {name: name, email: email},
            layout: "layouts/default",
            });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect("/");
  });
};
