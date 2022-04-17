import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import NestedModal from "./nested-modal";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const Container = styled.div`
  flex-direction: column;
  margin-right: 20px;
`;

export default function ActionAreaCard() {
  return (
    <Container>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <TextField required id="outlined-required" label="Название стадии" />
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <NestedModal></NestedModal>
        </CardContent>
      </Card>
    </Container>
  );
}
