import React from 'react';
import { Card } from 'react-bootstrap';
import { compileHeader } from './utils.js';

import '../styles/Stage.css';

const Stage = ({ meta, children, location, ...restProps }) =>  (
  <div className='Stage'>
    <Card variant='light'>
      <Card.Body>
        <Card.Title as='h5'>{ meta && meta.displayCompare }</Card.Title>
        <Card.Subtitle>{ meta && compileHeader(location)({ location, ...meta, ...restProps }) }</Card.Subtitle>
        { children }
      </Card.Body>
      <Card.Footer>
        <p>Source: 2019 National Assessment for Educational Progress overseen by the U.S. Department of Education</p>
        <p>Camille Seaberry, DataHaven</p>
      </Card.Footer>
    </Card>
  </div>
);


export default Stage;
