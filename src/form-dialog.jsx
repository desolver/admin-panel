import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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

  onAddStageClick = () => {
    const newStageName = document.getElementById("new-stage-name").value;
    if (!newStageName || newStageName.length === 0) {
      console.log("Пустое поле")
      return;
    }

    console.log(newStageName);
    this.props.onAddStage(newStageName);
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
          Добавить стадию
        </Fab>

        <Dialog open={this.state.dialogOpen} onClose={() => this.closeDialog()}>
          <DialogTitle>Новая стадия</DialogTitle>
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
            <Button variant="contained" onClick={() => this.onAddStageClick()}>Добавить</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}