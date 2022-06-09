import * as React from 'react';
import ParameterTabs from '../parameters/parameters-tabs';
import AddPropertyDialog from '../add-property-dialog';
import CustomTabs from '../tabs';
import VisualizationTabs from '../visualizations/visualization-tab';
import ProductFilterTabs from '../filters/product-filter-tabs';

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

  onSaveParameter = (parameter) => {
    this.props.onAddParameter(this.state.activeStepIndex, parameter);
  };

  onSaveVisualization = (cameraPositionId) => {
    this.props.onSaveVisualization(this.state.activeStepIndex, cameraPositionId);
  };

  onSaveFilter = () => {

  };

  onSaveValidator = (parameterIndex, validator) => {
    this.props.onSaveValidator(this.state.activeStepIndex, parameterIndex, validator);
  };

  onSaveFilter = (filter) => {
    this.props.onSaveFilter(this.state.activeStepIndex, filter);
  };

  render() {
    return (
      <CustomTabs
        tabItems={this.props.Steps}
        tabsTitle={'Шаги'}
        getTabLabel={(step) => step.Name}
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
              Parameters={step.Parameters}
              onAddParameter={this.onSaveParameter}
              onSaveValidator={this.onSaveValidator}
            />
            <ProductFilterTabs
              Filters={step.Filters}
              onSaveFilter={this.onSaveFilter}
            />
            <VisualizationTabs
              Visualization={step.Visualization}
              onSave={this.onSaveVisualization}
              width={250}
            />
          </div>
        )}
        onChangeTab={this.onChangeTab}
      />
    );
  }
}