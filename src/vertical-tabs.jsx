import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { Add, Edit } from '@mui/icons-material';

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default class VerticalTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  render() {
    return (
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={this.state.value}
          onChange={this.handleChange}
          aria-label="Vertical tabs"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {
            this.props.stages.map((stage, index) => (
              <Tab
                key={index}
                label={stage.name}
                {...a11yProps(index)}
                wrapped
                sx={{ fontSize: 16 }}>
              </Tab>
            ))
          }
        </Tabs>
        {
          this.props.stages.map((stage, index) => (
            <TabPanel value={this.state.value} index={index} key={index}>
              Контеееент  + {index}
            </TabPanel>
          ))
        }
      </Box>
    );
  }
}