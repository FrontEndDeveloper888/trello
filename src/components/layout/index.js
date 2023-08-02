import * as React from "react";
import {styled, useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {useContext} from "react";
import {BoardsContext} from "../../context";
import {styles} from "../Board/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Modal} from "@mui/material";

const drawerWidth = 200;

const openedMixin = (theme) => ({
    width: drawerWidth, transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
    }), background: "rgba(255,255,255,0.1)", backdropFilter: "blur(5px)", overflowX: "hidden", color: "white",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }),
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(5px)",
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    color: "white",
});

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1), ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
        }),
    }), backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(5px)",
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    width: drawerWidth, flexShrink: 0, whiteSpace: "nowrap", boxSizing: "border-box", ...(open && {
        ...openedMixin(theme), "& .MuiDrawer-paper": openedMixin(theme),
    }), ...(!open && {
        ...closedMixin(theme), "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function MiniDrawer(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [isBoardModalOpen, setIsBoardModalOpen] = React.useState(false);
    const [newBoardTitle, setNewBoardTitle] = React.useState("");
    const {boards, setBoards, activeBoardIndex, setActiveBoardIndex} = useContext(BoardsContext);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleAddBoardModalOpen = () => {
        setIsBoardModalOpen(true);
    };

    const handleAddBoardModalClose = () => {
        setIsBoardModalOpen(false);
        setNewBoardTitle("");
    };

    const handleAddBoard = () => {
        handleAddBoardModalOpen();
    };

    const handleAddBoardConfirm = () => {
        if (newBoardTitle.trim()) {
            const updatedBoards = [...boards];
            updatedBoards.push({title: newBoardTitle, lists: []});
            setBoards(updatedBoards);
            handleAddBoardModalClose();
        }
    };


    return (<Box sx={{
        display: "flex",
        minHeight: 1001,
        background: "rgba(0, 0, 0, 0.7)",
        backgroundImage: "url(https://i.pinimg.com/originals/47/0a/19/470a19a36904fe200610cc1f41eb00d9.jpg)",
        backgroundSize: "cover"
    }}>
        <CssBaseline/>
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5, ...(open && {display: "none"}),
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Trello
                </Typography>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (<ChevronRightIcon/>) : (<ChevronLeftIcon/>)}
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>
                {boards.map((board, index) => (<ListItem key={index} disablePadding sx={{display: "block"}}>
                    <ListItemButton
                        sx={{
                            minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5,
                        }}
                        onClick={() => setActiveBoardIndex(index)}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center",
                            }}
                        >
                            {index % 2 === 0 ? <InboxIcon/> : <InboxIcon/>}
                        </ListItemIcon>
                        <ListItemText
                            primary={board.title}
                            sx={{opacity: open ? 1 : 0, color: "inherit"}}
                        />
                    </ListItemButton>
                </ListItem>))}
                <ListItem disablePadding sx={{display: "block"}}>
                    <ListItemButton
                        sx={{
                            minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5,
                        }}
                        onClick={handleAddBoard}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center",
                            }}
                        >
                            <AddCircleOutlineIcon/>
                        </ListItemIcon>
                        <ListItemText primary="+ Add board" sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{display: "block"}}>
                        <ListItemButton
                            sx={{
                                minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center",
                                }}
                            >
                                {index === 0 ? <MailIcon/> : index === 1 ? <DeleteIcon/> : <ErrorIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    </ListItem>))}
            </List>
            <Divider/>
        </Drawer>

        <Box component="main" sx={styles.main}>
            <DrawerHeader/>
            {props.children}
        </Box>

        <Modal open={isBoardModalOpen} onClose={handleAddBoardModalClose}>
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
                    backgroundColor: "rgba(255,255,255,0.7)",
                }}
            >
                <TextField
                    value={newBoardTitle}
                    color="primary"
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                    placeholder="Board title..."
                    size="small"
                />

                <Button onClick={handleAddBoardConfirm} variant="contained" sx={{p: 1, ml: 1}}>
                    + Add
                </Button>
            </Box>
        </Modal>
    </Box>);
}