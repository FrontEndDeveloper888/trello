import CssBaseline from "@mui/material/CssBaseline";
import MiniDrawer from "./components/layout";
import {useLocalStorageState} from "ahooks";
import {Board} from "./components/Board";
import {BoardsContext} from "./context";
import {boardsData} from "./data";
import React, {useState} from "react";

function App() {
    const [boards, setBoards] = useLocalStorageState("boards", {
        defaultValue: [...boardsData],
    });
    const [activeBoardIndex, setActiveBoardIndex] = useState(0);

    return (<BoardsContext.Provider value={{boards, setBoards, activeBoardIndex, setActiveBoardIndex}}>
        <CssBaseline/>
        <MiniDrawer>
            <Board/>
        </MiniDrawer>
    </BoardsContext.Provider>);
}

export default App;
