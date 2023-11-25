"use client";

import { api } from "@/api";
import { Typography } from "@mui/material";
import { RoleForm } from "@/components/roles/RoleForm";
import { useRouter } from "next/navigation";

export default function Edits({ role }) {
    const router = useRouter();
    function handleSubmit(role) {
        console.log(role); //TODO
    }
    return (
        <div>
            <Typography sx={{ paddingBottom: 4 }} variant="h6">
                Roles &raquo; Edit
            </Typography>
            <RoleForm initialState={role} onSubmit={handleSubmit} onCancel={() => router.push("/roles")} />
        </div>
    );
}

export const getServerSideProps = async (context) => {
    const { data } = await api.get(`/roles/${context.query.id}`);
    return { props: { role: data } };
};
