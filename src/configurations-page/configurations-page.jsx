import styled from "@emotion/styled";
import { Add, ArrowBack } from "@mui/icons-material";
import { AppBar, Button, Card, CardActionArea, CardContent, CardMedia, IconButton, Toolbar, Typography } from "@mui/material";
import * as React from "react";

const Container = styled('div')(({ theme }) => ({
    maxWidth: "90%",
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
    marginBottom: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline"
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
                    <AppBar position="static" sx={{ mb: 5, boxShadow: "3", width: "100%", background: "#d8d8d8", color: "#3f4155" }}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={() => {
                                    window.location = `/`;
                                }}
                            >
                                <ArrowBack sx={{ fontSize: 24 }} />
                            </IconButton>
                            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                                Выбор конфигурации для редактирования
                            </Typography>

                        </Toolbar>
                    </AppBar>

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