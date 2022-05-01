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

export default class AddValidatorDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compareType: 'Equals',
            parameter: this.props.parameter
        }
    }

    changeSelectTypeValue = (event) => {
        this.setState({ compareType: event.target.value });
    }

    changeMainParameterUsage = (parameter) => {
        this.setState({
            mainParameterFieldType: parameter.fieldType,
            mainParameterConstant: parameter.constant,
            mainDynamicParameterEnabled: parameter.dynamicParameterEnabled
        });
    }

    changeAdditionalParameterUsage = (parameter) => {
        this.setState({
            additionalParameterFieldType: parameter.fieldType,
            additionalParameterConstant: parameter.constant,
            additionalDynamicParameterEnabled: parameter.dynamicParameterEnabled
        });
    };

    onValidatorSave = () => {
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
            validationType: this.state.compareType,
            primaryValue: {
                type: primaryValueType,
                useDynamicParameter: usePrimaryDynamicParameter,
                dynamicParameterId: usePrimaryDynamicParameter ? this.state.parameter.id : undefined,
                constantValue: usePrimaryDynamicParameter ? undefined : this.state.mainParameterConstant
            },
            additionalValue: {
                type: additionalValueType,
                useDynamicParameter: useAdditionalDynamicParameter,
                dynamicParameterId: useAdditionalDynamicParameter ? this.state.parameter.id : undefined,
                constantValue: useAdditionalDynamicParameter ? undefined : this.state.additionalParameterConstant
            },
            onErrorMessage: document.getElementById("validator-error-message").value
        });
        this.props.onClose();
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>Новый валидатор</DialogTitle>
                <DialogContent sx={{ width: 450 }}>
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
                    <TextField
                        margin="dense"
                        id="validator-error-message"
                        label="Сообщение пользователю при ошибке"
                        type="text"
                        fullWidth
                        variant="standard"
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
                    <Button variant="contained" onClick={this.onValidatorSave}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        );
    }
}