const { Op } = require("sequelize");

const buildQueryOptions = ({
  query,
  searchFields = [],
  allowedSortFields = [],
  defaultSort = "createdAt",
  defaultOrder = "DESC",
}) => {
  // Pagination
  const page = Math.max(parseInt(query.page, 10) || 1, 1);

  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 10, 1),100);

  const offset = (page - 1) * limit;

  // Search
  const search = query.search?.trim() || "";

  const where = {};

  if (search && searchFields.length > 0) {
    where[Op.or] = searchFields.map((field) => ({
      [field]: {
        [Op.like]: `%${search}%`,
      },
    }));
  }

  // Sorting
  const sortBy = allowedSortFields.includes(query.sortBy)
    ? query.sortBy
    : defaultSort;

  const sortOrder =
    query.sortOrder?.toUpperCase() === "ASC"
      ? "ASC"
      : defaultOrder;

  return {
    where,
    limit,
    offset,
    order: [[sortBy, sortOrder]],
  };
};

module.exports = {
  buildQueryOptions,
};