var width = getScrollbarWidth(), origWidthA = 0, origWidthB = 0, windowWidth = 0;
ab();

function ab() {
  var a = document.getElementsByClassName("content")[0];
  var b = document.getElementsByClassName("content-left")[0];
  var c = document.getElementById("fill");
  var d = document.getElementsByClassName("about-container")[0];
  var e = document.getElementsByClassName("overall-navbar")[0];
  var f = document.getElementsByClassName("follow")[0];
  if (a && e) {
    if (window.innerWidth > 768) {
      if (origWidthA == 0 || windowWidth != window.innerWidth) {
        origWidthA = window.innerWidth - e.offsetWidth - width;
        windowWidth = window.innerWidth;
      }
      if (!d)
        a.style.width = origWidthA + 'px';
      else
        a.style.width = (window.innerWidth - e.offsetWidth) + 'px';
      if (b) {
        if (origWidthB == 0)
          origWidthB = b.offsetWidth;
        if (b.offsetWidth > 30)
          b.style.width = (.3 * origWidthA) + 'px';
      }
      if (window.innerWidth <= document.documentElement.clientWidth && !d)
        c.style.width = width + 'px';
      else
        c.style.width = 0;
      if (f) {
        f.setAttribute('style', "right: calc(1rem - " + (window.innerWidth <= document.documentElement.clientWidth ? 0 : width) + "px)");
      }
    } else if (document.documentElement.clientWidth > 0 && document.documentElement.clientWidth <= 768) {
      a.style.width = "100%";
      b.style.width = "100%";
      c.style.width = 0;
    }
  }
  setTimeout(ab, 10);
}

function getScrollbarWidth() {
  var outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  document.body.appendChild(outer);

  var widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = "scroll";

  // add innerdiv
  var inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  var widthWithScroll = inner.offsetWidth;

  // remove divs
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}
