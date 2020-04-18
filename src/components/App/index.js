import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { connect } from 'react-redux'
import history from '../../history'

import './index.scss'

import MainPage from '../Mainpage'
import Footer from '../Footer'
import AddWord from '../AddWord';
import DocumentMeta from 'react-document-meta';
import { Container, Button, Box, Link, Hidden, Fab } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import BookIcon from '@material-ui/icons/Book';



const meta = {
    title: 'My Vocabulary Book',
    meta: {
        charset: 'utf-8',
        name: "viewport",
        content: "minimum-scale=1, initial-scale:1, width:device-width"
    }
}

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
                <DocumentMeta {...meta}>
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
                                                            &nbsp;Werdia
                                                    </span>
                                                    </Link>
                                                </h2>
                                            </Box>
                                            <Hidden xsDown>
                                                <Box item xs alignItems='flex-end' alignContent='flex-end'>
                                                    <Button className="btn" variant="contained" color="primary" onClick={this.handleClickOpen} startIcon={<AddIcon color="#fff" />}>Add a Word</Button>
                                                </Box>
                                            </Hidden>

                                        </Box>
                                    </header>
                                    <AddWord showModal={this.state.showModal} handleClose={this.handleClose} />
                                    <Switch>
                                        <Route component={MainPage} />
                                    </Switch>
                                </Router>
                            </Box>
                            <Hidden smUp>
                                <Fab onClick={this.handleClickOpen} color="secondary" aria-label="add" style={{
                                    position: 'fixed',
                                    bottom: theme.spacing(4),
                                    right: theme.spacing(4)
                                }}>
                                    <AddIcon />
                                </Fab>
                            </Hidden>
                        </Container>
                        <Footer></Footer>
                    </ThemeProvider>
                </DocumentMeta>
            </>
        )
    }
}


export default connect()(App)
