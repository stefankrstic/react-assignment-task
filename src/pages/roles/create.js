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
            await queryClient.cancelQueries({ queryKey: ["roles"] });
            const previousRoles = queryClient.getQueryData(["roles"]);
            const optimisticRole = { id: v4(), ...newRole };
            queryClient.setQueryData(["roles"], (old) => [...old, optimisticRole]);
            return { previousRoles };
        },
        onError: (err, newRole, context) => {
            queryClient.setQueryData(["roles"], context.previousRoles);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
    });

    function handleSubmit(role) {
        mutate(role);
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
