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
        tabItems={this.props.parameters}
        tabsTitle={'Параметры'}
        getTabLabel={(parameter) => parameter.name}
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
              <b>ID:</b> {parameter.id}<br />
              <b>Описание:</b> {parameter.description}<br />
              <b>Тип вывода:</b> {parameter.type}<br />
              <b>Значение по умолчанию:</b> {parameter.defaultValue}<br />
              <ParameterValidatorTabs
                validators={parameter.validators}
                onSaveValidator={this.onSaveValidator}
                parameter={parameter}
              />
            </div>
          )
        }}
        onChangeTab={this.onChangeTab}
      />
    );
  }
}