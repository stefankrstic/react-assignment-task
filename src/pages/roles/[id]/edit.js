"use client";

import { getRole, saveRole } from "@/api";
import { Header } from "@/components/common/Header";
import { RoleForm } from "@/components/roles/RoleForm";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Edits({ role }) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: saveRole,
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
            <Header>Roles &raquo; Edit</Header>
            <RoleForm initialState={role} onSubmit={handleSubmit} onCancel={() => router.push("/roles")} />
        </div>
    );
}

export const getServerSideProps = async (context) => {
    return { props: { role: await getRole(context.query.id) } };
};
