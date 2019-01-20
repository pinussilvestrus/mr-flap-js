/**
 * basic footer component
 * @param {Array} flatIcons
 * @param {Element} mrflapDiv
 */
class Footer {

  constructor (options) {

    this.flatIcons = options.flatIcons || [];
    this.mrflapDiv = options.mrflapDiv;

  }

  /**
   * creates flaticon-credits footer component
   */
  initCredits () {

    if (this.mrflapDiv) {

      const footerDiv = $('<div class="mrflap-footer"></div>');
      this.mrflapDiv.append(footerDiv);
      this.flatIcons.forEach(f => {

        footerDiv.append(`<div>Icons made by <a href="${f.href}" title="${f.title}">${f.title}</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>`);
      
      });
    
    }

  }

}
