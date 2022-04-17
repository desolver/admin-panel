import * as React from 'react';
import ReactDOM from 'react-dom';
import FormDialog from './form-dialog';
import VerticalTabs from "./vertical-tabs";
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import initialData from './initial-data';

const DialogContainer = styled.div`
    margin-top: 30px;
    margin-left: 70px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(initialData);
  }

  onAddStage = (value) => {
    const newStages = this.state.stages.slice();
    newStages.push({name: value});
    this.setState({stages: newStages});
  }

  render() {
    return (
      <Grid>
        <VerticalTabs stages={this.state.stages} />
        <DialogContainer>
          <FormDialog onAddStage={this.onAddStage} />
        </DialogContainer>
      </Grid>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));