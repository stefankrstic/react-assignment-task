import { getRoles } from "@/api";
import { FabLink } from "@/components/common/FabLink";
import { Header } from "@/components/common/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
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
                <FabLink href="/roles/create" />
            </main>
        </>
    );
}

export const getServerSideProps = async () => {
    return { props: { roles: await getRoles() } };
};
