import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

export default class AddPropertyDialog extends React.Component {
  onAddPropertyClick = () => {
    const newPropertyName = document.getElementById("new-stage-name").value;
    if (!newPropertyName || newPropertyName.length === 0) {
      console.log("Пустое поле")
      return;
    }

    console.log(newPropertyName);
    this.props.onAddProperty(newPropertyName);
    this.props.onClose();
  };

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>{this.props.dialogTitle}</DialogTitle>
        <DialogContent sx={{ width: 450 }}>
          <TextField
            margin="dense"
            id="new-stage-name"
            label="Название"
            type="text"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => this.onAddPropertyClick()}>Добавить</Button>
        </DialogActions>
      </Dialog>
    );
  }
}