/*
 *  Power BI Visual CLI
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
  export class RowsGenerator {
    private grouping: Grouping;
    private riskHeaders: string[];
    private scrollTopPosition: number = 0;
    private dimensions: ViewportDimensions;
    private body: d3.Selection<SVGAElement>;
    private col0: d3.Selection<SVGAElement>;
    private col1: d3.Selection<SVGAElement>;
    private col2: d3.Selection<SVGAElement>;
    //private col23:d3.Selection<SVGAElement>;
    private col3: d3.Selection<SVGAElement>;
    private tooltipGenerator: TooltipGenerator;
    private col0Header: d3.Selection<SVGAElement>;
    private col1Header: d3.Selection<SVGAElement>;
    private col2Header: d3.Selection<SVGAElement>;
    private col3Header: d3.Selection<SVGAElement>;
    private tableWrapper: d3.Selection<SVGAElement>;
    private fiscalYearHeaders: d3.Selection<SVGAElement>;
    private maxScrollLeft: number;
    private extraWidth : number;

    constructor(body: d3.Selection<SVGAElement>){
      this.body = body;

      this.tableWrapper = this.body.append('div')
      .attr('class', 'table-wrapper');
      this.tooltipGenerator = new TooltipGenerator(this.body);
    }

    public updateDimensions(vpd: ViewportDimensions) {
      this.dimensions = vpd;
    }

    public draw(ermdata: ERMDataPoints[]) {
      this.grouping = new Grouping(ermdata);
      this.riskHeaders = getRiskHeaders(ermdata);
      const riskTitleGroup = this.grouping.groupByRiskTitle(ermdata);

      this.tableWrapper
      .style('width', Utils.convertToPx(this.dimensions.width))
      .style('height', Utils.convertToPx(this.dimensions.height - HEADERCONST.height - 70));
      this.drawTableHeader();

      this.col0 = this.tableWrapper.append('div')
      .attr('class', 'outer')
      .style('width',Utils.convertToPx(COLUMNSCONST.col0Width))
      .append('div')
      .attr('class', 'col-0')
      .style('width',Utils.convertToPx(COLUMNSCONST.col0Width+15));

      this.col1 = this.tableWrapper.append('div')
      .attr('class', 'outer')
      .style('width',Utils.convertToPx(COLUMNSCONST.col1Width))
      .append('div')
      .attr('class', 'col-1')
      .style('width',Utils.convertToPx(COLUMNSCONST.col1Width+4));

      this.col2 = this.tableWrapper.append('div')
      .attr('class', 'outer')
      .style('width',Utils.convertToPx(this.dimensions.width - COLUMNSCONST.col3Width - COLUMNSCONST.col1Width - 5 - this.extraWidth))
      .append('div')
      .attr('class', 'col-2')
      .style('width',Utils.convertToPx(this.dimensions.width - COLUMNSCONST.col3Width - COLUMNSCONST.col1Width - 5 + 7 - this.extraWidth));
      
     /* this.col23 = this.tableWrapper.append('div')
      .attr('class', 'outer')
      .style('width',Utils.convertToPx(COLUMNSCONST.col23Width))
      .append('div')
      .attr('class', 'col-23')
      .style('width',Utils.convertToPx(COLUMNSCONST.col23Width + 15));
*/
      this.col3 = this.tableWrapper.append('div')
      .attr('class', 'col-3')
      .style('width',Utils.convertToPx(COLUMNSCONST.col3Width))
      .style('text-align','left');

      let index = 0;
      for( const key in riskTitleGroup) {
        if(riskTitleGroup.hasOwnProperty(key)) {
          const data = riskTitleGroup[key];
          const color = index % 2 === 0 ? '#ffffff' : '#F7F7F7';
          index++;
         
          var currentTrendDrivers = data[data.length - 1].trendDriversUpdate ;
          var managementActions = data[data.length -1].managementActions;

          if(currentTrendDrivers === 'null'){var currentTrendDrivers = ""}

          if(currentTrendDrivers.substring(0,1) !== "*"){var currentTrendDrivers ="\u2022&nbsp;&nbsp;".concat(currentTrendDrivers)}
          if(managementActions.substring(0,1) !== "*"){var managementActions ="\u2022&nbsp;&nbsp;".concat(managementActions)}

          let extraDriverCount = currentTrendDrivers//.replace("*****","xxxxxx").replace("*****","xxxxxx").replace("*****","xxxxxx").replace("*****","xxxxxx").replace("*****","xxxxxx")
          .replace("****","xxxxx") .replace("****","xxxxx") .replace("****","xxxxx") .replace("****","xxxxx") .replace("****","xxxxx")
          .replace("***","xxxx").replace("***","xxxx").replace("***","xxxx").replace("***","xxxx").replace("***","xxxx").replace("***","xxxx")
          .replace("**","xxx").replace("**","xxx").replace("**","xxx").replace("**","xxx").replace("**","xxx").replace("**","xxx")
          .replace("*","xx").replace("*","xx").replace("*","xx").replace("*","xx").replace("*","xx").replace("*","xx").replace("*","xx").replace("*","xx").replace("*","xx").replace("*","xx");
          var returnDriverCount = '';
          if(extraDriverCount.length - currentTrendDrivers.length ==5){returnDriverCount = '<br><br><br><br><br><br>'}else if(extraDriverCount.length - currentTrendDrivers.length ==4){returnDriverCount = '<br><br><br><br><br>'}else if(extraDriverCount.length - currentTrendDrivers.length ==3){returnDriverCount = '<br><br><br><br>'}else if(extraDriverCount.length - currentTrendDrivers.length==2){returnDriverCount = '<br><br><br>'}else if (extraDriverCount.length - currentTrendDrivers.length ==1){returnDriverCount = '<br><br>'}else{returnDriverCount = '<br><br>'}
          let extraActionCount = managementActions//.replace("*****","yyyyyy").replace("*****","yyyyyy").replace("*****","yyyyyy").replace("*****","yyyyyy").replace("*****","yyyyyy").replace("*****","yyyyyy")
          .replace("****","yyyyy").replace("****","yyyyy").replace("****","yyyyy").replace("****","yyyyy").replace("****","yyyyy").replace("****","yyyyy")
          .replace("***","yyyy").replace("***","yyyy").replace("***","yyyy").replace("***","yyyy").replace("***","yyyy").replace("***","yyyy")
          .replace("**","yyy").replace("**","yyy").replace("**","yyy").replace("**","yyy").replace("**","yyy").replace("**","yyy")
          .replace("*","yy").replace("*","yy").replace("*","yy").replace("*","yy").replace("*","yy").replace("*","yy").replace("*","yy").replace("*","yy").replace("*","yy").replace("*","yy");
          var returnActionCount = '';
          if(extraActionCount.length - managementActions.length ==7){returnActionCount = '<br><br><br><br><br><br><br>'}else if(extraActionCount.length - managementActions.length ==6){returnActionCount = '<br><br><br><br><br><br>'}else if(extraActionCount.length - managementActions.length ==5){returnActionCount = '<br><br><br><br><br>'}else if(extraActionCount.length - managementActions.length ==4){returnActionCount = '<br><br><br><br>'}else if(extraActionCount.length - managementActions.length ==3){returnActionCount = '<br><br><br>'}else if(extraActionCount.length - managementActions.length==2){returnActionCount = '<br><br>'}else if(extraActionCount.length - managementActions.length ==1){returnActionCount = '<br>'}
          var driveractioncount = (extraActionCount.length - managementActions.length)+(extraDriverCount.length - currentTrendDrivers.length)+1;
         //var newHeight = 100;
          var newHeight = 15*driveractioncount+60;

         /* if(driveractioncount >3){newHeight = 125};
          if(driveractioncount >4){newHeight = 130};
          if(driveractioncount >5){newHeight = 155};
          if(driveractioncount >6){newHeight = 160};
          if(driveractioncount >7){newHeight = 194};
          if(driveractioncount >8){newHeight = 195};
          if(driveractioncount >9){newHeight = 225};
          if(driveractioncount >11){newHeight = 245};
          if(driveractioncount >14){newHeight = 319};
          if(driveractioncount >15){newHeight = 356};
          if(driveractioncount >16){newHeight = 356};
          if(driveractioncount >17){newHeight = 356};
          if(driveractioncount >18){newHeight = 356};
          if(driveractioncount >19){newHeight = 361};
          if(driveractioncount >20){newHeight = 378};     */
          ;
         const col0Row = this.col0.append('div')        
         .style('font-weight','bold')
          .attr('class', 'rows table-content')
          .style('padding-top', Utils.convertToPx(COLUMNSCONST.padding))
          .style('padding-bottom', Utils.convertToPx(COLUMNSCONST.padding ))
          .style('height', Utils.convertToPx(newHeight+16))
          .style('background-color', color);

       
        col0Row.append('li')

        .html(data[0].riskCategory)
        .style('text-align','left')
        .style('margin-left', Utils.convertToPx(2))
        .attr('class', 'risk-category');
          
          
          const col1Row = this.col1.append('div')
            .attr('class', 'rows table-content')
            .style('padding-top', Utils.convertToPx(COLUMNSCONST.padding))
            .style('padding-bottom', Utils.convertToPx(COLUMNSCONST.padding))
            .style('height', Utils.convertToPx(newHeight+16))
            .style('text-align', 'left')    
            .style('background-color', color);

         
          col1Row.append('li')             
          .style('font-weight','bold')
          .html(data[0].hierLevel.toString()
            .replace("4","&nbsp;&nbsp;&nbsp;")
            .replace("3","&nbsp;&nbsp;")
            .replace("2","&nbsp;")
            .replace("1","")
            
            .concat(data[0].riskTitle))

            .style('margin-left', Utils.convertToPx(5))
            .attr('class', 'risk-title');


          const col2Row = this.col2.append('div')
            .attr('class', 'rows table-content')
            .style('padding-top', Utils.convertToPx(COLUMNSCONST.padding))
            .style('padding-bottom', Utils.convertToPx(COLUMNSCONST.padding))
            .style('height', Utils.convertToPx(newHeight+16))
            .style('background-color', color);

          const currentHeaders = getRiskHeaders(data);
          let riskTrendData = data;
         

          if (currentHeaders.length !== this.riskHeaders.length) {
            const headerObj = [];
            const totalRiskHeaders = this.riskHeaders;
            for(const i in totalRiskHeaders) {
              if(totalRiskHeaders[i]){
                let head = {
                  riskHeader: totalRiskHeaders[i],
                  riskTrend: ''
                };
                for (const j in data) {
                  if(data[j].riskHeader === totalRiskHeaders[i]) {
                    head = data[j];
                  }
                }
                headerObj.push(head);
              }
            }
            riskTrendData = headerObj;
          }

          const col2RowData = col2Row.selectAll('span').data(riskTrendData).enter()
            .append('span')
            .style('width', Utils.convertToPx(COLUMNSCONST.spanWidth));

          col2RowData.append('span')
            .attr('class', 'legend-icon')
            .append('svg')
            .attr('class', 'svg')
            .append('path')
            .on("mouseover", (d, i) => this.handleMouseOver(d, i))
            .on("mouseout",  (d,i) => this.handleMouseOut(d, i))
            .attr('id', (d) => {
              if (!d.riskTrend) {
                return '';
              }
              return ICON_SVGS[d.riskTrend] ? 'trend-' + d.riskTrend : 'trend-other';
            })
            .attr('fill', COLOR.black)
            .attr('d', (d) => {
              if (!d.riskTrend) {
                return '';
              }
              return ICON_SVGS[d.riskTrend] ? ICON_SVGS[d.riskTrend] : ICON_SVGS['Other'];
            })
            .attr('transform', (d) => {
              if (!d.riskTrend) {
                return '';
              }

              let value = ICON_SVGS[d.riskTrend] ? d.riskTrend : 'Other' ;
              value = Utils.slugify(value);
              return Utils.getTransformValue(value);
            });

   
          const col3Row = this.col3.append('div')
            .attr('class', 'rows table-content current-trend-drivers')
            .style('padding-top', Utils.convertToPx(COLUMNSCONST.padding))
            .style('padding-bottom', Utils.convertToPx(COLUMNSCONST.padding))
            .style('height', Utils.convertToPx(newHeight+16))
            .style('padding-right',Utils.convertToPx(0))
            .style('background-color', color);


          col3Row.append('li')
            .attr("class", "drivers")
            .style('text-align','left')
           .style('font-weight','bold')
           .html("Drivers:")
           .append("li")
           .style('font-weight','normal')
            .html((Utils.convertLineBreaktoList(currentTrendDrivers
             // .replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
              .replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
              .replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
              .replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
              .replace("*","\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;")

              , COLUMNSCONST.col3Width - 60)
              .concat('<br>')))
              .append("li")
              .style('font-weight','bold')
              .html("Management Actions:")
              .append("li")
              .style('font-weight','normal')
              .html((Utils.convertLineBreaktoList(managementActions
                //.replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
                .replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
                .replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
                .replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
                .replace("*","\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;")
                , COLUMNSCONST.col3Width - 60)
                ))
                ;
            }
      }
      this.maxScrollLeft = (<any>this.col2.node()).scrollWidth - (<any>this.col2.node()).clientWidth;
      this.fiscalYearHeaders.style('margin-left', Utils.convertToPx(-this.maxScrollLeft));
      this.col2.property('scrollLeft', this.maxScrollLeft);
      this.addEventListener();
    }

    private addEventListener() {


      this.col0.on('mouseover',() => this.col0.on('scroll', () => {
        const sp = this.col0.property('scrollTop') ;
        this.col1.property('scrollTop', sp);
        this.col2.property('scrollTop', sp);
       // this.col23.property('scrollTop', sp);
        this.col3.property('scrollTop', sp); 
        this.scrollTopPosition = sp;
      })).on('mouseout', () => this.col0.on('scroll', null));

      this.col1.on('mouseover',() => this.col1.on('scroll', () => {
        const sp = this.col1.property('scrollTop') ;
        this.col2.property('scrollTop', sp);
       // this.col23.property('scrollTop', sp);
        this.col0.property('scrollTop', sp);
        this.col3.property('scrollTop', sp); 
        this.scrollTopPosition = sp;
      })).on('mouseout', () => this.col1.on('scroll', null));

      this.col2.on('mouseover',() => this.col2.on('scroll', () => {
        // this.col3.on('scroll', null)
        let sp = this.col2.property('scrollTop');
        const spLeft = this.col2.property('scrollLeft');
        this.col1.property('scrollTop', sp);
        this.col0.property('scrollTop', sp);
        this.col3.property('scrollTop', sp);
        sp = this.col3.property('scrollTop');
        this.col2.property('scrollTop', sp);
     //   this.col23.property('scrollTop', sp);
        this.scrollTopPosition = sp;        
        this.fiscalYearHeaders.style('margin-left', Utils.convertToPx(-spLeft));
      })).on('mouseout', () => this.col2.on('scroll', null));


      this.col2.on("wheel.zoom", (d,i) => {
        const element = document.elementFromPoint((<any>d3.event).pageX, (<any>d3.event).pageY);
        if(element.nodeName === "path") {
          this.tooltipGenerator.draw(element, d3.select(element).datum(), this.scrollTopPosition, 0);
        } else {
          this.tooltipGenerator.remove();
        }
      });

     /* this.col23.on('mouseover',() => this.col23.on('scroll', () => {
        const sp = this.col23.property('scrollTop') ;
        this.col1.property('scrollTop', sp);
        this.col2.property('scrollTop', sp);
        this.col0.property('scrollTop', sp);
        this.col3.property('scrollTop', sp); 
        this.scrollTopPosition = sp;
      })).on('mouseout', () => this.col23.on('scroll', null));
*/
     
      this.col3.on('mouseover',() => this.col3.on('scroll', () => {
        const sp = this.col3.property('scrollTop') ;
        this.col1.property('scrollTop', sp);
        this.col0.property('scrollTop', sp);
        this.col2.property('scrollTop', sp);
        //this.col23.property('scrollTop', sp);
        this.scrollTopPosition = sp;
      })).on('mouseout', () => this.col3.on('scroll', null));
    }

    private drawTableHeader() {
      const tableHeader = this.tableWrapper.append('div')
        .style('height', Utils.convertToPx(COLUMNSCONST.tableHeaderHeight))
        .attr('class', 'table-header');

      this.col0Header = tableHeader.append('div')
        .attr('class', 'col-header left-align')
        .style('width', Utils.convertToPx(COLUMNSCONST.col0Width-1))
        .style('height', Utils.convertToPx(COLUMNSCONST.tableHeaderHeight))
        .append('span')
        .text('CATEGORY');

      this.col1Header = tableHeader.append('div')
        .attr('class', 'col-header left-align')
       // .style('text-align','center')
        .style('width', Utils.convertToPx(COLUMNSCONST.col1Width -2))
        .style('height', Utils.convertToPx(COLUMNSCONST.tableHeaderHeight))
        .append('span')
        .text('RISK TITLE');

      this.col2Header = tableHeader.append('div')
        .attr('class', 'col-header col2-header ')
        .style('width', Utils.convertToPx(COLUMNSCONST.col2Width-126))
        .style('height', Utils.convertToPx(COLUMNSCONST.tableHeaderHeight))
       .style('padding-left',Utils.convertToPx(1))

      this.extraWidth = Math.max((this.dimensions.width - COLUMNSCONST.col3Width - COLUMNSCONST.col1Width - 5) - (this.riskHeaders.length * COLUMNSCONST.spanWidth), 0);

      this.fiscalYearHeaders = this.col2Header.append('div')
        .style('width', Utils.convertToPx(this.riskHeaders.length * COLUMNSCONST.spanWidth))
        .style('height', COLUMNSCONST.tableHeaderHeight);

      this.fiscalYearHeaders.selectAll('span').data(this.riskHeaders).enter()
        .append('span')
        .style('width', Utils.convertToPx(COLUMNSCONST.spanWidth))
        .text((d) =>  d);

      this.col3Header = tableHeader.append('div')
        .attr('class', 'col-header left-align')
        .style('width', Utils.convertToPx(COLUMNSCONST.col3Width))
        .style('height', Utils.convertToPx(COLUMNSCONST.tableHeaderHeight))
        .append('span')
        .text('DRIVERS AND MANAGEMENT ACTIONS');
    }

    private handleMouseOver(d, i) {
      this.tooltipGenerator.draw((<any>d3.event).target, d, this.scrollTopPosition, 0);
    }

    private handleMouseOut(d, i) {
      this.tooltipGenerator.remove();
    }
  }
}
