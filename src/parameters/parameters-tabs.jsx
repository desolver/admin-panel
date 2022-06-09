import * as React from 'react';
import AddParameterDialog from './add-parameter-dialog';
import ParameterValidatorTabs from '../validators/parameter-validator-tabs';
import CustomTabs from '../tabs';

export default class ParameterTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeParameterIndex: 0,
      dialogOpen: false
    };
  }

  onChangeTab = (newTabIndex) => {
    this.setState({activeParameterIndex: newTabIndex});
  };

  onSaveValidator = (validator) => {
    this.props.onSaveValidator(this.state.activeParameterIndex, validator);
  };

  render() {
    return (
      <CustomTabs
        tabItems={this.props.Parameters}
        tabsTitle={'Параметры'}
        getTabLabel={(parameter) => parameter.Name}
        mt={this.props.mt || -3}
        onTabsIconClick={() => { this.setState({ dialogOpen: true }); }}
        dialog={
          <AddParameterDialog
            open={this.state.dialogOpen}
            onClose={() => { this.setState({ dialogOpen: false }); }}
            onAddParameter={this.props.onAddParameter}
          />
        }
        innerTabs={(parameter) => {
          return (
            <div>
              <b>ID:</b> {parameter.Id}<br />
              <b>Описание:</b> {parameter.Description}<br />
              <b>Тип вывода:</b> {parameter.Type}<br />
              <b>Значение по умолчанию:</b> {parameter.DefaultValue}<br />
              <ParameterValidatorTabs
                Validators={parameter.Validators}
                onSaveValidator={this.onSaveValidator}
                Parameter={parameter}
              />
            </div>
          )
        }}
        onChangeTab={this.onChangeTab}
      />
    );
  }
}