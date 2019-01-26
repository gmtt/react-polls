import * as React from "react";
import {Doughnut} from "react-chartjs-2";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {List, ListItem} from "@material-ui/core";
import {getSummary} from "../PollView/action";

class ResultList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null
        };
        this.props.getSummary();
    }

    componentDidMount() {
        let timer = setInterval(this.props.getSummary, 1000);
        this.setState({timer})
    }

    render() {
        let summary = {};
        for (let info of this.props.summary) {
            summary[info._id] = info.count
        }

        let listItems = [];
        let key = 0;
        for (let entity of this.props.entities) {
            let num = [];
            for (let label of entity) {
                if (summary.hasOwnProperty(label)) {
                    num.push(summary[label])
                } else {
                    num.push(0)
                }
            }
            let data = {
                datasets: [{
                    data: num,
                    backgroundColor: ['red', 'yellow', 'blue', 'green']
                }],
                labels: entity
            };
            listItems.push(
                <ListItem key={key++}>
                    <Doughnut data={data}/>
                </ListItem>
            )
        }


        return (
            <List component='nav'>
                {listItems}
            </List>
        )
    }
}

ResultList.propTypes = {
    getSummary: PropTypes.func.isRequired,
    entities: PropTypes.arrayOf(PropTypes.array),
    summary: PropTypes.array,
};

const mapStateToProps = (state) => ({
    summary: state.polls.summary,
    entities: state.polls.entities
});

const mapDispatchToProps = (dispatch) => ({
    getSummary: () => getSummary()(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ResultList
);