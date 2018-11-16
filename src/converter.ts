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
  /**
   * Converting the row data into group useable format
   *
   * @function converter
   * @param {VisualUpdateOptions} options
   * @param {IVisualHost} host
   * @returns {ERMViewModel}
   */
  export function converter(options: VisualUpdateOptions,
                            host: IVisualHost): ERMViewModel {

    const dataViews = options.dataViews;    
    const categorical = dataViews[0].categorical;
    const categories = categorical.categories;    
    const cosoPillar = categories[0].values;
    const riskTitle = categories[1].values;
    const riskCategory = categories[2].values;
    const sltOwners = categories[3].values;
    const riskOwners = categories[4].values;
    const riskDomain = categories[5].values;
    const fy = categories[6].values;
    const reportingCycle = categories[7].values;  
    const riskScore = categories[8].values;
    const riskTrend = categories[9].values; 
    const trendDriversUpdate = categories[10].values;
    const riskOrder = categories[11].values;
    const hierLevel = categories[12].values;
    const riskCode = categories[13].values;
    const managementActions = categories[14].values;
    const riskTrendLabel = categories[15].values;


    let events = [];

    for (let x = 0; x < riskTitle.length; x++) {
      const fyHeader = Utils.stripFY(String(fy[x]));
      const reportingCycleHeader = String(reportingCycle[x]);
      const riskHeader = Utils.concatText(fy[x], reportingCycle[x]);

      const event: ERMDataPoints = {
        color: '',
        cosoPillar: String(cosoPillar[x]),
        fy: String(fy[x]),
        reportingCycle: String(reportingCycle[x]),
        riskCategory: String(riskCategory[x]),
        riskDomain: String(riskDomain[x]),
        riskHeader,
        riskTitle: String(riskTitle[x]),
        riskTrend: riskTrend[x] ? String(riskTrend[x]) : '',
        selectionId: null,
        sltOwners: String(sltOwners[x]),
        trendDriversUpdate: Utils.formatText(String(trendDriversUpdate[x])),
        riskOwners: String(riskOwners[x]),
        riskScore: Number(riskScore[x]),
        riskOrder: Number(riskOrder[x]),
        hierLevel: Number(hierLevel[x]),
        riskCode: Number(riskCode[x]),
        managementActions: Utils.formatText(String(managementActions[x])),
        riskTrendLabel: String(riskTrendLabel[x])
      };
      events.push(event);
    }
    events = _.sortBy(events, 'reportingCycle');
    events = _.sortBy(events, 'fy');
    events = _.sortBy(events,'riskOrder');
    return {
      events
    };
  }

  /**
   * Get unique risk titles from data
   *
   * @export
   * @param {ERMDataPoints[]} data
   * @returns
   *
   */
  export function getRiskTitles(data: ERMDataPoints[]) {
    const riskTitles  = _.uniq(_.map(data, 'riskTitle'));

    return riskTitles;
  }

  /**
   * Get unique risk headers from data
   *
   * @export
   * @param {ERMDataPoints[]} data
   * @returns
   *
   */
  export function getRiskHeaders(data: ERMDataPoints[]): string[] {
    const riskHeaders  = _.uniq(_.map(data, 'riskHeader'));
    const riskHeaderList = [];

    _.map(riskHeaders, (num, key) => {
      riskHeaderList.push(num);
    });
    return riskHeaderList;
  }
}
