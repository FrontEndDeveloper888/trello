import {Modal, Box, Button, TextField, Dialog} from "@mui/material";
import React, {useContext, useState} from "react";
import {BoardsContext} from "../../context";

export const TaskDialog = (props) => {
    const {onClose, values: {listIndex, taskIndex}, open} = props;

    const {boards, setBoards, activeBoardIndex} = useContext(BoardsContext);

    const handleClose = () => {
        onClose();
    };

    const activeBoard = activeBoardIndex !== null ? boards[activeBoardIndex] : null;

    const activeList = listIndex !== null ? boards[activeBoardIndex].lists[listIndex] : null;

    const activeTask = taskIndex !== null ? boards[activeBoardIndex].lists[listIndex].tasks[taskIndex] : null;

    const onChangeTask = (props) => {
        setBoards((prevBoards) => prevBoards.map((board, boardIdx) => boardIdx === activeBoardIndex ? {
            ...board, lists: board.lists.map((list, listIdx) => listIdx === listIndex ? {
                ...list, tasks: list.tasks.map((task, taskIdx) => taskIdx === taskIndex ? {...task, ...props} : task),
            } : list),
        } : board));
    };

    return (
        <Dialog open={open} onClose={handleClose}>
        <Box
            sx={{

            }}
        >
            vhjvvjhvh
            <Button>bhvhvhhhjvvh</Button>
            {listIndex !== null && taskIndex !== null && activeBoardIndex !== null ? (<>
                <TextField
                    id="standard-basic"
                    label="Standard"
                    variant="standard"
                    value={activeTask.title}
                    onChange={(e) => onChangeTask({title: e.target.value})}
                    sx={{mb: 2}}
                />

                <TextField
                    id="outlined-textarea"
                    label="Description"
                    placeholder="Description"
                    multiline
                    value={activeTask.description}
                    onChange={(e) => onChangeTask({description: e.target.value})}
                />
            </>) : null}
        </Box>
    </Dialog>);
};
