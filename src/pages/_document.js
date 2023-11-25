import { CssBaseline } from "@mui/material";
import { Html, Head, Main, NextScript } from "next/document";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Link from "next/link";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <CssBaseline />

                <AppBar position="static" component="nav">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                        >
                            React Assignment Task
                        </Typography>
                        <Box>
                            <Link href="/">
                                <Button sx={{ color: "#fff" }}>Home</Button>
                            </Link>

                            <Link href="roles">
                                <Button sx={{ color: "#fff" }}>Roles</Button>
                            </Link>

                            <Link href="/users">
                                <Button sx={{ color: "#fff" }}>Users</Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Box sx={{ padding: 8 }}>
                    <Main />
                    <NextScript />
                </Box>
            </body>
        </Html>
    );
}
