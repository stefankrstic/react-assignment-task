import { getRoles } from "@/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

const UserSchema = object({
    firstName: string().required().min(2).max(20).matches(/[a-z]/, "name must contain only alphabetic characters"),
    lastName: string().required().min(2).max(20).matches(/[a-z]/, "name must contain only alphabetic characters"),
    email: string().email(),
    role: string().required(),
});

export function UserForm({ initialState, onSubmit, onCancel }) {
    const { data: roles = [] } = useQuery({ queryKey: ["roles"], queryFn: getRoles });

    const {
        register,
        handleSubmit,
        formState: { errors, ...rest },
    } = useForm({ defaultValues: initialState, resolver: yupResolver(UserSchema) });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{ maxWidth: 500 }} spacing={2}>
                <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    {...register("firstName")}
                />

                <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    {...register("lastName")}
                />

                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register("email")}
                />

                <FormControl error={!!errors.role}>
                    <InputLabel id="roleLabel">Role</InputLabel>

                    <Select labelId="roleLabel" id="role" label="Role" {...register("role")}>
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <FormHelperText error={!!errors.role}>{errors.role?.message}</FormHelperText>
                </FormControl>

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
