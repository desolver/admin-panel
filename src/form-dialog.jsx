import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false
    }
  }

  onAddPropertyClick = () => {
    const newPropertyName = document.getElementById("new-stage-name").value;
    if (!newPropertyName || newPropertyName.length === 0) {
      console.log("Пустое поле")
      return;
    }

    console.log(newPropertyName);
    this.props.onAddProperty(newPropertyName);
    this.closeDialog();
  };

  openDialog = () => {
    this.setState({dialogOpen: true});
  }

  closeDialog = () => {
    this.setState({dialogOpen: false});
  }

  render() {
    return (
      <div id="demo">
        <Fab
          variant="extended"
          size="small"
          color="secondary"
          aria-label="add"
          onClick={() => this.openDialog()}
        >
          <Add sx={{ mr: 1 }} />
          {this.props.buttonText}
        </Fab>

        <Dialog open={this.state.dialogOpen} onClose={() => this.closeDialog()}>
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
      </div>
    );
  }
}