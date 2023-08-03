import {
    Stack,
    Box,
    Typography,
    Button,
    Modal,
    TextField,
} from "@mui/material";
import * as React from "react";
import { useContext, useState } from "react";
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
    const [newListTitle, setNewListTitle] = useState("");
    const [openTaskModal, setOpenTaskModal] = React.useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [editListTitle, setEditListTitle] = useState("");
    const [openTaskEditModal, setOpenTaskEditModal] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        setListIndex(null);
        setTaskIndex(null);
        setNewListTitle("");
    };

    const handleAddTaskModal = (listIndex) => {
        setOpenTaskModal(true);
        setListIndex(listIndex);
    };

    const handleAddTask = (listIndex) => {
        if (newTaskTitle.trim() === "") {
            return;
        }

        const updatedBoards = [...boards];
        const newTask = { title: newTaskTitle, description: "" };
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
        const newList = { title: newListTitle, tasks: [] };
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


    return (
        <Stack direction="row" spacing={2}>
            <TaskDialog
                values={{ listIndex, taskIndex }}
                open={open}
                onClose={handleClose}
            />
            {boards[activeBoardIndex].lists.map((list, listIdx) => (
                <StyledList>
                    <Typography onClick={() => handleEditListModal(listIdx)} sx={{ mb: 2 ,cursor:"pointer"}}>{list.title}</Typography>
                    <Box>
                        {list.tasks.map((task, taskIdx) => (
                            <Box className="list" key={taskIdx}>
                                <Typography>{task.title}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Button
                        sx={styles.buttonTask}
                        onClick={() => handleAddTaskModal(listIdx)}
                    >
                        + Yangi Task
                    </Button>
                    <Button
                        sx={styles.buttonTask}
                        onClick={() => handleDeleteList(listIdx)}>
                        - List
                    </Button>
                </StyledList>
            ))}
            <Button sx={styles.button} onClick={() => setOpen(true)}>
                + Yangi List
            </Button>

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
                    <Button onClick={handleAddList} variant="contained" sx={{ p: 1, ml: 1 }}>
                        Save
                    </Button>
                </Box>
            </Modal>

            {/* Task qo'shish uchun modal */}
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
                    <Button
                        onClick={() => handleAddTask(listIndex)}
                        variant="contained"
                        sx={{ p: 1, ml: 1 }}
                    >
                        Save Task
                    </Button>
                </Box>
            </Modal>
            <Modal  open={openTaskEditModal} onClose={() => setOpenTaskEditModal(false)}>
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
                    <Button onClick={handleEditList} variant="contained" sx={{ p: 1, ml: 1 }}>
                        Save List Title
                    </Button>
                </Box>
            </Modal>
        </Stack>
    );
};
