import { ArrowBack } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import StageTabs from "../stages/stage-tabs";

export default class EditConfigurationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scenarioId: this.props.scenarioId,
            isLoaded: false,
            Scenario: undefined
        };
    }

  componentDidMount() {
    if (!this.state.scenarioId) {
      this.setState({isLoaded: true})
      return;
    }
    fetch(`https://api.test.projects-cabinet.ru/catalog/scenarios/${this.state.scenarioId}`)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          Scenario: result,
          Stages: result.Scene.Stages
        });
      },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          debugger;
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

    onAddStage = (value) => {
        const newStages = (this.state.Stages || []).slice();
        newStages.push({ Name: value });
        this.setState({ Stages: newStages });
      };
    
      onAddStep = (stageIndex, newStepName) => {
        const stage = this.state.Stages[stageIndex];
        stage.Steps = stage.Steps || [];
        stage.Steps.push({ Name: newStepName });
    
        this.updateStageState();
      };
    
      onAddParameter = (stageIndex, stepIndex, parameter) => {
        const step = this.state.Stages[stageIndex].Steps[stepIndex];
        step.Parameters = step.Parameters || [];
        step.Parameters.push({
          Id: parameter.id,
          Name: parameter.name,
          Description: parameter.description,
          Type: parameter.fieldType,
          DefaultValue: parameter.defaultValue,
        });
    
        this.updateStageState();
      };
    
      updateStageState = () => this.setState({ Stages: this.state.Stages });
    
      onSaveVisualization = (stageIndex, stepIndex, cameraPositionId) => {
        const step = this.state.Stages[stageIndex].Steps[stepIndex];
        step.Visualization = step.Visualization || {};
        step.Visualization.CameraPositionId = cameraPositionId;
    
        this.updateStageState();
      }
    
      onSaveValidator = (stageIndex, stepIndex, parameterIndex, validator) => {
        const parameter = this.state.Stages[stageIndex].Steps[stepIndex].Parameters[parameterIndex];
        parameter.Validators = parameter.Validators || [];
    
        parameter.Validators.push({
          Id: validator.id,
          ValidationType: validator.validationType,
          PrimaryValue: validator.primaryValue,
          AdditionalValue: validator.additionalValue,
          OnErrorMessage: validator.onErrorMessage
        });
    
        this.updateStageState();
      }
    
      onSaveFilter = (stageIndex, stepIndex, filter) => {
        const step = this.state.Stages[stageIndex].Steps[stepIndex];
        step.Filters = step.Filters || [];
        step.Filters.push({
          Id: filter.id,
          Mode: filter.mode,
          PropertyName: filter.propertyName,
          ValueType: filter.valueType,
          PrimaryValue: filter.primaryValue,
          AdditionalValue: filter.additionalValue
        });
    
        this.updateStageState();
      };

    render() {
        const { error, isLoaded, Stages } = this.state;
        if (error) {
          return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Загрузка...</div>;
        } else {
            return (
                <div>
                    <AppBar position="static" sx={{ mb: 5, boxShadow: "3" }}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={() => {
                                    window.location = `/admin/configurations`;
                                }}
                            >
                                <ArrowBack sx={{ fontSize: 24 }} />
                            </IconButton>
                            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                                {
                                    this.state.Scenario?.Name || "Новая конфигурация"
                                }
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Grid>
                        <StageTabs
                            Stages={Stages}
                            onAddStage={this.onAddStage}
                            onAddStep={this.onAddStep}
                            onAddParameter={this.onAddParameter}
                            onSaveVisualization={this.onSaveVisualization}
                            onSaveValidator={this.onSaveValidator}
                            onSaveFilter={this.onSaveFilter}
                        />
                    </Grid>
                <AppBar position="static"
                 sx={{ mt: 5, width: "99%", boxShadow: "3", position: "absolute", bottom: 0, background: "#dfe5f5" }}>
                  <Toolbar>
                    <IconButton
                      size="large"
                      edge="start"
                      aria-label="menu"
                      sx={{ mr: 2, fontSize: 22 }}
                      onClick={() => {
                        window.location = `/admin/configurations`;
                      }}
                    >
                    Сохранить
                    </IconButton>
                  </Toolbar>
                </AppBar>
              </div>
            );
        }
      }
}