"use client";

import { Typography } from "@mui/material";
import { RoleForm } from "@/components/roles/RoleForm";
import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();
    function handleSubmit(role) {
        console.log(role); //TODO
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