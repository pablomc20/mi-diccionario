import "./styles/styles.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './pages/Menu';
import EditWord from './features/words/EditWord';
import Vocabulary from './pages/Vocabulary';
import { ThemeProvider } from './features/theme/ThemeContext';
// import './styles/index.css';
import SectionSpeaking from './pages/SectionSpeaking';
import SectionPractice from './pages/SectionPractice';
import SynonymPractice from './pages/SynonymPractice';

const root = ReactDOM.createRoot(document.getElementById("root")); // Usa createRoot
root.render(
  <React.StrictMode>
    <ThemeProvider>
        <Router>
            <Switch>
                <Route exact path="/" component={Menu} />
                <Route path="/vocabulary" component={Vocabulary} />
                <Route path="/word/:id" component={SectionPractice} />
                <Route path="/edit/:id" component={EditWord} />
                <Route path="/recognition" component={SectionSpeaking} />
                <Route path="/synonyms" component={SynonymPractice} />
            </Switch>
        </Router>
    </ThemeProvider>
  </React.StrictMode>
);
