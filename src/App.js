import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as d3 from 'd3';
import AnimatedPiechart from './AnimatedPiechart';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {data: []};
    }

    componentDidMount() {
        d3.tsv('data.dat')
          .row(({imports, year}) => ({imports: Number(imports),
                                      year: Number(year)}))
          .get((data) => {
              this.setState({data: data,
                             currentIndex: 0});

              this.timer = d3.interval(this.advanceIndex.bind(this),
                                       1000);
          });
    }

    advanceIndex() {
        let currentIndex = this.state.currentIndex;

        if (currentIndex < this.state.data.length-1) {
            this.setState({currentIndex: currentIndex+1});
        }else{
            this.timer.stop();
        }
    }

    render() {
        let pie = null,
            year = null;

        if (this.state.data.length) {
            const yearData = this.state.data[this.state.currentIndex],
                  pieData = [{value: yearData.imports, i: 0},
                             {value: 100-yearData.imports, i: 1}];

            pie = <AnimatedPiechart data={pieData} x="400" y="100" r="100" />;
            year = yearData.year;
        }

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>

                <div className="App-intro">
                    <h1>{year}</h1>
                    <svg width="800" height="600">
                        {pie}
                    </svg>
                </div>
            </div>
        );
    }
}

export default App;
