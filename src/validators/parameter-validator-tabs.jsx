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
        tabItems={this.props.Validators}
        tabsTitle={'Валидаторы'}
        getTabLabel={(validator) => validator.id}
        mt={3}
        onTabsIconClick={() => { this.setState({ dialogOpen: true }); }}
        dialog={
          <AddValidatorDialog
            open={this.state.dialogOpen}
            onClose={() => { this.setState({ dialogOpen: false }); }}
            onSave={this.props.onSaveValidator}
            parameter={this.props.Parameter}
          />
        }
        innerTabs={(validator) => (
            <div>
                <b>Тип сравнения:</b> {validator.ValidationType} <br />
                
                <b>Основное значение</b> <br />
                <em>
                  — Использовать динамический параметр: {validator.PrimaryValue.UseDynamicParameter ? 'Да' : 'Нет'} <br />
                  — ID динамического параметра: {validator.PrimaryValue.DynamicParameterId || 'Не используется'} <br />
                  — Тип: {validator.PrimaryValue.Type || 'Не используется'} <br />
                  — Константа: {validator.PrimaryValue.ConstantValue || 'Не используется'} <br />
                </em>
                <b>Дополнительное значение</b> <br />
                <em>
                  — Использовать динамический параметр: {validator.AdditionalValue.UseDynamicParameter ? 'Да' : 'Нет'} <br />
                  — ID динамического параметра: {validator.AdditionalValue.DynamicParameterId || 'Не используется'} <br />
                  — Тип: {validator.AdditionalValue.Type || 'Не используется'} <br />
                  — Константа: {validator.AdditionalValue.ConstantValue || 'Не используется'} <br />
                </em>
                <b>Сообщение об ошибке:</b> {validator.OnErrorMessage}<br />
            </div>
        )}
        onChangeTab={this.onChangeTab}
      />
    );
  }
}