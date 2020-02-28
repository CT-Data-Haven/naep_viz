import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { makeTitle } from './utils.js';

import '../styles/Controls.css';

const Controls = (props) => {
  const { register } = useFormContext();
  const variables = Object.keys(props.variables);

  return (
    <div className='Controls'>
      <Form>
        <Row>
          <Col sm={ 6 } lg={ 2 }>
            <Form.Group controlId='_subject'>
              <Form.Label>Subject</Form.Label>
              <Form.Control as='select' name='_subject' className='custom-select' ref={ register } onChange={ props.onChange }>{
                props.subjects.map((d, i) => (
                  <option key={ `${ d }-select` } value={ d }>{ makeTitle(d) }</option>
                ))
              }</Form.Control>
            </Form.Group>
          </Col>

          <Col sm={ 6 } lg={ 2 }>
            <Form.Group controlId='_grade'>
              <Form.Label>Grade</Form.Label>
              <Form.Control as='select' name='_grade' className='custom-select' ref={ register } onChange={ props.onChange }>{
                props.grades.map((d, i) => (
                  <option key={ `${ d }-select` } value={ d }>{ makeTitle(d) }</option>
                ))
              }</Form.Control>
            </Form.Group>
          </Col>

          <Col sm={ 6 } lg={ 3 }>
            <Form.Group controlId='_variable'>
              <Form.Label>Compare students by</Form.Label>
              <Form.Control as='select' name='_variable' className='custom-select' ref={ register } onChange={ props.onChange }>{
                variables.map((d, i) => (
                  <option key={ `${ d }-select` } value={ d }>{ makeTitle(d) }</option>
                ))
              }</Form.Control>
            </Form.Group>
          </Col>

          <Col sm={ 6 } lg={ 5 }>
            <Form.Group controlId='_comparison'>
              <Form.Label>Student groups</Form.Label>
              <Form.Control as='select' name='_comparison' className='custom-select' ref={ register } onChange={ props.onChange }>{
                props.comparisons.map((d, i) => (
                  <option key={ `${ d.compare }-select` } value={ d.compare }>{ d.displayCompare }</option>
                ))
              }</Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  )
};

export default Controls;
