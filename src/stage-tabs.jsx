import * as React from "react";
import StepTabs from "./step-tabs";
import AddPropertyDialog from "./add-property-dialog";
import CustomTabs from "./tabs";

export default class StageTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStageIndex: 0,
    };
  }

  onChangeTab = (newTabIndex) => {
    this.setState({ activeStageIndex: newTabIndex });
  };

  onAddStep = (newStepName) => {
    this.props.onAddStep(this.state.activeStageIndex, newStepName);
  };

  onAddParameter = (stepIndex, name, description, fieldType, defaultValue) => {
    this.props.onAddParameter(
      this.state.activeStageIndex,
      stepIndex,
      name,
      description,
      fieldType,
      defaultValue
    );
  };

  render() {
    return (
      <CustomTabs
        tabItems={this.props.stages}
        tabsTitle={'Стадии'}
        getTabLabel={(stage) => stage.name}
        dialog={
          <AddPropertyDialog
            onAddProperty={this.props.onAddStage}
            buttonText={"Добавить"}
            dialogTitle={"Новая стадия"}
          />
        }
        innerTabs={(stage) => (
          <StepTabs
            steps={stage.steps}
            onAddStep={this.onAddStep}
            onAddParameter={this.onAddParameter}
          />
        )}
        onChangeTab={this.onChangeTab}
      />
    );
  }
}
