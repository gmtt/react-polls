import * as React from "react";
import * as PropTypes from "prop-types";
import {ListItemText} from "@material-ui/core";
import {selected_add} from "./action";
import {connect} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

class PollView extends React.Component {
    render() {
        let entity = this.props.nextEntity;
        let buttons = [];
        for (let index in entity) {
            buttons.push(
                <ListItem key={index}
                          onClick={() => this.props.selected_add(entity[index])}
                          button
                >
                    <ListItemText primary={entity[index]} align='center'/>
                </ListItem>
            )
        }
        return (
            <List component='nav'>
                {buttons}
            </List>
        )
    }
}

PollView.propTypes = {
    nextEntity: PropTypes.array.isRequired,
    selected_add: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    nextEntity: state.polls.nextEntity
});

const mapDispatchToProps = (dispatch) => ({
    selected_add: (selected) => dispatch(selected_add(selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    PollView
);