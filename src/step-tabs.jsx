import * as React from 'react';
import ParameterTabs from './parameters-tabs';
import AddPropertyDialog from './add-property-dialog';
import CustomTabs from './tabs';
import VisualizationTabs from './visualization-tab';

export default class StepTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStepIndex: 0,
      dialogOpen: false
    };
  }

  onChangeTab = (newTabIndex) => {
    this.setState({ activeStepIndex: newTabIndex });
  };

  onAddParameter = (name, description, fieldType, defaultValue) => {
    this.props.onAddParameter(this.state.activeStepIndex, name, description, fieldType, defaultValue);
  };

  onSaveVisualization = (cameraPositionId) => {
    this.props.onSaveVisualization(this.state.activeStepIndex, cameraPositionId);
  }

  render() {
    return (
      <CustomTabs
        tabItems={this.props.steps}
        tabsTitle={'Шаги'}
        getTabLabel={(step) => step.name}
        mt={-3}
        onTabsIconClick={() => { this.setState({ dialogOpen: true }); }}
        dialog={
          <AddPropertyDialog
            open={this.state.dialogOpen}
            onClose={() => { this.setState({ dialogOpen: false }); }}
            onAddProperty={this.props.onAddStep}
            buttonText={"Добавить"}
            dialogTitle={"Новый шаг"}
          />
        }
        innerTabs={(step) => (
          <div>
            <ParameterTabs
              parameters={step.parameters}
              onAddParameter={this.onAddParameter}
            />
            <VisualizationTabs
              mt={5}
              visualization={step.visualizationSetup}
              onChangeVisualization={this.onChangeVisualization}
              onSave={this.onSaveVisualization}
            />
          </div>
        )}
        onChangeTab={this.onChangeTab}
      />
    );
  }
}