const { User, StudentFaculty } = require("../models");
const { buildQueryOptions } = require("../utils/queryOptions");

const getStudents = async (query) => {
  const {
    where,
    limit,
    offset,
    order,
  } = buildQueryOptions({
    query,

    searchFields: [
      "name",
      "userName",
      "phoneNumber",
      "qualification",
      "organisation",
      "place",
    ],

    allowedSortFields: [
      "name",
      "userName",
      "phoneNumber",
      "qualification",
      "organisation",
      "place",
      "createdAt",
    ],
  });

  where.role = "Student";

  const { count, rows } = await User.findAndCountAll({
    where,
    attributes: {
      exclude: [
        "passwordHash",
        "tokenHash",
        "resetTokenHash",
        "resetTokenExpiresAt",
      ],
    },
    order,
    limit,
    offset,
    include: [
      {
        model: StudentFaculty,
        as: "facultyAssignment",
        attributes: ["facultyId"],
      }
    ]
  });

  return {
    data: rows.flat(),
    total: count
  };
};

const assignFaculty = async (studentId, facultyId) => {
  const student = await User.findOne({
    where: {
      id: studentId,
      role: "Student",
    },
  });

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  const faculty = await User.findOne({
    where: {
      id: facultyId,
      role: "Faculty",
    },
  });

  if (!faculty) {
    const error = new Error("Faculty not found");
    error.statusCode = 404;
    throw error;
  }

  const existingAssignment = await StudentFaculty.findOne({
    where: {
      studentId,
    },
  });

  if (existingAssignment) {
    existingAssignment.facultyId = facultyId;
    await existingAssignment.save();

    return existingAssignment;
  }

  return await StudentFaculty.create({
    studentId,
    facultyId,
  });
};

module.exports = {
  getStudents,
  assignFaculty,
};
