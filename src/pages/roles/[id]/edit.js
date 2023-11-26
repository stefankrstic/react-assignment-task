"use client";

import { api, updateRole, getRole } from "@/api";
import { Typography } from "@mui/material";
import { RoleForm } from "@/components/roles/RoleForm";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Edits({ role }) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateRole,
        onMutate: async (updatedRole) => {
            const state = queryClient.getQueryData(["roles"]);

            queryClient.setQueryData(["roles"], (state) => {
                return state.map((role) => {
                    return role.id === updatedRole.id ? updatedRole : role;
                });
            });

            return { state };
        },
        onError: (error, updatedRole, { state }) => {
            queryClient.setQueryData(["roles"], state);
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
                Roles &raquo; Edit
            </Typography>
            <RoleForm initialState={role} onSubmit={handleSubmit} onCancel={() => router.push("/roles")} />
        </div>
    );
}

export const getServerSideProps = async (context) => {
    return { props: { role: await getRole(context.query.id) } };
};
