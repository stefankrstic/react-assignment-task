"use client";

import { getUser, saveUser } from "@/api";
import { Header } from "@/components/common/Header";
import { UserForm } from "@/components/users/UserForm";
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
            <Header>Users &raquo; Edit</Header>
            <UserForm initialState={user} onSubmit={handleSubmit} onCancel={() => router.push("/users")} />
        </div>
    );
}

export const getServerSideProps = async (context) => {
    return { props: { user: await getUser(context.query.id) } };
};
