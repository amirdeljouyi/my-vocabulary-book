import React from 'react'
import { connect } from 'react-redux'

import './index.scss'


import firebase from '../firebase.js';
import Modal from '../Modal'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class AddWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            meaning: '',
            pronunciation: '',
            type: ['Noun'],
            sentences: [''],
            sentence: '',
            sources: [''],
            source: '',
            favorite: false,
            openSnackbar: false,
            snackBarSeverity: '',
            snackbarTitle: ''
        };
        this.handleChangeOnWord = this.handleChangeOnWord.bind(this);
        this.handleChangeOnPronunciation = this.handleChangeOnPronunciation.bind(this);
        this.handleChangeOnType = this.handleChangeOnType.bind(this);
        this.handleChangeOnFavorite = this.handleChangeOnFavorite.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeOnWord = (event) => {
        this.setState({ word: event.target.value })
    };
    handleChangeOnMeaning = (event) => {
        this.setState({ meaning: event.target.value })
    };
    handleChangeOnPronunciation = (event) => {
        this.setState({ pronunciation: event.target.value })
    };
    handleChangeOnSentences = (event) => {
        let sentences = event.target.value.split("\n");
        this.setState({ sentences: sentences, sentence: event.target.value })
    };
    handleChangeOnSources = (event) => {
        let sources = event.target.value.split(", ");
        this.setState({ sources: sources, source: event.target.value })
    };
    handleChangeOnType = (event) => {
        this.setState({ type: event.target.value })
    };
    handleChangeOnFavorite = (event) => {
        this.setState({ favorite: event.target.checked });
    };
    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openSnackbar: false });
    };

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('items');
        const item = {
            word: this.state.word,
            meaning: this.state.meaning,
            pronunciation: this.state.pronunciation,
            sentences: this.state.sentences,
            sources: this.state.sources,
            type: this.state.type,
            favorite: this.state.favorite
        }
        itemsRef.push(item,
            () => {
                this.props.handleClose();
                this.setState({
                    snackbarTitle: this.state.word + ' added successfully'
                })
                this.setState({
                    word: '',
                    pronunciation: '',
                    meaining: '',
                    sentences: [],
                    sentence: '',
                    sources: [],
                    source: '',
                    type: ['Noun'],
                    favorite: false,
                    openSnackbar: true,
                    snackBarSeverity: 'success'
                });
            }
        );

    }
    render() {
        return (
            <>
                <Modal
                    handleChangeOnWord={this.handleChangeOnWord}
                    handleChangeOnMeaning={this.handleChangeOnMeaning}
                    handleChangeOnPronunciation={this.handleChangeOnPronunciation}
                    handleChangeOnSentences={this.handleChangeOnSentences}
                    handleChangeOnSources={this.handleChangeOnSources}
                    handleChangeOnType={this.handleChangeOnType}
                    handleChangeOnFavorite={this.handleChangeOnFavorite}
                    handleClose={this.props.handleClose}
                    handleSubmit={this.handleSubmit}
                    showModal={this.props.showModal}
                    word={this.state.word}
                    meaning={this.state.meaning}
                    pronunciation={this.state.pronunciation}
                    sentences={this.state.sentence}
                    sources={this.source}
                    type={this.state.type}
                    favorite={this.state.favorite}
                    title="Add a Word"
                >

                </Modal>
                <Snackbar transitionDuration={1000} open={this.state.openSnackbar} autoHideDuration={8000} onClose={this.handleCloseSnackbar}>
                    <Alert onClose={this.handleCloseSnackbar} severity={this.state.snackBarSeverity}>
                        {this.state.snackbarTitle}
                    </Alert>
                </Snackbar>
            </>
        )
    }
}


export default connect()(AddWord)
