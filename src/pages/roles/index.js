import { getRoles } from "@/api";
import { Header } from "@/components/common/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Fab, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function Home({ roles }) {
    const { data } = useQuery({
        queryKey: ["roles"],
        initialData: roles,
        queryFn: getRoles,
    });

    return (
        <>
            <main>
                <Header>Roles</Header>
                <DataGrid
                    rows={data}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: "name", sort: "asc" }],
                        },
                    }}
                    autosizeOptions={{ columns: ["name", "description"] }}
                    columns={[
                        {
                            field: "name",
                            headerName: "Role",
                            width: 200,
                        },
                        {
                            field: "description",
                            headerName: "Description",
                            width: 1000,
                        },
                        {
                            field: "actions",
                            headerName: "",
                            disableColumnMenu: true,
                            sortable: false,
                            renderCell: ({ id }) => (
                                <Link href={`/roles/${id}/edit`}>
                                    <Button>Edit</Button>
                                </Link>
                            ),
                        },
                    ]}
                />
                <Link href="/roles/create">
                    <Fab sx={{ position: "fixed", right: 16, bottom: 16 }} color="primary">
                        <Add />
                    </Fab>
                </Link>
            </main>
        </>
    );
}

export const getServerSideProps = async () => {
    return { props: { roles: await getRoles() } };
};
