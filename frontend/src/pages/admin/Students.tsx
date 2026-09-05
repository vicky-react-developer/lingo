import { useState, useEffect } from "react";
import Table from "../../components/Table";
import SearchBox from "../../components/SearchBox";
import Pagination from "../../components/Pagination";
import { GenderMark, Avatar } from "../../components/StudentBadges";
import SelectField from "../../components/SelectField";
import { ageFromDob } from "../../utils/format";
import type { User } from "../../types/users";
import type { Column, SortOrder } from "../../types/table";
import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../../services/admin/studentService";
import { updateUserStatus } from "../../services/admin/userService";
import type { PaginationResponse } from "../../types/common";
import PageSize from "../../components/PageSize";

// TODO: replace with real faculty list (from API / lookup table)
const FACULTY_OPTIONS = [
  { value: "faculty_1", label: "Dr. A. Kumar" },
  { value: "faculty_2", label: "Dr. S. Iyer" },
  { value: "faculty_3", label: "Prof. R. Menon" },
];

const ACTIVE_OPTIONS = [
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

export default function StudentDirectory() {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ASC");

  const { data, refetch } = useQuery<PaginationResponse<User>>({
    queryFn: () => getStudents({
      page,
      limit,
      search,
      sortBy,
      sortOrder
    }),
    queryKey: ["users", page, limit, search, sortBy, sortOrder],
  });

  const students = data?.data ?? []
  const total = data?.total ?? 0;

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder((d) => (d === "ASC" ? "DESC" : "ASC"));
    } else {
      setSortBy(key);
      setSortOrder("ASC");
    }
    setPage(1);
  };

  const handleFacultyChange = async (studentId: string, facultyId: string) => {
    await updateStudent(studentId, { faculty: facultyId });
    refetch();
  };

  const handleActiveChange = async (userId: number, activeValue: string) => {
      await updateUserStatus({ userId, payload: { isActive: activeValue === "true" } });
      refetch();
  };

  const columns: Column<User>[] = [
    {
      key: "name",
      header: "Student",
      sortable: true,
      width: "220px",
      render: (r) => (
        <div className="flex items-center gap-3">
          <Avatar name={r.name} />
          <div className="min-w-0">
            <div className="truncate font-medium text-stone-900">{r.name}</div>
            <div className="truncate font-mono text-[12px] text-stone-400">@{r.userName}</div>
          </div>
        </div>
      ),
    },
    { key: "fatherName", header: "Father's Name", sortable: true, render: (r) => r.fatherName },
    {
      key: "phoneNumber",
      header: "Phone",
      render: (r) => <span className="font-mono text-[13px] text-stone-600">{r.phoneNumber}</span>,
    },
    {
      key: "dateOfBirth",
      header: "Date of Birth",
      sortable: true,
      render: (r) => (
        <div>
          <div className="text-stone-700">{r.dateOfBirth}</div>
          <div className="text-[12px] text-stone-400">{ageFromDob(r.dateOfBirth)} yrs</div>
        </div>
      ),
    },
    {
      key: "address",
      header: "Address",
      width: "260px",
      render: (r) => <span className="line-clamp-2 text-stone-500">{r.address}</span>,
    },
    { key: "gender", header: "Gender", render: (r) => <GenderMark gender={r.gender} /> },
    {
      key: "organisation",
      header: "Organisation",
      sortable: true,
      width: "220px",
      render: (r) => <span className="line-clamp-2">{r.organisation}</span>,
    },
    {
      key: "qualification",
      header: "Qualification",
      render: (r) => (
        <span className="inline-flex rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
          {r.qualification}
        </span>
      ),
    },
    { key: "place", header: "Place", sortable: true, render: (r) => r.place },
    {
      key: "faculty",
      header: "Allocated Faculty",
      width: "200px",
      render: (r) => (
        <SelectField
          variant="soft"
          name={`faculty-${r.id}`}
          value={r.faculty ?? ""}
          options={FACULTY_OPTIONS}
        // onChange={(e) => handleFacultyChange(r.id, e.target.value)}
        />
      ),
    },
    {
      key: "active",
      header: "Account",
      width: "160px",
      render: (r) => (
        <SelectField
          variant="soft"
          name={`active-${r.id}`}
          value={String(r.isActive)}
          options={ACTIVE_OPTIONS}
          onChange={(e) => handleActiveChange(r.id, e.target.value)}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-10">
      <div className="mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between border-b border-stone-200 pb-6">
          <h1 className="mt-1 font-serif text-3xl font-semibold text-stone-900">
            Student Directory
          </h1>
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <PageSize
            limit={limit}
            setLimit={setLimit}
            setPage={setPage}
          />

          <SearchBox
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder="Search name, phone, organization…"
          />
        </div>

        {/* Table */}
        <Table<User>
          columns={columns}
          data={students}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          getRowKey={(r) => r.id}
          emptyMessage="No matching students."
        />

        <Pagination
          page={page}
          total={total}
          limit={limit}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}