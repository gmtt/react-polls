import React, {Component} from 'react';
import ResultList from "./component/ResultList/ResultList";
import {Paper} from "@material-ui/core";
import Header from "./component/Header/Header";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {checkUser, upload} from "./component/PollView/action";
import PollView from "./component/PollView/PollView";
import Grid from "@material-ui/core/Grid";

class App extends Component {
    constructor(props) {
        super(props);
        this.props.checkUser(this.props.ip)
    }

    render() {
        let content;
        let {nextIndex, entities, ip, selected, exist} = this.props;
        if (exist || nextIndex > entities.length) {
            if (nextIndex > entities.length) {
                this.props.upload(selected, ip);
            }
            content = <ResultList/>
        } else {
            content = <PollView/>
        }
        return (
            <Grid container alignItems='center' justify='center'>
                <Grid item lg={4} sm={8} xs={12}>
                    <Paper>
                        <Header/>
                        {content}
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

App.propTypes = {
    ip: PropTypes.string.isRequired,
    checkUser: PropTypes.func.isRequired,
    exist: PropTypes.bool.isRequired,
    selected: PropTypes.array,
    entities: PropTypes.arrayOf(PropTypes.array),
    nextIndex: PropTypes.number,
    upload: PropTypes.func,
};


const mapStateToProps = (state) => ({
    ip: state.polls.ip,
    exist: state.polls.exist,
    selected: state.polls.selected,
    entities: state.polls.entities,
    nextIndex: state.polls.nextIndex
});

const mapDispatchToProps = (dispatch) => ({
    checkUser: (ip) => checkUser(ip)(dispatch),
    upload: (selected, ip) => upload(selected, ip)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    App
);
