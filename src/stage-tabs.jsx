import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import StepTabs from './step-tabs';
import FormDialog from './form-dialog';

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

const DialogContainer = styled.div`
    margin-top: 30px;
    margin-left: 35px;
`;

export default class StageTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStageIndex: 0
    };
  }

  handleChange = (event, newValue) => {
    this.setState({activeStageIndex: newValue});
  };

  onAddStep = (newStepName) => {
    this.props.onAddStep(this.state.activeStageIndex, newStepName);
  };

  render() {
    const stages = this.props.stages || [];

    return (
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={this.state.activeStageIndex}
          onChange={this.handleChange}
          aria-label="Vertical tabs"
          sx={{ borderRight: 1, borderColor: 'divider', minWidth: 250 }}
        >
          {
            stages.map((stage, index) => (
              <Tab
                key={index}
                label={stage.name}
                {...a11yProps(index)}
                wrapped
                sx={{ fontSize: 16, textTransform: 'none', fontWeight: "bold"}}>
              </Tab>
            ))
          }
        </Tabs>
        {
          stages.map((stage, index) => (
            <TabPanel value={this.state.activeStageIndex} index={index} key={index}>
              <StepTabs steps={stage.steps}></StepTabs>
              <DialogContainer>
                <FormDialog
                  onAddProperty={this.onAddStep}
                  buttonText={'Добавить шаг'}
                  dialogTitle={'Новый шаг'}
                />
              </DialogContainer>
            </TabPanel>
          ))
        }
      </Box>
    );
  }
}