"use client";

import { Typography } from "@mui/material";
import { RoleForm } from "@/components/roles/RoleForm";
import { useRouter } from "next/navigation";
import { createRole } from "@/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { v4 } from "uuid";

export default function Create() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createRole,
        onMutate: async (newRole) => {
            const state = queryClient.getQueryData(["roles"]);
            queryClient.setQueryData(["roles"], (state) => [...state, newRole]);
            return { state };
        },
        onError: (error, newRole, { state }) => {
            queryClient.setQueryData(["roles"], state);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
    });

    function handleSubmit(role) {
        mutate({ id: v4(), ...role });
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
