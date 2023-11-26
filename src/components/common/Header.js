import { Typography } from "@mui/material";

export function Header({ children }) {
    return (
        <Typography sx={{ paddingBottom: 4 }} variant="h6">
            {children}
        </Typography>
    );
}
