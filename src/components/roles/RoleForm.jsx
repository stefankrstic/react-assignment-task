import { getRoles } from "@/api";
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

function getRoleSchema(existingRoles) {
    return object({
        name: string()
            .required()
            .min(2)
            .max(16)
            .matches(/[a-z0-9_]/, "name must be alphanumeric and can contain underscore (_) characters")
            .notOneOf(existingRoles.map((role) => role.name)),
        description: string().min(2).max(50),
    });
}

export function RoleForm({ initialState, onSubmit, onCancel }) {
    const { data: roles = [] } = useQuery({ queryKey: ["roles"], queryFn: getRoles });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialState, resolver: yupResolver(getRoleSchema(roles)) });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{ maxWidth: 500 }} spacing={2}>
                <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register("name")}
                />
                <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    {...register("description")}
                />
                <Stack direction="row" spacing={2}>
                    <Button type="submit" variant="contained">
                        Save
                    </Button>

                    <Button onClick={onCancel}>Cancel</Button>
                </Stack>
            </Stack>
        </form>
    );
}
