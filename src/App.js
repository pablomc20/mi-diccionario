import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './pages/Menu';
import EditWord from './features/words/EditWord';
import Vocabulary from './pages/Vocabulary';
import { ThemeProvider } from './features/theme/ThemeContext';
// import './styles/index.css';
import SectionSpeaking from './pages/SectionSpeaking';
import SectionPractice from './pages/SectionPractice';
import SynonymPractice from './pages/SynonymPractice';

function App() {
  return (
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
  );
}

export default App;
