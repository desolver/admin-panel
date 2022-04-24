import * as React from "react";
import ReactDOM from "react-dom";
import StageTabs from "./stages/stage-tabs";
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

  onAddParameter = (stageIndex, stepIndex, parameter) => {
    const step = this.state.stages[stageIndex].steps[stepIndex];
    step.parameters = step.parameters || [];
    step.parameters.push({
      id: parameter.id,
      name: parameter.name,
      description: parameter.description,
      type: parameter.fieldType,
      defaultValue: parameter.defaultValue,
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

  onSaveValidator = (stageIndex, stepIndex, parameterIndex, validator) => {
    const parameter = this.state.stages[stageIndex].steps[stepIndex].parameters[parameterIndex];
    parameter.validators = parameter.validators || [];

    parameter.validators.push({
      id: validator.id,
      validationType: validator.validationType,
      primaryValue: validator.primaryValue,
      additionalValue: validator.additionalValue,
      onErrorMessage: validator.onErrorMessage
    });

    this.updateStageState();
  }

  onSaveFilter = (stageIndex, stepIndex, filter) => {
    const step = this.state.stages[stageIndex].steps[stepIndex];
    step.filters = step.filters || [];
    step.filters.push({
      id: filter.id,
      mode: filter.mode,
      propertyName: filter.propertyName,
      valueType: filter.valueType,
      primaryValue: filter.primaryValue,
      additionalValue: filter.additionalValue
    });

    this.updateStageState();
  };

  render() {
    return (
      <Grid>
        <StageTabs
          stages={this.state.stages}
          onAddStage={this.onAddStage}
          onAddStep={this.onAddStep}
          onAddParameter={this.onAddParameter}
          onSaveVisualization={this.onSaveVisualization}
          onSaveValidator={this.onSaveValidator}
          onSaveFilter={this.onSaveFilter}
        />
      </Grid>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
