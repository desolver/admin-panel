import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormLabel, InputLabel, MenuItem, Select } from '@mui/material';
import ValueRepresentation from '../value-representations/value-representation-fields';
import { DEFAULT_PARAMETER_TYPE } from '../constants';
import { createGuid } from '../guid-creator';
import { FieldType } from '../value-representations/field-type';

export default class AddFilterDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compareType: 'Equals',
            parameter: this.props.parameter,
            fieldType: DEFAULT_PARAMETER_TYPE
        }
    }

    changeSelectTypeValue = (event) => {
        this.setState({ compareType: event.target.value });
    };

    changeMainParameterUsage = (parameter) => {
        this.setState({
            mainParameterFieldType: parameter.fieldType,
            mainParameterConstant: parameter.constant,
            mainDynamicParameterEnabled: parameter.dynamicParameterEnabled
        });
    };

    changeAdditionalParameterUsage = (parameter) => {
        this.setState({
            additionalParameterFieldType: parameter.fieldType,
            additionalParameterConstant: parameter.constant,
            additionalDynamicParameterEnabled: parameter.dynamicParameterEnabled
        });
    };

    onFieldTypeChange = (event) => {
        const fieldType = event.target.value;
        this.setState({ fieldType: fieldType });
    };

    onFilterSave = () => {
        const usePrimaryDynamicParameter = this.state.mainDynamicParameterEnabled || false;
        const primaryValueType = usePrimaryDynamicParameter
            ? undefined
            : this.state.mainParameterFieldType || DEFAULT_PARAMETER_TYPE;

        const useAdditionalDynamicParameter = this.state.additionalDynamicParameterEnabled || false;
        const additionalValueType = useAdditionalDynamicParameter
            ? undefined
            : this.state.additionalParameterFieldType || DEFAULT_PARAMETER_TYPE;

        this.props.onSave({
            id: createGuid(),
            mode: this.state.compareType,
            propertyName: document.getElementById("filter-property-name").value,
            valueType: this.state.fieldType,
            primaryValue: {
                type: primaryValueType,
                useDynamicParameter: usePrimaryDynamicParameter,
                dynamicParameterId: usePrimaryDynamicParameter ? this.state.parameter : undefined,
                constantValue: usePrimaryDynamicParameter ? undefined : this.state.mainParameterConstant
            },
            additionalValue: {
                type: additionalValueType,
                useDynamicParameter: useAdditionalDynamicParameter,
                dynamicParameterId: useAdditionalDynamicParameter ? this.state.parameter : undefined,
                constantValue: useAdditionalDynamicParameter ? undefined : this.state.additionalParameterConstant
            }
        });
        this.props.onClose();
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>Новый фильтр</DialogTitle>
                <DialogContent sx={{ width: 450 }}>
                    <TextField
                        margin="dense"
                        id="filter-property-name"
                        label="Название свойства"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>Тип сравнения</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="validation-type-select"
                        value={this.state.compareType}
                        onChange={this.changeSelectTypeValue}
                    >
                        <MenuItem value={'Equals'}>Равно</MenuItem>
                        <MenuItem value={'GreaterThan'}>Больше</MenuItem>
                        <MenuItem value={'GreaterThanOrEqualTo'}>Больше или равно</MenuItem>
                        <MenuItem value={'LessThan'}>Меньше</MenuItem>
                        <MenuItem value={'LessThanOrEqualTo'}>Меньше или равно</MenuItem>
                        <MenuItem value={'InRange'}>В диапазоне</MenuItem>
                    </Select>
                    <FieldType
                        onChange={this.onFieldTypeChange}
                        selectedType={this.state.fieldType}
                    />
                    <FormLabel component="legend" sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }}>Основное значение</FormLabel>
                    <ValueRepresentation
                        onChange={this.changeMainParameterUsage}
                        dynamicParameterFieldsEnabled={this.state.mainDynamicParameterEnabled}
                    />
                    <FormLabel component="legend" sx={{ mt: 5, fontWeight: "bold", fontSize: 20 }}>Дополнительное значение</FormLabel>
                    <ValueRepresentation
                        onChange={this.changeAdditionalParameterUsage}
                        dynamicParameterFieldsEnabled={this.state.additionalDynamicParameterEnabled}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={this.onFilterSave}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        );
    }
}