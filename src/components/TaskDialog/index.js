import * as React from "react";
import { Dialog, TextField, DialogTitle } from "@mui/material";
import { useContext } from "react";
import { BoardsContext } from "../../context";
import { Board } from "../Board/index";
import styled from "styled-components";

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    padding: 16px;
    border-radius: 16px;
    min-width: 360px;
  }
`;

export function TaskDialog(props) {
    const {
        onClose,
        values: { listIndex, taskIndex },
        open,
    } = props;

    const { boards, setBoards, activeBoardIndex, setActiveBoardIndex } =
        useContext(BoardsContext);

    console.log({ listIndex, taskIndex });

    const handleClose = () => {
        onClose();
    };

    const activeBoard =
        activeBoardIndex !== null ? boards[activeBoardIndex] : null;

    const activeList =
        listIndex !== null ? boards[activeBoardIndex].lists[listIndex] : null;

    const activeTask =
        taskIndex !== null
            ? boards[activeBoardIndex].lists[listIndex].tasks[taskIndex]
            : null;

    const onChangeTask = (props) => {
        setBoards([
            ...boards.slice(0, activeBoardIndex),
            {
                ...activeBoard,
                lists: [
                    ...activeBoard.lists.slice(0, listIndex),
                    {
                        ...activeList,
                        tasks: [
                            ...activeList.tasks.slice(0, taskIndex),
                            {
                                ...activeTask,
                                ...props,
                            },
                            ...activeList.tasks.slice(taskIndex + 1),
                        ],
                    },
                    ...activeBoard.lists.slice(listIndex + 1),
                ],
            },
            ...boards.slice(activeBoardIndex + 1),
        ]);
    };

    return (
        <StyledDialog onClose={handleClose} open={open}>
            {listIndex !== null && taskIndex !== null && activeBoardIndex !== null ? (
                <>
                    <TextField
                        id="standard-basic"
                        label="Standard"
                        variant="standard"
                        value={activeTask.title}
                        onChange={(e) => onChangeTask({ title: e.target.value })}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        id="outlined-textarea"
                        label="Description"
                        placeholder="Description"
                        multiline
                        value={activeTask.description}
                        onChange={(e) => onChangeTask({ description: e.target.value })}
                    />
                </>
            ) : null}
        </StyledDialog>
    );
}
