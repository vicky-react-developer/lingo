const { User } = require("../models");
const { buildQueryOptions } = require("../utils/queryOptions");

const getFaculties = async (query) => {
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
      "qualification",
      "organisation",
      "phoneNumber",
    ],

    allowedSortFields: [
      "id",
      "name",
      "userName",
      "qualification",
      "organisation",
      "phoneNumber",
      "isActive",
      "createdAt",
    ],

    defaultSort: "createdAt",
    defaultOrder: "DESC",
  });

  // Add faculty condition
  where.role = "Faculty";

  const { count, rows } = await User.findAndCountAll({
    where,

    attributes: {
      exclude: [
        "passwordHash",
        "tokenHash",
        "resetTokenHash",
        "resetTokenExpiresAt",
      ]
    },

    order,
    limit,
    offset,
  });

  const page = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(count / limit);

  return {
    data: rows,
    pagination: {
      currentPage: page,
      pageSize: limit,
      totalItems: count,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

const getFacultyOptions = async () => {
  return await User.findAll({
    where: {
      role: "Faculty",
      isActive: true,
    },

    attributes: ["id", "name"],

    order: [["name", "ASC"]],
  });
};

module.exports = {
  getFaculties,
  getFacultyOptions
}