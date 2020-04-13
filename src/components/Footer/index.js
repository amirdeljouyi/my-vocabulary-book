import React from 'react'
import { Instagram, Twitter, Github, Linkedin } from 'grommet-icons';
import './style.scss'
import { Box, Link } from '@material-ui/core'



class Footer extends React.Component {

    render() {

        return (
            <footer class="footer">
                <Box p={6} textAlign="center">
                    <span>By Amirhossein Deljouyi</span><br/>
                    <span>@amirdeljouyi</span><br/><br/>
                    <Link href="https://www.instagram.com/amir.deljouyi/">
                        <Instagram color="white" size="medium"/>
                    </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link href="https://twitter.com/amirdeljouyi">
                        <Twitter color="white" size="medium"/>
                    </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link href="https://github.com/amirdeljouyi">
                        <Github color="white" size="medium"/>
                    </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link href="https://www.linkedin.com/in/amir-deljouyi-3b929661/">
                        <Linkedin color="white" size="medium"/>
                    </Link>
                </Box>
            </footer>
        )
    };
}

export default Footer

