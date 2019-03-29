import React from 'react'
import { render } from 'react-dom'
import {
    Router,
    Route,
    Switch
} from 'react-router-dom'
import { createBrowserHistory } from 'history';
import CreatePoll from './components/poll/CreatePoll'
import LinkPoll from './components/poll/LinkPoll'
import VoteApp from './components/vote/VoteApp'
import history from './components/history'

render(
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={CreatePoll} />
            <Route path='/link-poll' component={LinkPoll} />
            <Route path="/vote" component={VoteApp} />
        </Switch>
    </Router>, document.getElementById('information-poll')
)
