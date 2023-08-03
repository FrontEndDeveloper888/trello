import { styled, Box } from "@mui/material";
export const styles = {
  board: { background: "#101204", p: 2, width: 240, borderRadius: 3, color: "#a2acb6" },
  button: { width: 240, height: 50, textTransform: "none", color: "white", borderRadius: 3, p: 1, mb: 1, backgroundColor: "rgba(0, 0, 0, 0.3)", backdropFilter: "blur(1px)" },
  buttonTask: {
    textTransform: "none",
    color: "white",
    borderRadius: 2,
    padding:1,
    marginBottom: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    backdropFilter: "blur(1px)",
    width: "100%",
  },
  color: { background: "#2c3033" },
  main: { minHeight: 100, flexGrow: 1, p: 3 },
  task: { width: '100%', textTransform: "none", color: "white", borderRadius: 3, p: 1, mb: 1, backgroundColor: "rgba(0, 0, 0, 0.3)", backdropFilter: "blur(1px)" }
};

export const StyledList = styled(Box)`
  background: #101204;
  padding: 20px;
  width: 240px;
  border-radius: 10px;
  color: #a2acb6;

  .list {
      width: 100%;
      text-transform: none;
      color: white;
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 10px;
      background-color: #22272b;
      backdrop-filter: blur(1px);
    }
`;
