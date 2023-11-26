import { getRoles } from "@/api";
import { BaseDataGrid } from "@/components/common/BaseDataGrid";
import { FabLink } from "@/components/common/FabLink";
import { Header } from "@/components/common/Header";
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
                <BaseDataGrid
                    rows={data}
                    initialState={{ sorting: { sortModel: [{ field: "name", sort: "asc" }] } }}
                    columns={[
                        {
                            field: "name",
                            headerName: "Role",
                            width: 200,
                        },
                        {
                            field: "description",
                            headerName: "Description",
                            width: 300,
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
