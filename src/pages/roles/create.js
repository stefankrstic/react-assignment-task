"use client";

import { Typography } from "@mui/material";
import { RoleForm } from "@/components/roles/RoleForm";
import { useRouter } from "next/navigation";
import { api } from "@/api";

export default function Create() {
    const router = useRouter();
    async function handleSubmit(role) {
        const { data } = await api.post("/roles", role);
        console.log(data);
        router.push("/roles");
    }
    return (
        <div>
            <Typography sx={{ paddingBottom: 4 }} variant="h6">
                Roles &raquo; Create
            </Typography>
            <RoleForm onSubmit={handleSubmit} onCancel={() => router.push("/roles")} />
        </div>
    );
}
