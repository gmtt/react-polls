import React, {Component} from 'react';
import ResultList from "./component/ResultList/ResultList";
import {Paper} from "@material-ui/core";
import Header from "./component/Header/Header";

class App extends Component {
    render() {
        return (
            <Paper>
                <Header/>
                <ResultList/>
            </Paper>
        );
    }
}

export default App;
