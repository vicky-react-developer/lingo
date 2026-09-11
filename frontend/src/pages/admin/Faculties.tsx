import DataTable from "../../components/DataTable";
import { getFaculties } from "../../services/admin/facultyService";
import type { User } from "../../types/users";
import type { Column } from "../../types/table";
import { Avatar } from "../../components/StudentBadges";
import { ageFromDob } from "../../utils/format";
import { GenderMark } from "../../components/StudentBadges";
import SelectField from "../../components/SelectField";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateUserStatus } from "../../services/admin/userService";

const ACTIVE_OPTIONS = [
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
];

export default function Faculties() {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateUserStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["faculties"] })
        }
    })

    const handleActiveChange = async (userId: number, activeValue: string) => {
        mutate({ userId, payload: { isActive: activeValue === "true" } });
    };

    const columns: Column<User>[] = [
        {
            key: "name",
            header: "Student",
            sortable: true,
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
            key: "active",
            header: "Account",
            render: (r) => (
                <SelectField
                    variant="soft"
                    name={`active-${r.id}`}
                    value={String(r.isActive)}
                    options={ACTIVE_OPTIONS}
                    onChange={(e: any) => handleActiveChange(r.id, e.target.value)}
                />
            ),
        },
    ];

    return (
        <DataTable<User>
            title="Faculties"
            columns={columns}
            queryFn={getFaculties}
            queryKeys={["faculties"]}
            getRowKey={(faculty) => faculty.id}
        />
    )
}