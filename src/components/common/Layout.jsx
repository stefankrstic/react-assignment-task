import { AppBar, Toolbar, Typography, Box, Button, Container } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>React Assignment Task</title>
                <meta name="description" content="Simple app for managing roles and users" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AppBar position="static" component="nav">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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

            <Box sx={{ padding: 4 }}>
                <Container>{children}</Container>
            </Box>
        </>
    );
};
