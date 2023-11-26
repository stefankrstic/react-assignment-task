import { getUsers } from "@/api";
import { FabLink } from "@/components/common/FabLink";
import { Header } from "@/components/common/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home({ users }) {
    const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });
    const { data } = useQuery({
        queryKey: ["users"],
        initialData: users,
        queryFn: getUsers,
    });

    return (
        <>
            <main>
                <Header>Users</Header>
                <DataGrid
                    rows={data}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: "createdAt", sort: "desc" }],
                        },
                    }}
                    paginationModel={paginationModel}
                    pageSizeOptions={[10]}
                    onPaginationModelChange={(state) => setPaginationModel(state)}
                    columnVisibilityModel={{ createdAt: false }}
                    columns={[
                        {
                            field: "firstName",
                            headerName: "First Name",
                            width: 200,
                        },
                        {
                            field: "lastName",
                            headerName: "Last Name",
                            width: 200,
                        },
                        {
                            field: "role",
                            headerName: "Role",
                            width: 200,
                            renderCell: (params) => params.row.role.name,
                        },
                        {
                            field: "createdAt",
                            headerName: "Created At",
                            hide: true,
                        },
                        {
                            field: "actions",
                            headerName: "",
                            disableColumnMenu: true,
                            sortable: false,
                            renderCell: ({ id }) => (
                                <Link href={`/users/${id}/edit`}>
                                    <Button>Edit</Button>
                                </Link>
                            ),
                        },
                    ]}
                />
                <FabLink href="/users/create" />
            </main>
        </>
    );
}

export const getServerSideProps = async () => {
    return { props: { users: await getUsers() } };
};
