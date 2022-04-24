import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { FieldType } from '../value-representations/field-type';
import { DEFAULT_PARAMETER_TYPE } from '../constants';
import { createGuid } from '../guid-creator';

export default class AddParameterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: DEFAULT_PARAMETER_TYPE
    }
  }

  onAddParameterClick = () => {
    const name = document.getElementById("new-parameter-name").value;
    const description = document.getElementById("new-parameter-description").value;
    const fieldType = this.state.selectedType;
    const defaultValue = document.getElementById("new-parameter-default-value").value;
    const id = createGuid();

    this.props.onAddParameter({id, name, description, fieldType, defaultValue});
    this.props.onClose();
  };

  changeSelectTypeValue = (event) => {
    this.setState({selectedType: event.target.value});
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>Новый параметр</DialogTitle>
        <DialogContent sx={{ width: 450 }}>
          <TextField
            margin="dense"
            id="new-parameter-name"
            label="Название"
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            margin="dense"
            id="new-parameter-description"
            label="Описание"
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <FieldType
            selectedType={this.state.selectedType}
            onChange={this.changeSelectTypeValue}
          />
          <TextField
            margin="dense"
            id="new-parameter-default-value"
            label="Значение по умолчанию"
            type="text"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => this.onAddParameterClick()}>Добавить</Button>
        </DialogActions>
      </Dialog>
    );
  }
}