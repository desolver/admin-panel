import * as React from "react";
import StepTabs from "../steps/step-tabs";
import AddPropertyDialog from "../add-property-dialog";
import CustomTabs from "../tabs";

export default class StageTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStageIndex: 0,
      dialogOpen: false
    };
  }

  onChangeTab = (newTabIndex) => {
    this.setState({ activeStageIndex: newTabIndex });
  };

  onAddStep = (newStepName) => {
    this.props.onAddStep(this.state.activeStageIndex, newStepName);
  };

  onAddParameter = (stepIndex, parameter) => {
    this.props.onAddParameter(this.state.activeStageIndex, stepIndex, parameter);
  };

  onSaveVisualization = (stepIndex, cameraPositionId) => {
    this.props.onSaveVisualization(this.state.activeStageIndex, stepIndex, cameraPositionId);
  }

  onSaveValidator = (stepIndex, parameterIndex, validator) => {
    this.props.onSaveValidator(this.state.activeStageIndex, stepIndex, parameterIndex, validator);
  }

  onSaveFilter = (stepIndex, filter) => {
    this.props.onSaveFilter(this.state.activeStageIndex, stepIndex, filter);
  }

  render() {
    return (
      <CustomTabs
        tabItems={this.props.Stages}
        tabsTitle={'Стадии'}
        getTabLabel={(stage) => stage.Name}
        onTabsIconClick={() => { this.setState({ dialogOpen: true }); }}
        dialog={
          <AddPropertyDialog
            open={this.state.dialogOpen}
            onClose={() => { this.setState({ dialogOpen: false }); }}
            onAddProperty={this.props.onAddStage}
            buttonText={"Добавить"}
            dialogTitle={"Новая стадия"}
          />
        }
        innerTabs={(stage) => (
          <StepTabs
            Steps={stage.Steps}
            onAddStep={this.onAddStep}
            onAddParameter={this.onAddParameter}
            onSaveVisualization={this.onSaveVisualization}
            onSaveValidator={this.onSaveValidator}
            onSaveFilter={this.onSaveFilter}
          />
        )}
        onChangeTab={this.onChangeTab}
      />
    );
  }
}
