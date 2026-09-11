const facultyService = require("../../services/faculty.service");

exports.getFaculties = async (req, res, next) => {
    try {
        const result = await facultyService.getFaculties(req.query);

        return res.status(200).json({
            success: true,
            message: "Faculties fetched successfully",
            data: result.data,
            pagination: result.pagination,
        });
    } catch (error) {
        next(error);
    }
};

exports.getFacultyOptions = async (req, res, next) => {
    try {
        const faculties = await facultyService.getFacultyOptions();

        return res.status(200).json({
            success: true,
            data: faculties,
        });
    } catch (error) {
        next(error);
    }
};