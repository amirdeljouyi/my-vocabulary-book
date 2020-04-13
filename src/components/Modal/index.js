import React from 'react'

import './index.scss'

import { AppBar, Toolbar, List, ListItem, Divider, ListItemText, IconButton, Typography, Dialog, FormControlLabel, FormGroup, Button, TextField, FormControl, Select, InputLabel, Input, MenuItem, Checkbox, Box } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const wordTypes = [
    "Noun",
    "Verb",
    "Adjective",
    "Adverb"
]

const Modal = (props) => {
    return (
        <Dialog fullScreen open={props.showModal} onClose={props.handleClose} TransitionComponent={Transition}>
            <AppBar style={{ position: "relative" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flex: 1, marginLeft: "20px", }} >
                        {props.title}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={props.handleSubmit}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <List>
                <ListItem>
                    <TextField
                        color="primary"
                        autoFocus
                        id="word"
                        label="Word"
                        variant="filled"
                        required
                        fullWidth
                        value={props.word}
                        onChange={props.handleChangeOnWord}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        color="primary"
                        autoFocus
                        id="pronunciation"
                        label="Pronunciation"
                        variant="filled"
                        fullWidth
                        value={props.pronunciation}
                        onChange={props.handleChangeOnPronunciation}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        color="primary"
                        autoFocus
                        id="meaning"
                        label="meaning"
                        variant="filled"
                        required
                        fullWidth
                        value={props.meaning}
                        onChange={props.handleChangeOnMeaning}
                    />
                </ListItem>

                <Divider />
                <ListItem>
                    <TextField
                        color="primary"
                        autoFocus
                        id="Sentences"
                        label="sentence"
                        variant="filled"
                        fullWidth
                        multiline
                        rows="4"
                        value={props.sentences}
                        onChange={props.handleChangeOnSentences}
                    />
                </ListItem>
                <ListItem>
                    <Typography variant="caption" variantMapping="body2">* Split Sentences by Enter</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                    <TextField
                        color="primary"
                        autoFocus
                        id="Sources"
                        label="sources"
                        variant="filled"
                        fullWidth
                        value={props.sources}
                        onChange={props.handleChangeOnSources}
                    />
                    <Box></Box>
                </ListItem>
                <ListItem>
                    <Typography variant="caption" variantMapping="body2">* Split sources by ', '</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                    <FormGroup row>
                        <FormControl style={{ minWidth: '200px' }}>
                            <InputLabel id="word-type-label">Type</InputLabel>
                            <Select
                                labelId="word-type-label"
                                id="word-type"
                                multiple
                                value={props.type}
                                onChange={props.handleChangeOnType}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {wordTypes.map((element) => (
                                    <MenuItem key={element} value={element}>
                                        <Checkbox checked={props.type && props.type.includes(element)} />
                                        <ListItemText primary={element} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControlLabel style={{ margin: '0px' }}
                            control={<Checkbox icon={<FavoriteBorder />} checked={props.favorite} onChange={props.handleChangeOnFavorite} checkedIcon={<Favorite color="primary" />} name="favorite" />}
                            label="Favorite"
                        />
                    </FormGroup>
                </ListItem>
                {props.children}
            </List>
        </Dialog>
    )
}


export default Modal
