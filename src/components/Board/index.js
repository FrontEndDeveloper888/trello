import {
    Stack,
    ListItemText,
    Box,
    Typography,
} from "@mui/material";
import * as React from "react";
import { useContext } from "react";
import { BoardsContext } from "../../context";
import { styles } from "./styles";
import { TaskDialog } from "../TaskDialog";

export const Board = (props) => {
    const { boards, setBoards, activeBoardIndex, setActiveBoardIndex } =
        useContext(BoardsContext);

    const [open, setOpen] = React.useState(false);
    const [listIndex, setListIndex] = React.useState(null);
    const [taskIndex, setTaskIndex] = React.useState(null);

    const handleClickOpen = (selectedListIndex, selectedTaskIndex) => {
        setOpen(true);
        setListIndex(selectedListIndex);
        setTaskIndex(selectedTaskIndex);
    };

    const handleClose = (value) => {
        setOpen(false);
        setListIndex(null);
        setTaskIndex(null);
    };

    const handleMoveTask = (fromListIdx, fromTaskIdx, toListIdx) => {
        const taskToMove = boards[activeBoardIndex].lists[fromListIdx].tasks[fromTaskIdx];
        setBoards((prevBoards) => {
            const newBoards = [...prevBoards];
            const fromList = newBoards[activeBoardIndex].lists[fromListIdx];
            const toList = newBoards[activeBoardIndex].lists[toListIdx];
            fromList.tasks.splice(fromTaskIdx, 1);
            toList.tasks.push(taskToMove);
            return newBoards;
        });
    };

    return (
        <Stack direction={"row"} spacing={2} >
            <TaskDialog
                values={{ listIndex, taskIndex }}
                open={open}
                onClose={handleClose}
            />
            {boards[activeBoardIndex].lists.map((list, listIdx) => (
                <Box>
                    <Typography sx={{ mb: 2 }}>{list.title}</Typography>
                    <Box>
                        {list.tasks.map((task, taskIdx) => (
                            <Box
                                className={"list"}
                                onClick={() => handleClickOpen(listIdx, taskIdx)}
                            >
                                <Typography>{task.title}</Typography>
                            </Box>
                        ))}
                    </Box>
                    {listIdx !== listIndex && (
                        <Box
                            className={"list"}
                            onClick={() => handleMoveTask(listIndex, taskIndex, listIdx)}
                        >
                            <Typography>Taskni yuborish</Typography>
                        </Box>
                    )}
                </Box>
            ))}
        </Stack>
    );
};
