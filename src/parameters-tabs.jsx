import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default class ParameterTabs extends React.Component {
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
    const parameters = this.props.parameters || [];

    return (
      <Grid
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', mt: -3 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={this.state.value}
          onChange={this.handleChange}
          aria-label="Vertical tabs"
          sx={{ borderRight: 1, borderColor: 'divider', minWidth: 300 }}
        >
          {
            parameters.map((parameter, index) => (
              <Tab
                key={index}
                label={parameter.name}
                {...a11yProps(index)}
                wrapped
                sx={{ fontSize: 16, textTransform: 'none', fontWeight: "bold"}}>
              </Tab>
            ))
          }
        </Tabs>
        {
          parameters.map((parameter, index) => (
            <TabPanel value={this.state.value} index={index} key={index}>
              <b>Описание:</b> {parameter.description}<br/>
              <b>Тип вывода:</b> {parameter.type}<br/>
              <b>Значение по умолчанию:</b> {parameter.defaultValue}<br/>
            </TabPanel>
          ))
        }
      </Grid>
    );
  }
}