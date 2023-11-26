"use client";

import { getRoles, saveUser } from "@/api";
import { Header } from "@/components/common/Header";
import { UserForm } from "@/components/users/UserForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";

export default function Create() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: roles = [] } = useQuery({ queryKey: ["roles"], queryFn: getRoles });

    const { mutate } = useMutation({
        mutationFn: saveUser,
        onMutate: async (userInput) => {
            const state = queryClient.getQueryData(["users"]);

            const tempUser = {
                ...userInput,
                id: v4(),
                role: roles.find((role) => role.id === userInput.role),
                createdAt: new Date().toISOString(),
            };

            queryClient.setQueryData(["users"], (state) => [...state, tempUser]);
            return { state };
        },
        onError: (error, userInput, { state }) => {
            queryClient.setQueryData(["users"], state);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    function handleSubmit(userInput) {
        mutate(userInput);
        router.push("/users");
    }

    return (
        <div>
            <Header>Users &raquo; Create</Header>
            <UserForm onSubmit={handleSubmit} onCancel={() => router.push("/users")} />
        </div>
    );
}
