const Complaint = require("../models/Complaint");

exports.getContactForm = (req, res) => {
  res.render("contact/contactUs", {layout: "layouts/app" });
};

exports.submitContactForm = async (req, res) => {
  try {
    const { orderId, message } = req.body;
    const newComplaint = new Complaint({
      userId: req.session.user.id,
      orderId,
      message,
    });

    await newComplaint.save();
    res.redirect("/contact/complaint/my");
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).send("Something went wrong.");
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.render("contact/allComplaints", { complaints, layout: "layouts/admin" });
  } catch (error) {
    console.error("Error fetching all complaints:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const myComplaints = await Complaint.find({ userId }).sort({ createdAt: -1 });
    res.render("contact/myComplaints", { complaints: myComplaints, layout: "layouts/app" });
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    res.status(500).send("Internal Server Error");
  }
};
