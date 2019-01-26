import * as React from "react";
import * as PropTypes from "prop-types";
import {init} from "../PollView/action";
import {connect} from "react-redux";
import {AppBar, Typography} from "@material-ui/core";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.props.init();
    }

    render() {
        return (
            <AppBar>
                <Typography variant='h6' color='inherit'>
                    Polls
                </Typography>
            </AppBar>
        )
    }
}

Header.propTypes = {
    init: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    init: () => init()(dispatch)
});

export default connect(null, mapDispatchToProps)(
    Header
);