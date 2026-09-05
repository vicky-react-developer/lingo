const { User } = require("../models");
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
  });

  return {
    data: rows,
    total: count
  };
};

module.exports = {
  getStudents,
};