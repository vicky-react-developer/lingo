const { Passage } = require("../models");

// Get all passages
exports.getAllPassages = async (req, res) => {

    try {

        const passages = await Passage.findAll({
            attributes: ["id", "title", "tamilText"],
            order: [["createdAt", "ASC"]]
        });

        res.json({
            success: true,
            data: passages
        });

    } catch (error) {

        console.error("Fetch passages error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch passages"
        });

    }

};


// Get single passage
exports.getPassageById = async (req, res) => {

    try {

        const { id } = req.params;

        const passage = await Passage.findByPk(id);

        if (!passage) {

            return res.status(404).json({
                success: false,
                message: "Passage not found"
            });

        }

        res.json({
            success: true,
            data: passage
        });

    } catch (error) {

        console.error("Fetch passage error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};