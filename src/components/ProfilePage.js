import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  //making ui for profile page
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  toggleDrawer(true)
  const accordianUi = () => {
    return (
      <Box
        sx={{ width: "100vw" }}
        role="presentation"
        //closing drawer
        // onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<EditSharpIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ color: "text.secondary" }}>
              {/* {name here} */}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <TextField
                id="input-with-icon-textfield"
                // label="TextField"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  };
  //

  return (
    <div>
      <React.Fragment key={1}>
        {/* <Button onClick={toggleDrawer(true)}>Profile</Button> */}
        <Drawer open={state} onClose={toggleDrawer(false)}>
          {accordianUi()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
