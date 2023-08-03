import React, {useContext, useState} from "react";
import {Stack, Box, Typography, Button, Modal, TextField} from "@mui/material";
import {BoardsContext} from "../../context";
import {StyledList, styles} from "./styles";
import {TaskDialog} from "../TaskDialog";
import DeleteIcon from "@mui/icons-material/Delete";

export const Board = () => {

    const {boards, setBoards, activeBoardIndex} = useContext(BoardsContext);

    const [open, setOpen] = useState(false);
    const [listIndex, setListIndex] = useState(null);
    const [taskIndex, setTaskIndex] = useState(null);
    const [newListTitle, setNewListTitle] = useState("");
    const [openTaskModal, setOpenTaskModal] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [editListTitle, setEditListTitle] = useState("");
    const [openTaskEditModal, setOpenTaskEditModal] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setListIndex(null);
        setTaskIndex(null);
        setNewListTitle("");
    };

    const handleAddTaskModal = (listIndex) => {
        setOpenTaskModal(true);
        setListIndex(listIndex);
        setTaskIndex(null);
    };

    const handleAddTask = (listIndex) => {
        if (newTaskTitle.trim() === "") {
            return;
        }

        const updatedBoards = [...boards];
        const newTask = {title: newTaskTitle, description: ""};
        updatedBoards[activeBoardIndex].lists[listIndex].tasks.push(newTask);
        setBoards(updatedBoards);
        setOpenTaskModal(false);
        setNewTaskTitle("");
    };

    const handleAddList = () => {
        if (newListTitle.trim() === "") {
            return;
        }

        const updatedBoards = [...boards];
        const newList = {title: newListTitle, tasks: []};
        updatedBoards[activeBoardIndex].lists.push(newList);
        setBoards(updatedBoards);
        handleClose();
    };

    const handleDeleteList = (listIndex) => {
        const updatedBoards = [...boards];
        updatedBoards[activeBoardIndex].lists.splice(listIndex, 1);
        setBoards(updatedBoards);
    };

    const handleEditListModal = (listIndex) => {
        setOpenTaskEditModal(true);
        setListIndex(listIndex);
        setEditListTitle(boards[activeBoardIndex].lists[listIndex].title);
    };
    const handleEditList = () => {
        if (editListTitle.trim() === "") {
            return;
        }
        const updatedBoards = [...boards];
        updatedBoards[activeBoardIndex].lists[listIndex].title = editListTitle;
        setBoards(updatedBoards);
        setOpenTaskEditModal(false);
    };

    const handleDeleteTask = (listIndex, taskIndex) => {
        const updatedBoards = [...boards];
        updatedBoards[activeBoardIndex].lists[listIndex].tasks.splice(taskIndex, 1);
        setBoards(updatedBoards);
    };

    return (<Stack direction="row" spacing={2}>
        <TaskDialog values={{listIndex, taskIndex}} open={open} onClose={handleClose}/>
        {boards[activeBoardIndex].lists.map((list, listIdx) => (<StyledList key={listIdx}>
            <Typography onClick={() => handleEditListModal(listIdx)} sx={{mb: 2, cursor: "pointer"}}>
                {list.title}
            </Typography>
            <Box>
                {list.tasks.map((task, taskIdx) => (<Box className="list" key={taskIdx}>
                    <Typography>{task.title}</Typography>
                    <DeleteIcon sx={{color: "red"}} onClick={() => handleDeleteTask(listIdx, taskIdx)}/>
                </Box>))}
            </Box>
            <Button sx={styles.buttonTask} onClick={() => handleAddTaskModal(listIdx)}>
                + Add Task
            </Button>
            <Button sx={styles.buttonTask} onClick={() => handleDeleteList(listIdx)}>
                - Delete List
            </Button>
        </StyledList>))}
        <Button sx={styles.button} onClick={() => setOpen(true)}>
            + Add New List
        </Button>

        {/* Modal for adding a new list */}
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bg: "white",
                    p: 2,
                    m: 1,
                    outline: "none",
                    borderRadius: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
            >
                <TextField
                    color="primary"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    placeholder="List title..."
                    size="small"
                />
                <Button onClick={handleAddList} variant="contained" sx={{p: 1, ml: 1}}>
                    Save
                </Button>
            </Box>
        </Modal>

        <Modal open={openTaskModal} onClose={() => setOpenTaskModal(false)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bg: "white",
                    p: 2,
                    m: 1,
                    outline: "none",
                    borderRadius: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
            >
                <TextField
                    color="primary"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Task title..."
                    size="small"
                />
                <Button onClick={() => handleAddTask(listIndex)} variant="contained" sx={{p: 1, ml: 1}}>
                    Save Task
                </Button>
            </Box>
        </Modal>

        <Modal open={openTaskEditModal} onClose={() => setOpenTaskEditModal(false)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bg: "white",
                    p: 2,
                    m: 1,
                    outline: "none",
                    borderRadius: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
            >
                <TextField
                    color="primary"
                    value={editListTitle}
                    onChange={(e) => setEditListTitle(e.target.value)}
                    placeholder="List title..."
                    size="small"
                />
                <Button onClick={handleEditList} variant="contained" sx={{p: 1, ml: 1}}>
                    Save List Title
                </Button>
            </Box>
        </Modal>
    </Stack>);
};
