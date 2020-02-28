import React from 'react';
import { ResponsiveOrdinalFrame } from 'semiotic';
import { getExtent, sortByLoc } from './utils.js';

import '../styles/Chart.css';

const Chart = (props) => {
  return (
    <div className='Chart'>
      <ResponsiveOrdinalFrame
        data={ sortByLoc(props.data) }
        size={ [800, 150] }
        type={{
          type: 'point',
          r: 14
        }}
        rExtent={ getExtent(props.data, 'gap') }
        oAccessor='none'
        rAccessor='gap'
        oLabel={ false }
        responsiveWidth={ true }
        projection='horizontal'
        axes={ [{
          orient: 'bottom',
          label: 'Gap in passing rates',
          baseline: 'under',
          ticks: 5,
          // tickFormat: fmt
        }] }
        margin={{ top: 20, right: 5, bottom: 60, left: 5 }}
        style={ (d) => ({
          fill: props.colorscale(d.jurisdiction),
          stroke: 'white',
          strokeWidth: '0.5px',
          // opacity: 0.6
        }) }
        pieceHoverAnnotation={ [{
          type: 'highlight',
          // style: (d) => ({
          //   opacity: 1.0,
          //   stroke: '#666',
          //   strokeWidth: '2px'
          // })
        }, {
          type: 'frame-hover'
        }] }
        tooltipContent={ (d) => (
          <div className='tooltip-content'>{`${ props.abbr }: ${ Math.round(d.gap) }`}</div>
        ) }
        customHoverBehavior={ props.onHover }
        pieceIDAccessor='jurisdiction'
        baseMarkProps={{
          transitionDuration: { fill: 200 }
        }}
        svgAnnotationRules={ hoverDot }
      />
    </div>
  );
};

const hoverDot = ({ d, rScale }) => {
  if (d.type === 'highlight') {
    const { x, y } = d;
    const missing = isNaN(x) || isNaN(y);
    // const coords = missing ? [0, 0] : screenCoordinates;
    if (missing) {
      return null;
    } else {
      return (
        <g >
          <circle
            className='hover'
            cx={ !missing && x }
            cy={ !missing && y }

            r={ 14 }
            opacity={ 1.0 }
            stroke={ '#666' }
            strokeWidth={ '2px' }
            fill={ '#6699CC' }
          />
        </g>
      );
    }
  }
};

export default Chart;
