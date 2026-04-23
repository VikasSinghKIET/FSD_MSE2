const Grievance = require("../models/Grievance");

// Create
exports.createGrievance = async (req, res) => {
  const grievance = await Grievance.create({
    ...req.body,
    userId: req.user._id
  });

  res.status(201).json(grievance);
};

// Get all
exports.getGrievances = async (req, res) => {
  const grievances = await Grievance.find({ userId: req.user._id });
  res.json(grievances);
};

// Get by ID
exports.getGrievanceById = async (req, res) => {
  const grievance = await Grievance.findById(req.params.id);

  if (!grievance) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(grievance);
};

// Update
exports.updateGrievance = async (req, res) => {
  const grievance = await Grievance.findById(req.params.id);

  if (!grievance) {
    return res.status(404).json({ message: "Not found" });
  }

  const updated = await Grievance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

// Delete
exports.deleteGrievance = async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};

// Search
exports.searchGrievances = async (req, res) => {
  const { title } = req.query;

  const results = await Grievance.find({
    title: { $regex: title, $options: "i" },
    userId: req.user._id
  });

  res.json(results);
};