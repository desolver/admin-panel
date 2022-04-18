import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { Edit } from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Grid>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const DialogContainer = styled.div`
  margin-top: 30px;
`;

export default class CustomTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ activeTabIndex: newValue });
    this.props.onChangeTab(newValue);
  };

  render() {
    const items = this.props.tabItems || [];

    return (
      <Grid sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", mt: (this.props.mt) }}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography variant="h5" component="div" gutterBottom>
            {this.props.tabsTitle}
          </Typography>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={this.state.activeTabIndex}
            aria-label="Vertical tabs"
            sx={{ borderRight: 1, borderColor: "divider", minWidth: 250 }}
          >
            {items.map((item, index) => (
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mr: 4,
                }}
              >
                <Tab
                  key={index}
                  label={this.props.getTabLabel(item)}
                  wrapped
                  sx={{
                    fontSize: 16,
                    textTransform: "none",
                    fontWeight: "bold",
                    width: '100%'
                  }}
                  onClick={() => this.handleChange(null, index)}
                ></Tab>
                <Edit sx={{ fontSize: 16 }} onClick={() => console.log("H:AJFSJ")}/>
              </Grid>
            ))}
          </Tabs>
          <DialogContainer>
            {
              this.props.dialog
            }
          </DialogContainer>
        </Grid>
        {
          items.map((item, index) => (
            <TabPanel
              value={this.state.activeTabIndex}
              index={index}
              key={index}
            >
            {
              this.props.innerTabs(item)
            }
            </TabPanel>
          ))}
      </Grid>
    );
  }
}
