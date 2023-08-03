import {
    Stack,
    List,
    ListItem,
    ListItemText,
    Box,
    Typography,
} from "@mui/material";
import * as React from "react";
import { useContext } from "react";
import { BoardsContext } from "../../context";
import { StyledList, styles } from "./styles";
import { TaskDialog } from "../TaskDialog";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const Board = (props) => {
    const { boards, setBoards, activeBoardIndex, setActiveBoardIndex } =
        useContext(BoardsContext);

    const [open, setOpen] = React.useState(false);
    const [listIndex, setListIndex] = React.useState(null);
    const [taskIndex, setTaskIndex] = React.useState(null);



    const handleClose = (value) => {
        setOpen(false);
        setListIndex(null);
        setTaskIndex(null);
    };
    const handleAddTask = (listIndex) => {
        const updatedBoards = [...boards];
        const newTask = { title: `New Task ${Date.now()}`, description: "" };
        updatedBoards[activeBoardIndex].lists[listIndex].tasks.push(newTask);
        setBoards(updatedBoards);
    };


    return (
        <Stack direction={"row"} spacing={2}>
            <TaskDialog
                values={{ listIndex, taskIndex }}
                open={open}
                onClose={handleClose}
            />
            {boards[activeBoardIndex].lists.map((list, listIdx) => (
                <StyledList>
                    <Typography sx={{ mb: 2 }}>{list.title}</Typography>
                    <Box>
                        {list.tasks.map((task, taskIdx) => (
                            <Box
                                className={"list"}>
                                    <Typography>{task.title}</Typography>
                            </Box>
                        ))}
                    </Box>
                </StyledList>
            ))}
        </Stack>
    );
};
