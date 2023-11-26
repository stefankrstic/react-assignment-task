"use client";

import { Typography } from "@mui/material";
import { RoleForm } from "@/components/roles/RoleForm";
import { useRouter } from "next/navigation";
import { saveRole } from "@/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { v4 } from "uuid";

export default function Create() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: saveRole,
        onMutate: async (roleInput) => {
            const state = queryClient.getQueryData(["roles"]);
            const tempRole = { id: v4(), ...roleInput };
            queryClient.setQueryData(["roles"], (state) => [...state, tempRole]);
            return { state };
        },
        onError: (error, roleInput, { state }) => {
            queryClient.setQueryData(["roles"], state);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
        },
    });

    function handleSubmit(roleInput) {
        mutate(roleInput);
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
