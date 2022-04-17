import * as React from 'react';
import ReactDOM from 'react-dom';
import AddPropertyDialog from './add-property-dialog';
import StageTabs from "./stage-tabs";
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import initialData from './initial-data';

const DialogContainer = styled.div`
    margin-top: 30px;
    margin-left: 30px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(initialData);
  }

  onAddStage = (value) => {
    const newStages = (this.state.stages || []).slice();
    newStages.push({name: value});
    this.setState({stages: newStages});
  }

  onAddStep = (stageIndex, newStepName) => {
    const stage = this.state.stages[stageIndex];
    stage.steps = stage.steps || [];
    stage.steps.push({name: newStepName});

    this.updateStageState();
  }

  onAddParameter = (stageIndex, stepIndex, name, description, fieldType, defaultValue) => {
    const step = this.state.stages[stageIndex].steps[stepIndex];
    step.parameters = step.parameters || [];
    step.parameters.push({
      name: name,
      description: description,
      type: fieldType,
      defaultValue: defaultValue
    });

    this.updateStageState();
  }

  updateStageState = () => this.setState({stages: this.state.stages});

  render() {
    return (
      <Grid>
        <StageTabs stages={this.state.stages} onAddStep={this.onAddStep} onAddParameter={this.onAddParameter} />
        <DialogContainer>
          <AddPropertyDialog
            onAddProperty={this.onAddStage}
            buttonText={'Добавить стадию'}
            dialogTitle={'Новая стадия'}
          />
        </DialogContainer>
      </Grid>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));