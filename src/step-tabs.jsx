import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ParameterTabs from './parameters-tabs';
import styled from '@emotion/styled';
import AddParameterDialog from './add-parameter-dialog';
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

const DialogContainer = styled.div`
    margin-top: 30px;
    margin-left: 35px;
`;

export default class StepTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStepIndex: 0
    };
  }

  handleChange = (event, newValue) => {
    this.setState({activeStepIndex: newValue});
  };

  onAddParameter = (name, description, fieldType, defaultValue) => {
    this.props.onAddParameter(this.state.activeStepIndex, name, description, fieldType, defaultValue)
  };

  render() {
    const steps = this.props.steps || [];

    return (
      <Grid
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', mt: -3 }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={this.state.activeStepIndex}
          onChange={this.handleChange}
          aria-label="Vertical tabs"
          sx={{ borderRight: 1, borderColor: 'divider', minWidth: 250 }}
        >
          {
            steps.map((step, index) => (
              <Tab
                key={index}
                label={step.name}
                {...a11yProps(index)}
                wrapped
                sx={{ fontSize: 16, textTransform: 'none', fontWeight: "bold"}}>
              </Tab>
            ))
          }
        </Tabs>
        {
          steps.map((step, index) => (
            <TabPanel value={this.state.activeStepIndex} index={index} key={index}>
              <ParameterTabs parameters={step.parameters}></ParameterTabs>
              <DialogContainer>
                <AddParameterDialog onAddParameter={this.onAddParameter} />
              </DialogContainer>
            </TabPanel>
          ))
        }
      </Grid>
    );
  }
}