var tarr = [];
var tfilter = [];
var tColor = new Array("rgb(255,255,255)", "rgb(0,0,0)");

function Filter(text, fgcolor, bgcolor) {
  this.text = text;
  this.fgcolor = fgcolor;
  this.bgcolor = bgcolor;
}

function addFilter() {
  var filtertext = document.getElementById("filtertext").value;
  if (filtertext.length == 0) {
    return;
  }
  tfilter.push(new Filter(filtertext, 1, 0));
  renderFilter();
  renderText();
}

function renderFilter() {
  var filterarea = document.getElementById("filterarea");
  filterarea.innerHTML = "";
  var arrLength = tfilter.length;
  for (var i in tfilter) {
    var div = document.createElement("div");
    var content = i + ". Matcher \"" + tfilter[i].text + "\"";
    div.textContent = content;
    filterarea.appendChild(div);
  }
}

function renderText() {
  var textarea = document.getElementById("textarea");
  textarea.innerHTML = "";
  var arrLength = tarr.length;
  for (var i in tarr) {
    var div = document.createElement("div");
    div.id = "textline";
    div.textContent = tarr[i];
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
  document.getElementById("files").addEventListener('change',
      handleFileSelect, false);
}

