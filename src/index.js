import * as React from "react";
import ReactDOM from "react-dom";
import StageTabs from "./stage-tabs";
import { Grid } from "@mui/material";
import initialData from "./initial-data";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(initialData);
  }

  onAddStage = (value) => {
    const newStages = (this.state.stages || []).slice();
    newStages.push({ name: value });
    this.setState({ stages: newStages });
  };

  onAddStep = (stageIndex, newStepName) => {
    const stage = this.state.stages[stageIndex];
    stage.steps = stage.steps || [];
    stage.steps.push({ name: newStepName });

    this.updateStageState();
  };

  onAddParameter = (
    stageIndex,
    stepIndex,
    name,
    description,
    fieldType,
    defaultValue
  ) => {
    const step = this.state.stages[stageIndex].steps[stepIndex];
    step.parameters = step.parameters || [];
    step.parameters.push({
      name: name,
      description: description,
      type: fieldType,
      defaultValue: defaultValue,
    });

    this.updateStageState();
  };

  updateStageState = () => this.setState({ stages: this.state.stages });

  onSaveVisualization = (stageIndex, stepIndex, cameraPositionId) => {
    const step = this.state.stages[stageIndex].steps[stepIndex];
    step.visualizationSetup = step.visualizationSetup || {};
    step.visualizationSetup.cameraPositionId = cameraPositionId;

    this.updateStageState();
  }

  render() {
    return (
      <Grid>
        <StageTabs
          stages={this.state.stages}
          onAddStage={this.onAddStage}
          onAddStep={this.onAddStep}
          onAddParameter={this.onAddParameter}
          onSaveVisualization={this.onSaveVisualization}
        />
      </Grid>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
