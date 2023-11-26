"use client";

import { getRoles, saveUser } from "@/api";
import { UserForm } from "@/components/users/UserForm";
import { Typography } from "@mui/material";
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
            <Typography sx={{ paddingBottom: 4 }} variant="h6">
                Users &raquo; Create
            </Typography>

            <UserForm onSubmit={handleSubmit} onCancel={() => router.push("/users")} />
        </div>
    );
}
