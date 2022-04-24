import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Grid, IconButton } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  textAlign: "center"
}));

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
    const tabs = items.length > 0
      ? (
        this.props.tabItems.map((item, index) => (
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
                opacity: 0.9,
                width: '100%'
              }}
              onClick={() => this.handleChange(null, index)}
            ></Tab>
            <IconButton aria-label="add" size="small" sx={{ ml: -1, mt: -1 }}>
              <Edit sx={{ fontSize: 16 }} />
            </IconButton>
          </Grid>
        )))
      : <Div>Добавьте элемент,<br /> нажав на +</Div>;

    return (
      <Grid sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", mt: (this.props.mt) }}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Typography variant="h5" component="div" gutterBottom maxWidth={200} align={'center'} sx={{color: "GrayText"}}>
              {this.props.tabsTitle}
            </Typography>
            <IconButton
              aria-label="add"
              size="small"
              sx={{ ml: 2, mt: -1, border: 1, p: 0.1 }}
              color="primary"
              onClick={this.props.onTabsIconClick}
            >
              <Add />
            </IconButton>
          </Grid>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={this.state.activeTabIndex}
            aria-label="Vertical tabs"
            sx={{ borderRight: 1, borderColor: "divider", minWidth: 250 }}
            scrollButtons={false}
          >
          {
            tabs
          }
          </Tabs>
          {
            this.props.dialog
          }
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
