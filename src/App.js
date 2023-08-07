import React, { useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, useHistory } from "react-router-dom"; // Import useHistory
import useLocalStorageState from "react-use-localstorage";
import MiniDrawer from "../src/components/layout/index";
import { Board } from "./components/Board/index";
import { BoardsContext } from "./context";
import { boardsData } from "./data";
import LoginPage from "./components/LoginPage/login";

function App() {
    const [boards, setBoards] = useLocalStorageState("boards", {
        defaultValue: [...boardsData],
    });
    const [activeBoardIndex, setActiveBoardIndex] = useLocalStorageState(
        "activeBoardIndex",
        0
    );
    const [userActivated, setUserActivated] = useLocalStorageState(
        "userActivated",
        false
    );

    const history = useHistory(); // Use useHistory

    useEffect(() => {
        if (!userActivated) {
            history.push("/login");
        }
    }, [userActivated, history]);

    return (
        <BoardsContext.Provider
            value={{
                boards,
                setBoards,
                activeBoardIndex,
                setActiveBoardIndex,
            }}
        >
            <CssBaseline />
            <Router>
                <Routes>
                    <Route
                        path="/login"
                        element={<LoginPage setUserActivated={setUserActivated} />}
                    />
                    <Route
                        path="/home"
                        element={
                            <MiniDrawer>
                                <Board />
                            </MiniDrawer>
                        }
                    />
                </Routes>
            </Router>
        </BoardsContext.Provider>
    );
}

export default App;
