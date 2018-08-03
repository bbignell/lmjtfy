var SEARCH_FORMAT = '__HOST__/issues/?jql=project%20in%20(__PROJECTS__)%20AND%20text%20~%20"__QUERY__"';
var JIRAS = new Map();

var ELEMENTS = {
  queryInput: $('#query'),
  searchButton: $('#submit'),
  searchForm: $('#lmjtfy'),
  spinner: $('#spinner')
};

function jiraThat(query) {
  toggleVisibility(ELEMENTS.searchButton, ELEMENTS.spinner);

  var delay = 500;
  var incr = 500;

  JIRAS.forEach(function(value, key, map){
    var search = SEARCH_FORMAT.replace('__HOST__', key).replace('__PROJECTS__', value).replace('__QUERY__', query);
    setTimeout(function(){window.open(search, value);}, delay);
    delay += incr;
  });

  setTimeout(function(){toggleVisibility(ELEMENTS.spinner, ELEMENTS.searchButton);}, delay + incr);
}

function toggleVisibility(hideMe, showMe) {
  hideMe.hide();
  showMe.show();
}

function isValidSearch(query) {
  return ('' + query).trim();
}

ELEMENTS.searchForm.on('submit', function(ev){
    ev.preventDefault();
    return false;
});

function clickButton(ev) {
  var enabled = !ELEMENTS.searchButton.is(':disabled');
  var query = ELEMENTS.queryInput.val();
  if (enabled && isValidSearch(query)) {
    jiraThat(query);
  } else {
    if (enabled) {
      ELEMENTS.queryInput.focus().css({'background-color':'#ffaaaa'}).animate({'background-color':'white'});
    }
  }
}

ELEMENTS.searchButton.mouseup(clickButton);
ELEMENTS.searchButton.on('keypress', clickButton);
ELEMENTS.queryInput.on('keypress', function(ev){
  if (ev.key === 'Enter') {
    ELEMENTS.searchButton.trigger('keypress');
  }
});

ELEMENTS.searchButton.removeAttr('disabled');

/* URL param extractor from https://davidwalsh.name/query-string-javascript */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
