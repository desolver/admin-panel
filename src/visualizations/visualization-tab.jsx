import { Add, Edit } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ChangeVisualizationDialog from './change-visualization-dialog';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  textAlign: "center"
}));

export default class VisualizationTabs extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dialogOpen: false
      };
    }

    onSave = (cameraPositionId) => {
      this.props.onSave(cameraPositionId);
      this.setState({ dialogOpen: false });
    }

    render() {
      const visualizationExists = this.props.visualization;

      const comment = visualizationExists
        ? <Div>Позиция камеры: {this.props.visualization.cameraPositionId}</Div>
        : <Div>Добавьте визуализацию,<br />если это необходимо</Div>;

      const padding = visualizationExists ? 0.6 : 0.1;

      return (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
            width: this.props.width
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Typography variant="h5" component="div" gutterBottom maxWidth={200} align={'center'} sx={{color: "GrayText"}}>
              Настройки визуализации
            </Typography>
            <IconButton
              size="small"
              sx={{ ml: 2, mt: -1, border: 1, p: padding }}
              color="primary"
              onClick={() => { this.setState({ dialogOpen: true }); }}
            >
              {
                visualizationExists ? <Edit fontSize='12' /> : <Add />
              }
            </IconButton>
          </Grid>
          {
            comment
          }
          <ChangeVisualizationDialog
            open={this.state.dialogOpen}
            onClose={() => { this.setState({ dialogOpen: false }); }}
            dialogTitle={visualizationExists ? "Редактирование визуализации" : "Новая настройка визуализации"}
            onSave={this.onSave}
            visualization={this.props.visualization}
          />
      </Grid>
      );
    }
  }