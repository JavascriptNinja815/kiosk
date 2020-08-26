/*

MIT License

Copyright (c) 2018 Anita SV, daylr95

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

(function() {
  var scmult = function(l, x) {
    return [ l * x[0], l * x[1] ];
  };
  
  var vcadd = function(a, b) {
    return [ a[0] + b[0], a[1] + b[1] ];
  };

  var minus = function(a, b) {
    return [ a[0] - b[0], a[1] - b[1] ];
  };

  var dot = function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  };

  var wedge = function(a, b) {
    return a[0] * b[1] - a[1] * b[0];
  };

  var apply = function(A, x) {
    return vcadd(scmult(x[0], A[0]), scmult(x[1], A[1]));
  };

  var mult = function(A, B) {
    return [ apply(A, B[0]), apply(A, B[1]) ];
  };

  function Transform(A, b) {
    this.A = A;
    this.b = b;
  }

  Transform.prototype.css = function() {
    var A = this.A;
    var b = this.b;
    return 'matrix(' + A[0][0] + ',' + A[0][1] + ',' + A[1][0] + ',' + A[1][1] + ',' + b[0] + ',' + b[1] + ')';
  };

  var cascade = function(T, U) {
    return new Transform(mult(T.A, U.A), vcadd(apply(T.A, U.b), T.b));
  };

  var rotate = function(c, s) {
    return [ [ c, s], [-s, c] ];
  };

  var rotscale = function(a, b) {
    var alen = dot(a, a);
    var sig = dot(a, b);
    var del = wedge(a, b);
    return rotate( sig / alen, del / alen);
  };

  var justscale = function(a, b) {
    var alen = Math.sqrt(dot(a, a));
    var blen = Math.sqrt(dot(b, b));
    var scale = blen / alen;
    return rotate(scale, 0);
  };

  var zoom = function(s, d, rotate) {
    var a = minus(s[1], s[0]);
    var b = minus(d[1], d[0]);
    var rs = rotate ? rotscale(a, b) : justscale(a, b);
    var rs0 = apply(rs, s[0]);
    var t = minus(d[0], rs0);
    return new Transform(rs, t);
  };

  var avgVector = function(u, v, progress) {
    var u1 = scmult(1 - progress, u);
    var v1 = scmult(progress, v);
    return vcadd(u1, v1);
  };

  var avgMatrix = function(A, B, progress) {
    return [ avgVector(A[0], B[0], progress),  avgVector(A[1], B[1], progress) ];
  };

  Transform.avg = function(Z, I, progress) {
    return new Transform(avgMatrix(Z.A, I.A, progress), avgVector(Z.b, I.b, progress));
  };

  var identity = new Transform([[1, 0], [0, 1]], [0, 0]);

  var defaults = function(param, val) {
    return (param === undefined) ? val : param;
  };

  var default_config = function(cfg, cfg_def) {
    var new_cfg = defaults(cfg, {});
    for (var k in cfg_def) {
      new_cfg[k] = defaults(new_cfg[k], cfg_def[k]);
    }
    return new_cfg;
  };

  function Zoom(elem, config, wnd) {
    this.mayBeDoubleTap = null;
    this.isAnimationRunning = false;
    this.curTouch = 0;
    this.elem = elem;
    this.activeZoom = identity;
    this.resultantZoom = identity;
    this.srcCoords = [0, 0];
    this.destCoords = [0, 0];
    var me = this;
    
    this.config = default_config(config, {
      'pan' : false,
      'rotate' : true,
      'minScale': null,
      'maxScale': null
    });

    this.wnd = wnd || window;

    elem.style['transform-origin'] = '0 0';

    var getCoordsDouble = function(t) {
      var oX = elem.offsetLeft;
      var oY = elem.offsetTop; 
      return [ 
        [t[0].pageX - oX, t[0].pageY - oY],
        [t[1].pageX - oX, t[1].pageY - oY] 
      ];
    };

    var getCoordsSingle = function(t) {
      var oX = elem.offsetLeft;
      var oY = elem.offsetTop; 
      var x = t[0].pageX - oX;
      var y = t[0].pageY - oY;
      return [ 
        [x, y],
        [x + 1, y + 1] 
      ];
    };

    var getCoords = function(t) {
      return t.length > 1 ? getCoordsDouble(t) : getCoordsSingle(t);
    };

    var setSrcAndDest = function(touches){
      me.srcCoords = getCoords(touches);
      me.destCoords = me.srcCoords;
    };

    var setDest = function(touches){
      me.destCoords = getCoords(touches);
    };

    var handleTouchEvent = function(cb) {
      return function(evt) {
        //evt.preventDefault();
        if (me.isAnimationRunning){
          return false;
        }            
        var touches = evt.touches;
        if (!touches) {
          return false;
        }
        cb(touches);
      };
    };

    var handleZoom = handleTouchEvent(function(touches) {
      var numOfFingers = touches.length;
      if (numOfFingers !== me.curTouch){
        me.curTouch = numOfFingers;
        me.finalize();
        if (numOfFingers !== 0) {
          setSrcAndDest(touches);
        }
      } else if (numOfFingers !== 0) {
        setDest(touches);
        me.previewZoom();
      }
    });
    
    var handleTouchStart = handleTouchEvent(function(touches) {
      if (touches.length === 1) {
        if (me.mayBeDoubleTap !== null) {
          clearTimeout(me.mayBeDoubleTap);
          me.reset();
          me.mayBeDoubleTap = null;
        } else {
          me.mayBeDoubleTap = setTimeout(function() {
            me.mayBeDoubleTap = null;                    
          }, 300);
        }
      }
    });

    this.pixelSize = elem.getBoundingClientRect();

    /*
    elem.parentNode.addEventListener('touchstart', handleTouchStart, { passive: true });
    elem.parentNode.addEventListener('touchstart', handleZoom, { passive: true });
    elem.parentNode.addEventListener('touchmove', handleZoom, { passive: true });
    elem.parentNode.addEventListener('touchend', handleZoom, { passive: true });
    */
    
    elem.addEventListener('touchstart', handleTouchStart, { passive: true });
    elem.addEventListener('touchstart', handleZoom, { passive: true });
    elem.addEventListener('touchmove', handleZoom, { passive: true });
    elem.addEventListener('touchend', handleZoom, { passive: true });

    this.destroy = function() {
      elem.style.removeProperty('transform');
      elem.style.removeProperty('transform-origin');

      /*
      elem.parentNode.removeEventListener('touchstart', handleTouchStart);
      elem.parentNode.removeEventListener('touchstart', handleZoom);
      elem.parentNode.removeEventListener('touchmove', handleZoom);
      elem.parentNode.removeEventListener('touchend', handleZoom);
      */
      
      elem.removeEventListener('touchstart', handleTouchStart);
      elem.removeEventListener('touchstart', handleZoom);
      elem.removeEventListener('touchmove', handleZoom);
      elem.removeEventListener('touchend', handleZoom);

      Object.keys(this).forEach(function(key) {
        delete this[key];
      }.bind(this));
    }.bind(this);
  }

  Zoom.prototype.previewZoom = function() {
    var additionalZoom = zoom(this.srcCoords, this.destCoords, this.config.rotate);
    var resultantZoom = cascade(additionalZoom, this.activeZoom);
    if (this.checkPan(resultantZoom) === false) { return; }
    resultantZoom = this.checkBoundaries(resultantZoom);
    this.resultantZoom = resultantZoom;
    this.repaint();
  };

  Zoom.prototype.setZoom = function(newZoom) {
    this.resultantZoom = newZoom;
    this.repaint();
  };

  Zoom.prototype.finalize = function() {
    this.activeZoom = this.resultantZoom;
  };

  Zoom.prototype.repaint = function() {
    this.elem.style.transform = this.resultantZoom.css();
    let zoomEvent = new CustomEvent('zoom', { detail : this.resultantZoom.css() });
    this.elem.dispatchEvent(zoomEvent);
  };

  Zoom.prototype.reset = function(useOriginalIdentity) {
    var newIdentity = identity;

    if (this.wnd.requestAnimationFrame) {
      this.isAnimationRunning = true;

      var Z = this.activeZoom;
      var startTime = null;

      if (this.config.maxScale) {
        if (!useOriginalIdentity && Z.A[0][0] === 1 && Z.A[1][1] === 1) {
          var windowSize = {
            height: (document.documentElement.clientHeight || window.innerHeight),
            width: (document.documentElement.clientWidth || window.innerWidth)
          };

          var max = this.config.maxScale;

          var middleX = ((this.pixelSize.width  * this.config.maxScale) - windowSize.width) / 2;
              middleX = middleX + (this.elem.offsetLeft);
              middleX = middleX * -1;

          var middleY = ((windowSize.height / 2) - (this.pixelSize.height / 2));
              middleY = middleY + (((this.pixelSize.height * this.config.maxScale) - windowSize.height) / 2);
              middleY = middleY * -1;

          newIdentity = new Transform([[max, 0], [0, max]], [middleX, middleY]);
        }
      }

      var me = this;

      var step = function(time) {
        if (!startTime) { 
          startTime =  time;
        }
        var progress = (time - startTime)/100;

        if (progress >= 1) {
          me.setZoom(newIdentity);
          setTimeout(function() {
            me.isAnimationRunning = false;
          }, 100);
        } else {
          me.setZoom(Transform.avg(Z, newIdentity, progress));
          me.wnd.requestAnimationFrame(step);
        }
      };
      this.wnd.requestAnimationFrame(step);
    } else {
      this.setZoom(newIdentity);
    }
  };

  Zoom.prototype.checkPan = function(resultantZoom) {
    var proceed = true;

    var A = resultantZoom.A;

    var minScale = this.config.minScale;
    if (minScale) {
      if (A[0][0] <= minScale && A[1][1] <= minScale) {
        proceed = false;
        this.finalize();
        this.reset(true);
      }
    }

    var maxScale = this.config.maxScale;
    if (maxScale && (A[0][0] > maxScale && A[1][1] > maxScale)) {
      proceed = false;
    }

    return proceed;
  };


  Zoom.prototype.checkBoundaries = function(resultantZoom) {
    var A = resultantZoom.A;
    var b = resultantZoom.b;

    var boundaries = this.config.boundaries;
    if (boundaries === true) {
      var width = this.pixelSize.width * A[0][0];
      var height = this.pixelSize.height * A[1][1];

      var windowSize = {
          height: (document.documentElement.clientHeight || window.innerHeight),
          width: (document.documentElement.clientWidth || window.innerWidth)
      };

      var xLeft, xRight;
      var yTop, yBottom;

      if (windowSize.height > windowSize.width) {
        if (b[0] >= 0) {
          b[0] = 0;
        }

        if (Math.abs(b[0]) >= (width - windowSize.width)) {
          b[0] = (width - windowSize.width) * -1;
        }

        var yTopFormula = ((windowSize.height - this.pixelSize.height) / 2) * -1;

        if (b[1] <= yTopFormula) {
          yTop = yTopFormula;
        }

        var yBottomFormula = ((windowSize.height - this.pixelSize.height) / 2) - (height - this.pixelSize.height);

        if (b[1] > yBottomFormula) {
          yBottom = yBottomFormula;
        }

        if (height < windowSize.height) {
          if (yTop && !yBottom) {
            b[1] = yTop;
          } else if (yBottom && !yTop) {
            b[1] = yBottom;
          }
        } else {
          if (yTop && !yBottom) {
            b[1] = yBottomFormula;
          } else if (yBottom && !yTop) {
            b[1] = yTopFormula;
          }
        }
      } else {
        var xRightFormula = this.elem.offsetLeft * -1;
        if (b[0] >= xRightFormula) {
          xRight = xRightFormula;
        }

        var xLeftFormula = ((windowSize.width - this.pixelSize.width) / 2) - (width - this.pixelSize.width);
        if (b[0] <= xLeftFormula) {
          xLeft = xLeftFormula;
        }

        var widerImage = (width > windowSize.width);

        if (xRight && !xLeft) {
          b[0] = (widerImage) ? xRight : xLeftFormula;
        } else if (xLeft && !xRight) {
          b[0] = (widerImage) ? xLeft : xRightFormula;
        }

        if (b[1] >= 0) {
          yTop = 0;
        } else if (Math.abs(b[1]) >= (height - windowSize.height)) {
          yBottom = (height - windowSize.height) * -1;
        }

        if (yTop >= 0 && !yBottom) {
          b[1] = yTop;
        } else if (yBottom && !yTop) {
          b[1] = yBottom;
        }
      }

      resultantZoom.A = A;
      resultantZoom.b = b;
    }

    return resultantZoom;
  };

  window.Zoom = Zoom;
})();
