import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';

export default class ChangeVisualizationDialog extends React.Component {
  constructor(props) {
    super(props);
    const selectedCameraPositionId = this.props.Visualization
      ? this.props.Visualization.CameraPositionId
      : '1';

    this.state = {
      CameraPositionId: selectedCameraPositionId
    }
  }

  changeSelectTypeValue = (event) => {
    this.setState({CameraPositionId: event.target.value});
  }

  onSave = () => {
    debugger;
    const cameraPositionId = this.state.CameraPositionId;
    this.props.onSave(cameraPositionId);
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>{this.props.dialogTitle}</DialogTitle>
        <DialogContent sx={{ width: 450 }}>
          <InputLabel id="camera-position-select-label" sx={{ mt: 2 }}>Точка расположения камеры</InputLabel>
          <Select
            labelId="camera-position-select-label"
            id="camera-position-select"
            value={this.state.CameraPositionId}
            onChange={this.changeSelectTypeValue}
          >
            <MenuItem value={'1'}>1</MenuItem>
            <MenuItem value={'2'}>2</MenuItem>
            <MenuItem value={'3'}>3</MenuItem>
            <MenuItem value={'4'}>4</MenuItem>
            <MenuItem value={'5'}>5</MenuItem>
            <MenuItem value={'6'}>6</MenuItem>
            <MenuItem value={'7'}>7</MenuItem>
            <MenuItem value={'8'}>8</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => this.onSave()}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    );
  }
}