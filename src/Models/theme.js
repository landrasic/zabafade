import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors/index";

const theme = createTheme({
  components: {
    MuiToolbar: {
      defaultProps: {
        style: {
          backgroundColor: "#205c3e",
        },
      },
    },
    MuiGrid: {
      variants: [
        {
          props: { className: "background" },
          style: {
            backgroundColor: "#262626",
          },
        },
        {
          props: { className: "card" },
          style: {
            backgroundColor: "#205C3E",
          },
        },
      ],
    },
    MuiPaper: {
      defaultProps: {
        sx: {
          backgroundColor: "#205C3E",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          backgroundColor: "#3DAF81",
          color: "#3D423D",
          ":hover": {
            backgroundColor: "#237D59",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          color: "white",
        },
      },
    },
  },
  status: {
    danger: orange[500],
  },
  palette: {
    primary: {
      main: "#237D59",
    },
    secondary: {
      main: "#237D59",
    },
  },
});

export default theme;
