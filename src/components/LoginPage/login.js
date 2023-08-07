import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function LoginPage({ setUserActivated }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const submit = () => {
        if (login === "admin" && password === "password") {
            setUserActivated(true);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                gap: "10px",
            }}
        >
            <TextField
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder={"Login"}
            />
            <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"Password"}
                type={"password"}
            />
            <Button onClick={submit}>Log in</Button>
        </Box>
    );
}
export default LoginPage;
