import React, { useContext, useState } from "react";
import { Stack, Box, Typography, Button, Modal, TextField } from "@mui/material";
import { BoardsContext } from "../../context";
import { StyledList, styles } from "./styles";
import { TaskDialog } from "../TaskDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const Board = () => {
    const { boards, setBoards, activeBoardIndex } = useContext(BoardsContext);

    const [open, setOpen] = useState(false);
    const [listIndex, setListIndex] = useState(null);
    const [taskIndex, setTaskIndex] = useState(null);
    const [newListTitle, setNewListTitle] = useState("");
    const [openTaskModal, setOpenTaskModal] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [editListTitle, setEditListTitle] = useState("");
    const [openTaskEditModal, setOpenTaskEditModal] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setListIndex(null);
        setTaskIndex(null);
        setNewListTitle("");
    };

    const handleAddTaskModal = (listIndex) => {
        if (!isDragging) {
            setOpenTaskModal(true);
            setListIndex(listIndex);
            setTaskIndex(null);
        }
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

    const handleDeleteTask = (listIndex, taskIndex) => {
        const updatedBoards = [...boards];
        updatedBoards[activeBoardIndex].lists[listIndex].tasks.splice(
            taskIndex,
            1
        );
        setBoards(updatedBoards);
    };

    const onDragStart = () => {
        setIsDragging(true);
    };

    const onDragEnd = (result) => {
        setIsDragging(false);

        if (!result.destination) return;

        const { source, destination } = result;
        const startListIndex = +source.droppableId;
        const endListIndex = +destination.droppableId;
        const startTaskIndex = +source.index;
        const endTaskIndex = +destination.index;

        if (startListIndex === endListIndex) {
            // If the task is moved within the same list
            const boardsClone = JSON.parse(JSON.stringify(boards));
            const [task] = boardsClone[activeBoardIndex].lists[startListIndex].tasks.splice(startTaskIndex, 1);
            boardsClone[activeBoardIndex].lists[startListIndex].tasks.splice(endTaskIndex, 0, task);
            setBoards(boardsClone);
        } else {
            // If the task is moved to a different list
            const boardsClone = JSON.parse(JSON.stringify(boards));
            const [task] = boardsClone[activeBoardIndex].lists[startListIndex].tasks.splice(startTaskIndex, 1);
            boardsClone[activeBoardIndex].lists[endListIndex].tasks.splice(endTaskIndex, 0, task);
            setBoards(boardsClone);
        }
    };


    return (
        <Stack direction="row" spacing={2}>
            <TaskDialog values={{ listIndex, taskIndex }} open={open} onClose={handleClose} />
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                {boards[activeBoardIndex].lists.map((list, listIdx) => (
                    <Droppable key={listIdx} droppableId={listIdx.toString()}>
                        {(provided) => (
                            <StyledList ref={provided.innerRef} {...provided.droppableProps}>
                                <Typography onClick={() => handleEditListModal(listIdx)} sx={{ mb: 2, cursor: "pointer" }}>
                                    {list.title}
                                </Typography>
                                <Box>
                                    {list.tasks.map((task, taskIdx) => (
                                        <Draggable key={taskIdx} draggableId={taskIdx.toString()} index={taskIdx}>
                                            {(provided) => (
                                                <Box
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="list"
                                                >
                                                    <Typography>{task.title}</Typography>
                                                    <DeleteIcon sx={{ color: "red" }} onClick={() => handleDeleteTask(listIdx, taskIdx)} />
                                                </Box>
                                            )}
                                        </Draggable>
                                    ))}
                                </Box>
                                <Button sx={styles.buttonTask} onClick={() => handleAddTaskModal(listIdx)}>
                                    + Add Task
                                </Button>
                                <Button sx={styles.buttonTask} onClick={() => handleDeleteList(listIdx)}>
                                    - Delete List
                                </Button>
                            </StyledList>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
            <Button sx={styles.button} onClick={() => setOpen(true)}>
                + Add New List
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

            {/* Modal for adding a new task */}
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
                    <Button onClick={() => handleAddTask(listIndex)} variant="contained" sx={{ p: 1, ml: 1 }}>
                        Save Task
                    </Button>
                </Box>
            </Modal>

            {/* Modal for editing list title */}
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
                    <Button onClick={handleEditList} variant="contained" sx={{ p: 1, ml: 1 }}>
                        Save List Title
                    </Button>
                </Box>
            </Modal>
        </Stack>
    );
};

export default Board;
