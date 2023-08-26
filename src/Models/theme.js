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
      defaultProps: {
        style: {
          backgroundColor: "#262626",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        sx: {
          backgroundColor: "#205C3E",
        },
      },
    },
  },
  status: {
    danger: orange[500],
  },
});

export default theme;
