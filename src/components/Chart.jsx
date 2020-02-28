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
          fill: props.colorscale(d.jurisdiction, props.location),
          stroke: 'white',
          strokeWidth: '0.5px',
          // opacity: 0.6
        }) }
        pieceHoverAnnotation={ [{
          type: 'highlight',
          style: (d) => ({
            opacity: 1.0,
            stroke: '#666',
            strokeWidth: '2px'
          })
        }, {
          type: 'frame-hover'
        }] }
        tooltipContent={ (d) => (
          <div className='tooltip-content'>{`${ props.abbr }: ${ Math.round(d.gap) }`}</div>
        ) }
        customHoverBehavior={ props.onHover }
        pieceIDAccessor='jurisdiction'
        baseMarkProps={{
          transitionDuration: { fill: 100 }
        }}
      />
    </div>
  );
};

export default Chart;
