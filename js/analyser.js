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
  this.filterfun = function(text) {
    //add tag reversely, so that startpos won't be modified by the added tag
    var startpos = text.lastIndexOf(filtertext);
    if (startpos == -1) {
      return null;
    }
    while (startpos != -1) {
      var endpos = startpos + filtertext.length;
      text = [
        text.slice(0, startpos),
        "<span style=\"background-color:", tColor[bgcolor], "\">",
        text.slice(startpos, endpos),
        "</span>",
        text.slice(endpos)].join('');
      startpos = text.lastIndexOf(filtertext, startpos);
    }
    return text;
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
  for (var i in tarr) {
    // pass each text over filter
    var textContent = tarr[i];
    for (var j=tfilter.length-1; j>=0; j--) {
      var textFiltered = tfilter[j].filterfun(textContent);
      if (textFiltered != null) {
        textContent = textFiltered;
      }
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

window.onload = function() {
  fillColorSelect();
  document.getElementById("files").addEventListener('change',
      handleFileSelect, false);
}

