import {styled, Box} from "@mui/material";

export const styles = {
    board: {
        p: 2,
        width: 240,
        borderRadius: 3,
        color: "#a2acb6",
        background: "#101204",
    },
    button: {
        p: 1,
        mb: 1,
        width: 240,
        height: 50,
        color: "white",
        borderRadius: 3,
        textTransform: "none",
        backdropFilter: "blur(1px)",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    buttonTask: {
        padding: 1,
        width: "100%",
        color: "white",
        marginBottom: 1,
        borderRadius: 2,
        textTransform: "none",
        backdropFilter: "blur(1px)",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    color: {
        background: "#2c3033"
    },
    main: {
        p: 3,
        flexGrow: 1,
        minHeight: 100
    },
    task: {
        p: 1,
        mb: 1,
        width: "100%",
        color: "white",
        borderRadius: 3,
        textTransform: "none",
        backdropFilter: "blur(1px)",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
};

export const StyledList = styled(Box)`
  width: 240px;
  padding: 20px;
  color: #a2acb6;
  background: #101204;
  border-radius: 10px;

  .list {
    width: 100%;
    color: white;
    padding: 10px;
    display: flex;
    border-radius: 8px;
    margin-bottom: 10px;
    text-transform: none;
    background-color: #22272b;
    backdrop-filter: blur(1px);
    justify-content: space-between;
  }
`;
