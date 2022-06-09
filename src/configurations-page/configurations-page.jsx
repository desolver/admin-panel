import styled from "@emotion/styled";
import { Add } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import * as React from "react";

const Container = styled('div')(({ theme }) => ({
    maxWidth: "80%",
    margin: "5%",
    marginTop: "2%"
  }));

const ConfigContainer = styled('div')(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignContent: "stretch",
    gap: "25px"
}));

const Header = styled('div')(({ theme }) => ({
    marginBottom: "50px"
}));

export default class ConfigurationsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://api.test.projects-cabinet.ru/catalog/scenarios/actual")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Загрузка...</div>;
        } else {
            return (
                <Container>
                    <Header>
                        <Typography gutterBottom variant="h2" component="div">
                            Выбор конфигурации для редактирования
                        </Typography>
                    </Header>
                    <ConfigContainer>
                        {items.map((item, index) => (
                            <Card
                                sx={{ maxWidth: 600, maxHeight: 400 }}
                                onClick={() => {
                                    window.location = `/admin/configurations/${item.Id}`;
                                }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={`/images/Back_${(index) % 5 + 1}.png`}
                                        alt={item.Name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {
                                                item.Name
                                            }
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                        <Card
                            sx={{ maxWidth: 600, maxHeight: 400 }}
                            onClick={() => {
                                window.location = `/admin/configurations/new`;
                            }}>
                            <CardActionArea>
                                <CardMedia
                                        component="img"
                                        height="250"
                                        image={`/images/Stub_default.png`}
                                        alt="Изображение"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Добавить новую конфигурацию
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </ConfigContainer>
                </Container>
            );
        }
    }
}