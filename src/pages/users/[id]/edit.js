"use client";

import { getUser, saveUser } from "@/api";
import { UserForm } from "@/components/users/UserForm";
import { Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Edit({ user }) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: saveUser,
        onMutate: async (userInput) => {
            const state = queryClient.getQueryData(["users"]);

            queryClient.setQueryData(["users"], (state) => {
                return state?.map((user) => {
                    return user.id === userInput.id ? userInput : user;
                });
            });

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
                Users &raquo; Edit
            </Typography>

            <UserForm initialState={user} onSubmit={handleSubmit} onCancel={() => router.push("/users")} />
        </div>
    );
}

export const getServerSideProps = async (context) => {
    return { props: { user: await getUser(context.query.id) } };
};
