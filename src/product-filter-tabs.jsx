import * as React from 'react';
import AddPropertyDialog from './add-property-dialog';
import CustomTabs from './tabs';

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
        tabItems={this.props.steps}
        tabsTitle={'Фильтры'}
        getTabLabel={(step) => step.name}
        mt={5}
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
           
          </div>
        )}
        onChangeTab={this.onChangeTab}
      />
    );
  }
}