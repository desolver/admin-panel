import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { FieldType } from "./field-type";

export default class ValueRepresentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dynamicParameterEnabled: false,
            fieldType: 'String'
        };
    }

    handleChange = (event) => {
        const newDynamicParameterEnabled = event.target.checked;
        this.setState({dynamicParameterEnabled: newDynamicParameterEnabled});
        this.parentCallback({dynamicParameterEnabled: newDynamicParameterEnabled});
    };

    onFieldTypeChange = (event) => {
        const fieldType = event.target.value;
        this.setState({ fieldType: fieldType });
        this.parentCallback({fieldType: fieldType});
    };

    onTypeConstant = (event) => {
        const constant = event.target.value;
        this.setState({ constant: constant });
        this.parentCallback({constant: constant});
    };

    parentCallback = ({fieldType, constant, dynamicParameterEnabled}) => {
        this.props.onChange({
            fieldType: fieldType || this.state.fieldType,
            constant: constant || this.state.constant,
            dynamicParameterEnabled: dynamicParameterEnabled || this.state.dynamicParameterEnabled
        });
    };

    render() {
        const content = this.state.dynamicParameterEnabled
            ? <div></div>
            : (
                <div>
                    <FieldType
                        onChange={this.onFieldTypeChange}
                        selectedType={this.state.fieldType}
                    />
                    <TextField
                        margin="dense"
                        id="constant-value"
                        label="Константа"
                        type="text"
                        fullWidth
                        variant="standard"
                        onPointerUp={this.onTypeConstant}
                    />
                </div>);

        return (
            <div>
                <FormControlLabel
                    control={<Checkbox id={this.props.checkboxId} checked={this.state.dynamicParameterEnabled} onChange={this.handleChange} />}
                    label="Использовать динамический параметр"
                />
                {
                    content
                }
            </div >
        );
    }
}