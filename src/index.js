import * as React from 'react';
import ReactDOM from 'react-dom';
import FormDialog from './form-dialog';
import StageTabs from "./stage-tabs";
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import initialData from './initial-data';

const DialogContainer = styled.div`
    margin-top: 30px;
    margin-left: 35px;
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

    this.setState({stages: this.state.stages});
  }

  render() {
    return (
      <Grid>
        <StageTabs stages={this.state.stages} onAddStep={this.onAddStep} />
        <DialogContainer>
          <FormDialog
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