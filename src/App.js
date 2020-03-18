import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useForm, FormContext } from 'react-hook-form';
import { getComparisons, getHeadlineData, colorscale, sortMeta } from './components/utils.js';

import Stage from './components/Stage';
import Chart from './components/Chart';
import Controls from './components/Controls';

import './App.css';

import data from './data/naep_data.json';
import meta from './data/naep_meta.json';
import abbrs from './data/state_abbr.json';



const App = () => (
  <Router basename={ process.env.PUBLIC_URL + '/' }>
    <Switch>
      <Route exact path='/' render={ () => <Redirect to='/race' /> } />
      <Route exact path='/race'>
        <View id='race/ethnicity' />
      </Route>
      <Route exact path='/family_income'>
        <View id='family_income' />
      </Route>
    </Switch>
  </Router>
);



const View = ({ id }) => {
  // let { id } = useParams();
  // const id = useLocation().pathname.substring(1);
  const variable_keys = sortMeta(meta.variables, id);

  const formMethods = useForm({
    mode: 'onChange'
  });

  ///////////// inits
  const initValues = {
    subject: meta.subjects[0],
    grade: meta.grades[0],
    variable: variable_keys[0],
    comparison: getComparisons(meta.variables[variable_keys[0]])[0].compare,
    location: 'Connecticut',
    hover: undefined
  };

  ///////////// state
  const [subject, setSubject] = useState(initValues.subject);
  const [grade, setGrade] = useState(initValues.grade);
  const [variable, setVariable] = useState(initValues.variable);
  const [comparison, setComparison] = useState(initValues.comparison);
  const [location, setLocation] = useState(initValues.location);
  // const [hover, setHover] = useState(initValues.hover);

  ///////////// events
  const onFormChange = (formData, e) => {
    const { _subject, _grade, _variable, _comparison } = formMethods.getValues();
    setSubject(_subject);
    setGrade(_grade);
    if (e.target.name === '_variable') {
      setComparison(getComparisons(meta.variables[_variable])[0].compare);
    } else {
      setComparison(_comparison);
    }
    setVariable(_variable);
  };

  const onDotHover = (d) => {
    setLocation(d ? d.jurisdiction : initValues.location);
  };

  const topicMeta = meta.variables[variable];

  return (
    <div className='App'>
      <Container>
        <Row>
          <Col className='px-0'>
            <Stage
              meta={ topicMeta[comparison] }
              location={ location }
              data={ getHeadlineData(data[comparison][subject][grade], location) }
              grade={ grade }
              subject={ subject }
            >
              <Chart
                data={ data[comparison][subject][grade] }
                onHover={ onDotHover }
                colorscale={ colorscale }
                location={ location }
                abbr={ abbrs[location] }
              />
              <FormContext { ...formMethods }>
                <Controls
                  onChange={ formMethods.handleSubmit(onFormChange) }
                  variable={ variable }
                  comparisons={ getComparisons(topicMeta) }
                  { ...meta }
                  variables={ variable_keys }
                />
              </FormContext>
            </Stage>
          </Col>
        </Row>

        <Row>
        </Row>
      </Container>
    </div>
  )
};

export default App;
