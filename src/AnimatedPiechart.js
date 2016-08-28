
import React, { Component } from 'react';
import TransitionableComponent from 'react-transitionable-component';

import * as d3 from 'd3';

class Path extends TransitionableComponent {
    render() {
        return (
            <path d={this.state.d}
                  style={this.props.style}
                  ref="node" />
        );
    }
}

const Arc = (props) => {
    const arc = d3.arc()
                  .innerRadius(props.innerRadius)
                  .outerRadius(props.outerRadius);

    return (
        <Path d={arc(props.data)}
              style={{fill: props.color}}
              easing="cubicInOut"
              duration={300} />
    );
}

const AnimatedPiechart = ({ x, y, r, data }) => {
    let pie = d3.pie()
                .value((d) => d.value)(data)
                .sort((a, b) => d3.ascending(a.data.i, b.data.i)),
        translate = `translate(${x}, ${y})`,
        colors = d3.scaleOrdinal(d3.schemeCategory10);

    return (
        <g transform={translate}>
            {pie.map((d, i) => (
                <Arc key={`arc-${i}`}
                     data={d}
                     innerRadius="0"
                     outerRadius={r}
                     color={colors(d.data.i)} />
             ))}
        </g>
    );
};

export default AnimatedPiechart;
