import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import StepTabs from "./step-tabs";
import AddPropertyDialog from "./add-property-dialog";
import { Button, Fab, Grid } from "@mui/material";
import { Edit } from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Grid>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const DialogContainer = styled.div`
  margin-top: 30px;
`;

export default class StageTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStageIndex: 0,
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ activeStageIndex: newValue });
  };

  onAddStep = (newStepName) => {
    this.props.onAddStep(this.state.activeStageIndex, newStepName);
  };

  onAddParameter = (stepIndex, name, description, fieldType, defaultValue) => {
    this.props.onAddParameter(
      this.state.activeStageIndex,
      stepIndex,
      name,
      description,
      fieldType,
      defaultValue
    );
  };

  render() {
    const stages = this.props.stages || [];

    return (
      <Grid sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography variant="h5" component="div" gutterBottom>
            Стадии
          </Typography>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={this.state.activeStageIndex}
            aria-label="Vertical tabs"
            sx={{ borderRight: 1, borderColor: "divider", minWidth: 250 }}
          >
            {stages.map((stage, index) => (
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mr: 4,
                }}
              >
                <Tab
                  key={index}
                  label={stage.name}
                  wrapped
                  sx={{
                    fontSize: 16,
                    textTransform: "none",
                    fontWeight: "bold",
                    width: '100%'
                  }}
                  onClick={() => this.handleChange(null, index)}
                ></Tab>
                <Edit sx={{ fontSize: 16 }} onClick={() => console.log("H:AJFSJ")}/>
              </Grid>
            ))}
          </Tabs>
          <DialogContainer>
            <AddPropertyDialog
              onAddProperty={this.props.onAddStage}
              buttonText={"Добавить стадию"}
              dialogTitle={"Новая стадия"}
            />
          </DialogContainer>
        </Grid>
        {stages.map((stage, index) => (
          <TabPanel
            value={this.state.activeStageIndex}
            index={index}
            key={index}
          >
            <StepTabs
              steps={stage.steps}
              onAddParameter={this.onAddParameter}
            />
            <DialogContainer>
              <AddPropertyDialog
                onAddProperty={this.onAddStep}
                buttonText={"Добавить шаг"}
                dialogTitle={"Новый шаг"}
              />
            </DialogContainer>
          </TabPanel>
        ))}
      </Grid>
    );
  }
}
