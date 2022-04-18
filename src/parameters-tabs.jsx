import * as React from 'react';
import AddParameterDialog from './add-parameter-dialog';
import CustomTabs from './tabs';

export default class ParameterTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeParameterIndex: 0
    };
  }

  onChangeTab = (newTabIndex) => {
    this.setState({activeParameterIndex: newTabIndex});
  };

  render() {
    return (
      <CustomTabs
        tabItems={this.props.parameters}
        tabsTitle={'Параметры'}
        getTabLabel={(parameter) => parameter.name}
        mt={this.props.mt || -3}
        dialog={
          <AddParameterDialog onAddParameter={this.props.onAddParameter} />
        }
        innerTabs={(parameter) => {
          return (
            <div>
              <b>Описание:</b> {parameter.description}<br />
              <b>Тип вывода:</b> {parameter.type}<br />
              <b>Значение по умолчанию:</b> {parameter.defaultValue}<br />
            </div>
          )
        }}
        onChangeTab={this.onChangeTab}
      />
    );
  }
}