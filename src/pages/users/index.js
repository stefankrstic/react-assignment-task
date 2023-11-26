import { getUsers } from "@/api";
import Head from "next/head";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Fab, Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home({ users }) {
    const [paginationModael, setPaginationModel] = useState({ pageSize: 10, page: 0 });
    const { data } = useQuery({
        queryKey: ["users"],
        initialData: users,
        queryFn: getUsers,
    });

    return (
        <>
            <Head>
                <title>React Assignment Task</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Typography sx={{ paddingBottom: 4 }} variant="h6">
                    Users
                </Typography>
                <DataGrid
                    rows={data}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: "createdAt", sort: "desc" }],
                        },
                    }}
                    pageSizeOptions={10}
                    paginationModel={paginationModael}
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
                                <Box>
                                    <Link href={`/users/${id}/edit`}>
                                        <Button>Edit</Button>
                                    </Link>
                                </Box>
                            ),
                        },
                    ]}
                />

                <Link href="/users/create">
                    <Fab sx={{ position: "fixed", right: 16, bottom: 16 }} color="primary">
                        <Add />
                    </Fab>
                </Link>
            </main>
        </>
    );
}

export const getServerSideProps = async () => {
    return { props: { users: await getUsers() } };
};