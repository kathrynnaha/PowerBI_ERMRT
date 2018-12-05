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
  export namespace Utils {
    /**
     * transform
     *
     * @export
     * @param {Number} xPos
     * @param {Number} yPos
     * @returns {string}
     */
    export function transform(xPos: number, yPos: number): string {
      return 'translate(' + xPos + ',' + yPos + ')';
    }

    /**
     * Convert number to pixel
     *
     * @export
     * @param {number} value
     * @returns {string}
     */
    export function convertToPx(value: number): string {
      return value + 'px';
    }

    /**
     * Slugify text - remove spaces and convert to lowercase
     *
     * @export
     * @param {string} text
     * @returns {string}
     */
    export function slugify(text: string): string {
      return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    }

    export function convertLineBreaktoList(text: string, width: number) : string {
      let lines = text.split('<br/>');
      let html = "";
      for (var i = 0; i <= lines.length - 1; i++) {
        html += "<li style='width:" + width.toString() + "px'>" + lines[i] + "</li>"
      }
      return html;
    }

    export function formatText(text: string): string {
     // text = text.replace(/-/g, '');
     // text = text.replace(/-/g, '<br/>');

      return text;
    }

    export function stripFY(text: string): string {
      text = slugify(text);
      text = text.replace("fy", '');

      return text;
    }

    export function concatText(text1, text2): string{
      return text1 + ' ' + text2;
    }

    export function getTransformValue(data) {
      switch(data) {
        case 'increased':
          return 'translate(-904, -23)';

        case 'unchanged':
          return  'translate(-1046, -23)';

        case 'decreased':
          return  'translate(-1156, -23)';

        case 'other':
          return  'scale(0.48, 0.48)';

        default:
        break;
      }
    }

    export function getNodePosition(el): any {
        const body = d3.select('body').node();

        for (var lx = 0, ly = 0;
            el != null && el !== body;
            lx += (el.offsetLeft || el.clientLeft), ly += (el.offsetTop || el.clientTop), el = (el.offsetParent || el.parentNode));
        return {left: lx, top: ly};
    }
  }
}
