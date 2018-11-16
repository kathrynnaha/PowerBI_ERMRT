/*
 *  Power B Visual CLI
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
  export class TooltipGenerator {
    private dimensions: ViewportDimensions;
    private body: d3.Selection<SVGAElement>;

    constructor(body: d3.Selection<SVGAElement>){
      this.body = body;
    }

    public updateDimensions(vpd: ViewportDimensions) {
      this.dimensions = vpd;
    }

    public draw(targetElement: any, ermDataPoint: ERMDataPoints, scrollTop?: number, scrollLeft?: number){      
      if((<any>d3.event).target.nodeName === "path")  {
        if(d3.select(".popup").node()) {
          return;
        }
        const hoveredElementPosition = Utils.getNodePosition(targetElement);
        let actualWidth = targetElement.offsetWidth;
        let actualHeight = targetElement.offsetHeight;

        if(isNaN(actualWidth)) {
          actualWidth = 0;
        }
        if(isNaN(actualHeight)) {
          actualHeight = 0;
        }
        const popup = this.body
            .append("div")
            .attr("class", "popup wrapper")
            .style("left", (hoveredElementPosition.left + 20 + actualWidth / 2 - 60 - targetElement.parentNode.parentNode.parentNode.parentNode.parentNode.scrollLeft - scrollLeft).toString() + "px")
            .style("top", (hoveredElementPosition.top + 35 + actualHeight / 2 - (<any>this.body).node().scrollTop - scrollTop).toString() + "px");
        const headerText = ermDataPoint.riskTrend + " in " + ermDataPoint.fy + " " + ermDataPoint.reportingCycle;
        const popupHeader = popup
          .append("h2")
          .attr("class", "header")
          .text(headerText);

        popupHeader
          .append("i")
          .attr("class", "fa fa-arrow-up")
          .attr("aria-hidden", "true");

        const innerContent = popup.append("div")
          .attr("class", "inner-content");

        const riskTitleContainer = innerContent
          .append("div")
          .attr("class", "owner");

        const riskTitleHeader = riskTitleContainer
          .append("h3")
          .text("Risk Title:")
          .attr("class", "label");

        riskTitleHeader
          .append("span")
          .text(ermDataPoint.riskTitle)
          .attr("class", "risk-title-detail");  

        const sltOwnersContainer = innerContent
          .append("div")
          .attr("class", "owner");

        const stlOwnerHeader = sltOwnersContainer
          .append("h3")
          .text("SLT Owner(s):")
          .attr("class", "label");

        stlOwnerHeader
          .append("span")
          .text(ermDataPoint.sltOwners)
          .attr("class", "detail");

        const riskOwnersContainer = innerContent
          .append("div")
          .attr("class", "owner");

        const riskOwnerHeader = riskOwnersContainer
          .append("h3")
          .text("Risk Owner(s):")
          .attr("class", "label");

        riskOwnerHeader
          .append("span")
          .text(ermDataPoint.riskOwners)
          .attr("class", "risk-detail");

        innerContent
          .append("h3")
          .text("Drivers:")
          .attr("class", "header");

        const trendDrivers = innerContent.append("ul");
        var trendDriversUpdates = ermDataPoint.trendDriversUpdate;
   
        if(trendDriversUpdates.substring(0,1) !== "*"){var trendDriversUpdates ="\u2022&nbsp;&nbsp;" .concat(trendDriversUpdates)}

          trendDrivers.append("li")
          .html(trendDriversUpdates
            .replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
              .replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
              .replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
              .replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
              .replace("*","\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;"))

        innerContent
          .append("h3")
          .text("Management Actions:")
          .attr("class", "header");

        const managementActions = innerContent.append("ul");
        var managementActionsUpdates = ermDataPoint.managementActions;
        if(managementActionsUpdates.substring(0,1) !== "*"){var managementActionsUpdates ="\u2022&nbsp;&nbsp;" .concat(managementActionsUpdates)}


        managementActions.append("li").html(managementActionsUpdates
          .replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("*****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
          .replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("****","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
          .replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("***","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
          .replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;").replace("**","<br>&nbsp;&nbsp;&nbsp;\u2022&nbsp;&nbsp;")
          .replace("*","\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;").replace("*","<br/>\u2022&nbsp;&nbsp;"))
        ;
        


        const popupPosition = Utils.getNodePosition(popup.node());

        if((<any>popup.node().parentNode).offsetHeight / 2 < popupPosition.top) {
          innerContent.attr("class", "inner-content show-pointer");
          popup.style("top", (hoveredElementPosition.top - 20 + actualHeight / 2 - (<any>popup.node()).offsetHeight - (<any>this.body).node().scrollTop - scrollTop).toString() + "px");
        } else {
          popupHeader.attr("class", "header show-pointer");
        }
      }
    }

    public remove() {
      d3.select(".popup").remove();
    }
  }
}
