import { Layout } from "@/components/Layout";
import { CssBaseline } from "@mui/material";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <CssBaseline />

                <Layout>
                    <Main />
                    <NextScript />
                </Layout>
            </body>
        </Html>
    );
}
