import * as React from 'react';
import ParameterTabs from './parameters-tabs';
import AddPropertyDialog from './add-property-dialog';
import CustomTabs from './tabs';

export default class StepTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStepIndex: 0
    };
  }

  onChangeTab = (newTabIndex) => {
    this.setState({ activeStepIndex: newTabIndex });
  };

  onAddParameter = (name, description, fieldType, defaultValue) => {
    this.props.onAddParameter(this.state.activeStepIndex, name, description, fieldType, defaultValue)
  };

  render() {
    return (
        <CustomTabs
          tabItems={this.props.steps}
          tabsTitle={'Шаги'}
          getTabLabel={(step) => step.name}
          mt={-3}
          dialog={
            <AddPropertyDialog
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
            <ParameterTabs
              mt={5}
              parameters={step.visualization}
              onAddParameter={this.onAddParameter}
            />
            </div>
          )}
          onChangeTab={this.onChangeTab}
        />
    );
  }
}