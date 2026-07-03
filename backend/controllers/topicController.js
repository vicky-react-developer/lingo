const { Topic } = require("../models");


// Get all topics
exports.getAllTopics = async (req, res) => {
  const { mode } = req.query;
  try {

    const topics = await Topic.findAll({
      where: {
        mode
      },
      attributes: ["id", "title"],
      order: [["createdAt", "ASC"]]
    });

    return res.json({
      success: true,
      data: topics
    });

  } catch (error) {

    console.error("Fetch topics error:", error);

    return res.status(500).json({
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