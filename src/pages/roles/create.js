import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import Link from "next/link";

const RoleSchema = object({
    name: string()
        .required()
        .min(2)
        .max(16)
        .matches(/[a-z0-9_]+/, "name must be alphanumeric and can contain underscore (_) characters"),
    description: string().min(2).max(50),
});

export default function Create() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(RoleSchema) });

    const onSubmit = (data) => console.log(data); //TODO
    return (
        <div>
            <Typography sx={{ paddingBottom: 4 }} variant="h6">
                Roles &raquo; Create
            </Typography>
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

                        <Link href="/roles">
                            <Button>Cancel</Button>
                        </Link>
                    </Stack>
                </Stack>
            </form>
        </div>
    );
}
