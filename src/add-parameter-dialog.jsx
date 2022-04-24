import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Fab, InputLabel, MenuItem, Select } from '@mui/material';

export default class AddParameterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: 'String'
    }
  }

  onAddParameterClick = () => {
    const name = document.getElementById("new-parameter-name").value;
    const description = document.getElementById("new-parameter-description").value;
    const fieldType = this.state.selectedType;
    const defaultValue = document.getElementById("new-parameter-default-value").value;

    this.props.onAddParameter(name, description, fieldType, defaultValue);
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
          <InputLabel id="demo-simple-select-label" sx={{ mt: 2 }}>Тип параметра</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="parameter-type-select"
            value={this.state.selectedType}
            onChange={this.changeSelectTypeValue}
          >
            <MenuItem value={'String'}>Строка</MenuItem>
            <MenuItem value={'Bool'}>Флаг</MenuItem>
            <MenuItem value={'Int'}>Целое число</MenuItem>
            <MenuItem value={'Float'}>Дробное число</MenuItem>
            <MenuItem value={'Enumeration'}>Выбор из нескольких значений</MenuItem>
          </Select>
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