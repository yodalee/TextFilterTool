var showFiltered = false;
var tarr = [];
var tfilter = [];
var tColor = new Array(
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslateblue",
  "lightslategray",
  "lightsteelbule",
  "lightyellow");

function fillColorSelect() {
  var select = document.getElementById("filtercolor");
  for (var i in tColor) {
    var option = document.createElement("option");
    option.text = tColor[i];
    select.add(option);
  }
}

function Filter(filtertext, fgcolor, bgcolor) {
  this.filtertext = filtertext;
  this.fgcolor = fgcolor;
  this.bgcolor = bgcolor;
  this.matched = 0;
  matched = 0;
  this.filterfun = function(text) {
    //add tag reversely, so that startpos won't be modified by the added tag
    var startpos = text.lastIndexOf(filtertext);
    if (startpos == -1) {
      return null;
    }
    return ["<span style=\"background-color:", tColor[bgcolor], "\">", text, "</span>"].join('');
  }
}

function addFilter() {
  var filterarea = document.getElementById("filtertext");
  var bgId = document.getElementById("filtercolor").selectedIndex;
  var filtertext = filterarea.value;
  filterarea.value = "";
  if (filtertext.length == 0) {
    return;
  }
  tfilter.push(new Filter(filtertext, 0, bgId));
  renderFilter();
  renderText();
}

function renderFilter() {
  var filterarea = document.getElementById("filterarea");
  filterarea.innerHTML = "";
  for (var i in tfilter) {
    var div = document.createElement("div");
    var content = i + ". Matcher \"" + tfilter[i].filtertext + "\"";
    div.textContent = content;
    filterarea.appendChild(div);
  }
}

function renderText() {
  var textarea = document.getElementById("textarea");
  textarea.innerHTML = "";

  if (tfilter.length == 0) {
    // no filter, directly render
    for (var i in tarr) {
      var div = document.createElement("div");
      div.id = "textline";
      div.innerHTML = tarr[i];
      textarea.appendChild(div);
    }
  } else {
    // has filter, pass each line to filter
    for (var i in tarr) {
      // pass each text over filter
      var textContent = null;
      for (var j in tfilter) {
        var textFiltered = tfilter[j].filterfun(tarr[i]);
        if (textFiltered != null) {
          textContent = textFiltered;
          break;
        }
      }
    }
    if (!textFiltered && textContent == null) {
      textContent = tarr[i];
    }
    var div = document.createElement("div");
    div.id = "textline";
    div.innerHTML = textContent;
    textarea.appendChild(div);
  }
}

function handleFileSelect(evt) {
  var files = evt.target.files;
  file = files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var text = e.target.result;
    tarr = text.split("\n");
    renderText();
  };

  reader.readAsText(file, "utf-8");
}

function checkShowFiltered() {
  showFiltered = document.getElementById("showFiltered").checked;
  renderText();
}

window.onload = function() {
  fillColorSelect();
  document.getElementById("files").addEventListener('change',
      handleFileSelect, false);
}

