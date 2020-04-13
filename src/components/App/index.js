import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../../history'

import './index.scss'

import MainPage from '../Mainpage'
import Footer from '../Footer'
import { Container, Button, Box, Link } from '@material-ui/core';
import { FormSearch, Book, Add } from 'grommet-icons';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BookIcon from '@material-ui/icons/Book';
import AddWord from '../AddWord';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: "rgb(61, 19, 141)"
        },
        secondary: {
            main: 'rgb(255, 202, 88)'
        }
    },
});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            word: '',
            meaning: '',
            type: '',
            pronunciation: '',
            sentences: [],
            favorite: false,
            sources: [],
            showModal: false,
        }
    }

    handleClickOpen = () => {
        this.setState({ showModal: true });
    };

    handleClose = () => {
        this.setState({ showModal: false });
    };
    render() {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Container maxWidth="lg">
                        <Box className="pd-50">
                            <Router history={history}>
                                <header>
                                    <Box display="flex" flexGrow={1} spacing={3} >
                                        <Box flexGrow={1} item xs>
                                            <h2 className="logo">
                                                <Link>
                                                    <BookIcon className="mid" color={theme.palette.primary.main} />
                                                    <span className="mid">
                                                        &nbsp;MY Vocabulary Book
                                                    </span>
                                                </Link>
                                            </h2>
                                        </Box>
                                        <Box item xs alignItems='flex-end' alignContent='flex-end'>
                                            <Button className="btn" variant="contained" color="primary" onClick={this.handleClickOpen} startIcon={<Add color="#fff" />}>Add a Word</Button>
                                        </Box>
                                    </Box>
                                </header>
                                <AddWord showModal={this.state.showModal} handleClose={this.handleClose} />
                                <Switch>
                                    <Route component={MainPage} />
                                </Switch>
                            </Router>
                        </Box>
                    </Container>
                    <Footer></Footer>
                </ThemeProvider>
            </>
        )
    }
}


export default connect()(App)
