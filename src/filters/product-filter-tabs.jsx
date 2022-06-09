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
        tabItems={this.props.Filters}
        tabsTitle={'Фильтры товаров'}
        getTabLabel={(filter) => filter.PropertyName || "Фильтр"}
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
        innerTabs={(filter) => {(
          <div>
                <b>ID фильтра:</b> {filter.Id} <br />
                <b>Название свойства:</b> {filter.PropertyName} <br />
                <b>Тип сравнения:</b> {filter.Mode} <br />
                <b>Тип значения:</b> {filter.ValueType} <br />
                
                {/* <b>Основное значение</b> <br />
                <em>
                  — Использовать динамический параметр: {filter.PrimaryValue.UseDynamicParameter ? 'Да' : 'Нет'} <br />
                  — ID динамического параметра: {filter.PrimaryValue.DynamicParameterId || 'Не используется'} <br />
                  — Тип: {filter.PrimaryValue.Type || 'Не используется'} <br />
                  — Константа: {filter.PrimaryValue.ConstantValue || 'Не используется'} <br />
                </em>
                <b>Дополнительное значение</b> <br />
                <em>
                  — Использовать динамический параметр: {filter.AdditionalValue.UseDynamicParameter ? 'Да' : 'Нет'} <br />
                  — ID динамического параметра: {filter.AdditionalValue.DynamicParameterId || 'Не используется'} <br />
                  — Тип: {filter.AdditionalValue.Type || 'Не используется'} <br />
                  — Константа: {filter.AdditionalValue.ConstantValue || 'Не используется'} <br />
                </em> */}
            </div>
        )}}
        onChangeTab={this.onChangeTab}
      />
    );
  }
}