import { Add } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import Link from "next/link";

/**
 * Simple FAB positioned to bottom right of the screen.
 */
export function FabLink({ href, icon = <Add /> }) {
    return (
        <Box sx={{ position: "fixed", right: 0, bottom: 0, padding: 4 }}>
            <Link href={href}>
                <Fab color="primary">{icon}</Fab>
            </Link>
        </Box>
    );
}
