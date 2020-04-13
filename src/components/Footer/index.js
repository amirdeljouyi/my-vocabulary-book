import React from 'react'
import { connect } from 'react-redux'

import './style.scss'

import _ from "lodash"
import { Box } from '@material-ui/core'



class Footer extends React.Component {

    render() {

        return (
            <footer class="footer">
                <Box p={6} textAlign="center">
                    <span>By Amirhossein Deljouyi</span><br/>
                    <span>@amirdeljouyi</span>
                </Box>
            </footer>
        )
    };
}

export default Footer

