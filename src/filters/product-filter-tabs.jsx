import * as React from 'react';
import CustomTabs from '../tabs';
import AddFilterDialog from './add-filter-dialog';

export default class ProductFilterTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilterIndex: 0,
      dialogOpen: false
    };
  }

  onChangeTab = (newTabIndex) => {
    this.setState({ activeFilterIndex: newTabIndex });
  };

  render() {
    return (
      <CustomTabs
        tabItems={this.props.filters}
        tabsTitle={'Фильтры товаров'}
        getTabLabel={(filter) => filter.propertyName}
        mt={5}
        onTabsIconClick={() => { this.setState({ dialogOpen: true }); }}
        dialog={
          <AddFilterDialog
            open={this.state.dialogOpen}
            onClose={() => { this.setState({ dialogOpen: false }); }}
            onSave={this.props.onSaveFilter}
            buttonText={"Сохранить"}
            dialogTitle={"Новый фильтр"}
          />
        }
        innerTabs={(filter) => (
          <div>
                <b>ID фильтра:</b> {filter.id} <br />
                <b>Название свойства:</b> {filter.propertyName} <br />
                <b>Тип сравнения:</b> {filter.mode} <br />
                <b>Тип значения:</b> {filter.valueType} <br />
                
                <b>Основное значение</b> <br />
                <em>
                  — Использовать динамический параметр: {filter.primaryValue.useDynamicParameter ? 'Да' : 'Нет'} <br />
                  — ID динамического параметра: {filter.primaryValue.dynamicParameterId || 'Не используется'} <br />
                  — Тип: {filter.primaryValue.type || 'Не используется'} <br />
                  — Константа: {filter.primaryValue.constantValue || 'Не используется'} <br />
                </em>
                <b>Дополнительное значение</b> <br />
                <em>
                  — Использовать динамический параметр: {filter.additionalValue.useDynamicParameter ? 'Да' : 'Нет'} <br />
                  — ID динамического параметра: {filter.additionalValue.dynamicParameterId || 'Не используется'} <br />
                  — Тип: {filter.additionalValue.type || 'Не используется'} <br />
                  — Константа: {filter.additionalValue.constantValue || 'Не используется'} <br />
                </em>
            </div>
        )}
        onChangeTab={this.onChangeTab}
      />
    );
  }
}