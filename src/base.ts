
/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {
  export class Base {
    public body: d3.Selection<SVGAElement>;
    public header: d3.Selection<SVGAElement>;
    public footer: d3.Selection<SVGAElement>;

    private dimensions: ViewportDimensions;
    private container: d3.Selection<SVGAElement>;

    constructor(container){
      this.container = container;
    }

    public updateDimensions(newDimensions: ViewportDimensions){
      this.dimensions = newDimensions; }

    public draw(){
      this.container.selectAll('*').remove();

      // Main Container Dimensions
      this.container
        .style('padding', this.dimensions.padding)
        .style('height',this.dimensions.height)
        .style('width',this.dimensions.width);

      this.header = this.container.append('div')
        .attr('class', 'header')
        .style('height', Utils.convertToPx(HEADERCONST.height));

      this.body = this.container.append('div')
        .attr('class', 'body')
        .style('height', Utils.convertToPx(this.dimensions.height + 50));

      this.drawHeader();
    }

    private drawHeader() {
      this.header.append('div')
      .attr('class', 'main-title')
      .text(MAIN_TITLE);

      const legends = this.header.append('div')
        .attr('class', 'legends');

      legends.append('span')
        .attr('class', 'legend-text')
        .text('RISK LEVEL:')
        .attr('float', 'left');

      const riskTrend = legends.selectAll('div')
        .data(RISK_TREND)
        .enter()
        .append('div')
        .attr('class', (d) => { return d.value == 'Other' ?  'risk-trend-hidden' : 'risk-trend'; });

      riskTrend.append('span')
        .attr('class', 'legend-icon')
        .append('svg')
        .attr('class', 'svg')
        .append('path')
        .attr('id', (d) => 'trend-' + d.value.toLowerCase().replace(" ", "-"))
        .attr('fill', COLOR.grey)
        .attr('d', (d) => d.svg)
        .attr('transform', (d) => Utils.getTransformValue(d.value.toLowerCase().replace(" ", "-")));

      riskTrend.append('span')
        .attr('class', 'legend-text')
        .text((d) => d.value);
    }
  }
}
