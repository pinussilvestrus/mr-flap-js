document.addEventListener('DOMContentLoaded', function (event) {
  const flatIcons = [
    {
      href: 'https://www.flaticon.com/authors/pixel-buddha',
      title: 'Pixel Buddha'
    }
  ];

  const mrflap = $('.mrflap-playground');

  // append footer
  mrflap.append(`<div class="mrflap-footer"></div>`);

  // append flaticon credits
  flatIcons.forEach(f => {
    $('.mrflap-footer').append(`<div>Icons made by <a href="${f.href}" title="${f.title}">${f.title}</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>`);
  });
});
