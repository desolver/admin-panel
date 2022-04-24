import * as React from 'react';
import CustomTabs from '../tabs';
import AddValidatorDialog from './add-validator-dialog';

export default class ParameterValidatorTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeValidatorIndex: 0,
      dialogOpen: false
    };
  }

  onChangeTab = (newTabIndex) => {
    this.setState({ activeValidatorIndex: newTabIndex });
  };

  render() {
    return (
      <CustomTabs
        tabItems={this.props.validators}
        tabsTitle={'Валидаторы'}
        getTabLabel={(validator) => validator.id}
        mt={3}
        onTabsIconClick={() => { this.setState({ dialogOpen: true }); }}
        dialog={
          <AddValidatorDialog
            open={this.state.dialogOpen}
            onClose={() => { this.setState({ dialogOpen: false }); }}
            onSave={this.props.onSaveValidator}
            parameter={this.props.parameter}
          />
        }
        innerTabs={(validator) => (
            <div>
                <b>Тип сравнения:</b> {validator.validationType} <br />
                
                <b>Основное значение</b> <br />
                <em>
                  — Использовать динамический параметр: {validator.primaryValue.useDynamicParameter ? 'Да' : 'Нет'} <br />
                  — ID динамического параметра: {validator.primaryValue.dynamicParameterId || 'Не используется'} <br />
                  — Тип: {validator.primaryValue.type || 'Не используется'} <br />
                  — Константа: {validator.primaryValue.constantValue || 'Не используется'} <br />
                </em>
                <b>Дополнительное значение</b> <br />
                <em>
                  — Использовать динамический параметр: {validator.additionalValue.useDynamicParameter ? 'Да' : 'Нет'} <br />
                  — ID динамического параметра: {validator.additionalValue.dynamicParameterId || 'Не используется'} <br />
                  — Тип: {validator.additionalValue.type || 'Не используется'} <br />
                  — Константа: {validator.additionalValue.constantValue || 'Не используется'} <br />
                </em>
                <b>Сообщение об ошибке:</b> {validator.onErrorMessage}<br />
            </div>
        )}
        onChangeTab={this.onChangeTab}
      />
    );
  }
}