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

  export interface Dimensions{
    maxHeight: number;
    minHeight: number;
    maxWidth: number;
    minWidth: number;
    padding: number;
  }

  export interface ViewportDimensions{
    height: number;
    width: number;
    padding?: number;
  }

  /**
   * Interface for powerbi_visuals View modle
   *
   * @interface ERMViewModel
   * @property {ERMDataPoints[]} events
   */
  export interface ERMViewModel {
    events: ERMDataPoints[];
  };

  /**
   * Interface for ERM data points
   *
   * @interface ERMDataPoints
   *
   */
  export interface ERMDataPoints {
    fy: string;
    color: string;
    riskTitle: string;
    sltOwners: string;
    riskTrend: string;
    cosoPillar: string;
    riskDomain: string;
    riskHeader: string;
    riskCategory: string;
    reportingCycle: string;
    trendDriversUpdate: string;
    selectionId: powerbi.visuals.ISelectionId;
    riskOwners: string;
    riskScore: number;
    riskOrder: number;
    hierLevel: number;
    riskCode: number;
    managementActions: string;
    riskTrendLabel: string;
  }
}
