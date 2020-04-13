import React from 'react'
import { connect } from 'react-redux'
import { FormGroup, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, ListItem, Divider, Snackbar, InputAdornment, Grid, Card, CardContent, Typography, CardActions, Button, TextField, Box } from '@material-ui/core';
import { FormSearch, Sort, List, Catalog, Favorite } from 'grommet-icons';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import ToggleButton from '@material-ui/lab/ToggleButton';
import firebase from '../firebase.js';
import './style.scss'

import _ from "lodash"
import Modal from '../Modal';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// _.uniq(_.map(data, 'usernames'))



class mainpage extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            showItems: [],
            sources: [],
            eID: '',
            eWord: '',
            eMeaning: '',
            ePronunciation: '',
            eType: ['Noun'],
            eSentences: [''],
            eSentence: '',
            eSources: [''],
            eSource: '',
            eFavorite: false,
            eOpenSnackbar: false,
            eSnackBarSeverity: '',
            eSnackbarTitle: '',
            showModal: false,
            fSortValue: 'default',
            fNoun: true,
            fVerb: true,
            fAdjective: true,
            fAdverb: true,
            fFavorite: true,
            fNonFavorite: true,
            fSources: [],
            fSearch: ''
        }
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    word: items[item].word,
                    meaning: items[item].meaning,
                    type: items[item].type,
                    pronunciation: items[item].pronunciation,
                    sentences: items[item].sentences ? items[item].sentences : [],
                    favorite: items[item].favorite,
                    sources: items[item].sources,
                });
            }
            this.setState({
                items: newState,
                showItems: newState,
                sources: _.uniq(_.flatMap(items, 'sources')).map(el => { return ({ value: true, name: el }) })
            });
        });
    }

    handleChangeOnWord = (event) => {
        this.setState({ eWord: event.target.value })
    };
    handleChangeOnMeaning = (event) => {
        this.setState({ eMeaning: event.target.value })
    };
    handleChangeOnPronunciation = (event) => {
        this.setState({ ePronunciation: event.target.value })
    };
    handleChangeOnSentences = (event) => {
        let senteces = event.target.value.split("\n");
        this.setState({ eSentences: senteces, eSentence: event.target.value })
    };
    handleChangeOnSources = (event) => {
        let sources = event.target.value.split(", ");
        this.setState({ eSources: sources, eSource: event.target.value })
    };
    handleChangeOnType = (event) => {
        this.setState({ eType: event.target.value })
    };
    handleChangeOnFavorite = (event) => {
        this.setState({ eFavorite: event.target.checked });
    };
    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ eOpenSnackbar: false });
    };


    handleSubmit = (e) => {
        e.preventDefault();
        const itemRef = firebase.database().ref(`/items/${this.state.eID}`);
        const item = {
            id: this.state.eID,
            word: this.state.eWord,
            meaning: this.state.eMeaning,
            pronunciation: this.state.ePronunciation,
            senteces: this.state.eSentences,
            sources: this.state.eSources,
            type: this.state.eType,
            favorite: this.state.eFavorite
        }
        itemRef.update(item);
        this.handleClose();
        this.setState({
            snackbarTitle: this.state.eWord + ' updated successfully'
        })
        this.setState({
            eID: '',
            eWord: '',
            eSenteces: [],
            eSentence: '',
            eSources: [],
            eSource: '',
            ePronunciation: '',
            eType: [''],
            eFavorite: false,
            eOpenSnackbar: true,
            eSnackBarSeverity: 'info'
        });
    }

    removeItem = () => {
        const itemRef = firebase.database().ref(`/items/${this.state.eID}`);
        itemRef.remove();
        this.handleClose();
        this.setState({
            snackbarTitle: this.state.eWord + ' deleted successfully'
        })
        this.setState({
            eID: '',
            eWord: '',
            eSenteces: [],
            eSentence: '',
            eSources: [],
            eSource: '',
            ePronunciation: '',
            eType: [''],
            eFavorite: false,
            eOpenSnackbar: true,
            eSnackBarSeverity: 'info'
        });
    }

    handleClose = () => {
        this.setState({
            eID: '',
            eWord: '',
            eMeaning: '',
            ePronunciation: '',
            eSentence: '',
            eSource: '',
            eType: ['Noun'],
            eFavorite: false,
            showModal: false,
        });
    };

    clickOnEdit(id, word, meaning, pronunciation, sentences, sources, type, favorite) {
        this.setState({
            eID: id,
            eWord: word,
            eMeaning: meaning,
            ePronunciation: pronunciation,
            eSentence: sentences.join('\n'),
            eSource: sources.join(', '),
            eType: type,
            eFavorite: favorite,
            showModal: true,
        });
    }

    handleFSort = (event) => {
        this.setState({
            fSortValue: event.target.value
        }, this.sort(event.target.value));
    }

    sort = (value) => {
        if (value === "default") {
            this.setState({
                showItems: _.sortBy(this.state.showItems, 'id')
            });
        } else {
            this.setState({
                showItems: _.sortBy(this.state.showItems, 'word')
            })
        }
    }

    someArrayItemInArray = (fArray, sArray) => {
        for (const element of sArray) {
            if (_.includes(fArray, element)) {
                return true
            }
        }
        return false
    }

    handleFilter = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked },
            () => {
                this.filter();
            });
    }

    filter = () => {
        let filterFavorite = []
        let filterType = []
        let filterSources = []
        if (this.state.fFavorite) {
            filterFavorite.push(true);
        }
        if (this.state.fNonFavorite) {
            filterFavorite.push(false);
        }
        if (this.state.fNoun) {
            filterType.push("Noun");
        }
        if (this.state.fVerb) {
            filterType.push("Verb");
        }
        if (this.state.fAdverb) {
            filterType.push("Adverb");
        }
        if (this.state.fAdjective) {
            filterType.push("Adjective");
        }
        for (const element of this.state.sources) {
            if (element.value) {
                filterSources.push(element.name)
            }
        }

        this.setState({
            showItems: _.filter(this.state.items, (i) => {
                return _.includes(i.word.toLowerCase(), this.state.fSearch.toLowerCase()) && _.includes(filterFavorite, i.favorite) && this.someArrayItemInArray(filterType, i.type) && this.someArrayItemInArray(filterSources, i.sources);
            })
        }, () => this.sort(this.state.fSortValue));
    }

    handleSources = (item) => {
        let sources = this.state.sources;
        item.value = !item.value;
        const index = sources.findIndex((el) => el.name === item.name);
        sources[index] = item;
        this.setState({ sources: sources },
            () => {
                this.filter();
            });
    }

    handleSearch = (event) => {
        this.setState({ fSearch: event.target.value },
            () => {
                this.filter();
            });
    }

    filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.word
    });

    render() {

        return (
            <div>
                <Box display="flex" flexGrow={1} m={2} p={4} spacing={3} >
                    <Autocomplete className="wdt-fl" flexGrow={1}
                        id="autocomplete"
                        options={this.state.items.map((option) => {
                            const firstLetter = option.word[0].toUpperCase();
                            return {
                                firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                                ...option,
                            };
                        }).sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                        getOptionLabel={(option) => {
                            // e.g value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return option;
                            }
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            return option.word;
                        }}

                        groupBy={(option) => option.firstLetter}
                        renderOption={(option) => option.word}
                        renderInput={(params) => (

                            <TextField className="search fill-primary" value={this.state.fSearch} onChange={this.handleSearch} {...params} variant="filled" backgroundColor="primary" label="Search" type="search" fullWidth
                            // InputProps={{
                            //     startAdornment: (
                            //         <InputAdornment position="start">
                            //             <FormSearch color="#fff" />
                            //         </InputAdornment>
                            //     ),
                            // }}
                            />
                        )}
                    />
                    <Modal />
                </Box>
                <Box display="flex" className="secondary-box" flexGrow={1} p={4} spacing={3} >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" className="filter-header link-sec" style={{ marginBottom: '10px' }}>
                                    <Sort className="mid" />
                                    <span className="mid">&nbsp; Sort By</span>
                                </FormLabel>
                                <RadioGroup aria-label="sort" name="sort" value={this.state.fSortValue} onChange={this.handleFSort} >
                                    <FormControlLabel value="default" control={<Radio />} label="Default" />
                                    <FormControlLabel value="alphabetic" control={<Radio />} label="Alphabetic" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" className="filter-header link-sec" style={{ marginBottom: '10px' }}>
                                    <List className="mid" />
                                    <span className="mid">&nbsp; Type</span>
                                </FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.fNoun} name="fNoun" onChange={this.handleFilter} />}
                                        label="Noun"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.fVerb} name="fVerb" onChange={this.handleFilter} />}
                                        label="Verb"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.fAdjective} name="fAdjective" onChange={this.handleFilter} />}
                                        label="Adjective"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.fAdverb} name="fAdverb" onChange={this.handleFilter} />}
                                        label="Adverb"
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" className="filter-header link-sec" style={{ marginBottom: '10px' }}>
                                    <Catalog className="mid" />
                                    <span className="mid">&nbsp; Sources</span>
                                </FormLabel>
                                <Box>
                                    {this.state.sources.map((item) => {
                                        return (
                                            <ToggleButton className="toggle" selected={item.value} onChange={() => { this.handleSources(item) }} value={item.name} aria-label={item} style={{ margin: '3px' }} sizeSmall size="small">
                                                {item.name}
                                            </ToggleButton>
                                        )
                                    })}
                                </Box>
                            </FormControl>
                            {/* <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedF}
            onChange={handleChange}
            name="checkedF"
            indeterminate
          />
        }
        label="Indeterminate"
      /> */}
                        </Grid>
                        <Grid item xs={12} sm={12} md>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" className="filter-header link-sec" style={{ marginBottom: '10px' }}>
                                    <Favorite className="mid" />
                                    <span className="mid">&nbsp; Favorite</span>
                                </FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.fFavorite} name="fFavorite" onChange={this.handleFilter} />}
                                        label="Favorite"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.fNonFavorite} name="fNonFavorite" onChange={this.handleFilter} />}
                                        label="Non-Favorite"
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <Box display="flex" flexGrow={1} marginTop={2} marginBottom={2} spacing={3} >
                    <Grid container spacing={4}>
                        {this.state.showItems.map((item) => {
                            return (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card key={item.id} className={`${item.favorite ? "card-2" : "card-1"}`} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardContent style={{ flexGrow: 1 }}>
                                            <Typography className="text-2" gutterBottom>
                                                {item.pronunciation}
                                            </Typography>
                                            <Typography variant="h5" component="h2" gutterBottom>
                                                {item.word}
                                            </Typography>

                                            <Typography className="text-2" gutterBottom>
                                                {item.type.join(', ')}
                                            </Typography>

                                            <Typography variant="body2" component="p" gutterBottom>
                                                {item.meaning}
                                            </Typography>
                                            <Box m={2}>
                                                {item.sentences && item.sentences.map((el) => {
                                                    return (
                                                        <Typography variant="caption" component="blockquote">
                                                            {el}
                                                        </Typography>
                                                    )
                                                })}
                                            </Box>
                                            <Typography className="text-2" gutterBottom>
                                                {item.sources.join(', ')}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color={`${item.favorite ? "primary" : "secondary"}`}
                                                onClick={() => { this.clickOnEdit(item.id, item.word, item.meaning, item.pronunciation, item.sentences, item.sources, item.type, item.favorite) }}>
                                                Edit</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
                <Modal
                    handleChangeOnWord={this.handleChangeOnWord}
                    handleChangeOnMeaning={this.handleChangeOnMeaning}
                    handleChangeOnPronunciation={this.handleChangeOnPronunciation}
                    handleChangeOnSentences={this.handleChangeOnSentences}
                    handleChangeOnSources={this.handleChangeOnSources}
                    handleChangeOnType={this.handleChangeOnType}
                    handleChangeOnFavorite={this.handleChangeOnFavorite}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleSubmit}
                    showModal={this.state.showModal}
                    word={this.state.eWord}
                    meaning={this.state.eMeaning}
                    pronunciation={this.state.ePronunciation}
                    sentences={this.state.eSentence}
                    sources={this.state.eSource}
                    type={this.state.eType}
                    favorite={this.state.eFavorite}
                    title="Edit a Word"
                ><Divider />
                    <ListItem>
                        <Button
                            startIcon={<DeleteIcon />}
                            variant="contained"
                            color="secondary"
                            onClick={this.removeItem}>
                            Delete
                    </Button>
                    </ListItem>
                </Modal>
                <Snackbar transitionDuration={1000} open={this.state.openSnackbar} autoHideDuration={8000} onClose={this.handleCloseSnackbar}>
                    <Alert onClose={this.handleCloseSnackbar} severity={this.state.snackBarSeverity}>
                        {this.state.snackbarTitle}
                    </Alert>
                </Snackbar>
            </div >

        )
    };
}

export default connect()(mainpage)
