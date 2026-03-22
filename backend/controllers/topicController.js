const {Topic} = require("../models");


// Get all topics
exports.getAllTopics = async (req, res) => {
  try {

    const topics = await Topic.findAll({
      attributes: ["id", "title", "description"],
      order: [["createdAt", "ASC"]]
    });

    res.json({
      success: true,
      data: topics
    });

  } catch (error) {

    console.error("Fetch topics error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch topics"
    });

  }

};


// Get single topic
exports.getTopicById = async (req, res) => {

  try {

    const { id } = req.params;

    const topic = await Topic.findByPk(id);

    if (!topic) {

      return res.status(404).json({
        success: false,
        message: "Topic not found"
      });

    }

    res.json({
      success: true,
      data: topic
    });

  } catch (error) {

    console.error("Fetch topic error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};