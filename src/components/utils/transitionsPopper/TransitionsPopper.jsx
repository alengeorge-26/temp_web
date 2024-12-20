import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';

export default function TransitionsPopper({text,desc,code}) {
    TransitionsPopper.propTypes = {
        text: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired
    };

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    return (
        <div style={{height:'100%',width:'100%'}} onMouseEnter={handleClick}>
            <Popper id={id} open={open} anchorEl={anchorEl} transition sx={{zIndex:'200'}}>
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Box sx={{border: 'none', background:'#ffbf00',padding:'5px',borderRadius:'5px'}}>
                        <h4>{text}</h4>
                        <p style={{fontSize:'10px'}}>{desc}</p>
                        <p style={{fontSize:'10px'}}>{code}</p>
                    </Box>
                </Fade>
                )}
            </Popper>
        </div>
    );
}