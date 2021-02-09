// note!
// there are a LOT of steps to extract the data we
// want and each step ignores a ton of interesting
// stuff – add some console.log() statements if
// you want to see what the Glyph object, etc
// contains

// modified version of p5.js textToPoints() function
// unlike the original, this returns a list of letters,
// each containing a list of shapes (which, in turn, are
// a list of points)
function textToShapes(font, str, options) {
  
  // optional args, passed into the function
  // will be used if present or it will default
  // to the values listed here
  let x = options.x || 0;
  let y = options.y || 0;
  let fontSize = options.fontSize || font.parent._renderer._textSize;
  
  // get the Glyph objects (letterforms) that make up
  // the string of text in the font
  const glyphs = font._getGlyphs(str);
  
  // internal function to test if character is a space
  // multiple checks to catch all whitespace characters
  function isSpace(i) {
    return (
      (glyphs[i].name && glyphs[i].name === 'space') ||
      (str.length === glyphs.length && str[i] === ' ') ||
      (glyphs[i].index && glyphs[i].index === 3)
    );
  }
  
  // gather points for all letters
  const letters = [];
  let xOffset = 0;
  for (let i=0; i<glyphs.length; i++) {
    let glyph = glyphs[i];
    
    // skip paths spaces (see function above)
    // but do include advnace width for proper letter spacing
    if (!isSpace(i)) {
    
      // get paths from glyph at current font size
      const g = glyph.getPath(x,y, fontSize);
      const paths = splitPaths(g.commands);    // returns list, one element for each letter
                                               // (some with multiple paths inside each)
      // create list of letters, each one
      // containing a list of paths that make up that letter
      let letter = [];
      for (let j=0; j<paths.length; j++) {
        let path = [];
        const pts = pathToPoints(paths[j], options);
        for (let k=0; k<pts.length; k++) {
          pts[k].x += xOffset;    // add offset to points for proper positioning
          path.push(pts[k]);
        }
        letter.push(path);
      }
      letters.push(letter);
    }
    
    // update x position in string
    // note: advance width on its own will not return the correct
    // pixel position, so we need fontScale() to compute (see util.js)
    xOffset += glyphs[i].advanceWidth * fontScale(font, fontSize);
  }
  return letters; 
}


// converts font units to pixels
function fontScale(font, fontSize) {
  return (1 / font.font.unitsPerEm * (fontSize || font.parent._renderer._textSize));
}


// utility functions related to getting paths from text
// these are all pulled from p5.js source – no comments
// from here here :)
// https://github.com/processing/p5.js/blob/1.1.9/src/typography/p5.Font.js

function pathToPoints(cmds, options) {
  const opts = parseOpts(options, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });

  const // total-length
    len = pointAtLength(cmds, 0, 1),
    t = len / (len * opts.sampleFactor),
    pts = [];

  for (let i = 0; i < len; i += t) {
    pts.push(pointAtLength(cmds, i));
  }

  if (opts.simplifyThreshold) {
    simplify(pts, opts.simplifyThreshold);
  }

  return pts;
}

function simplify(pts, angle = 0) {
  let num = 0;
  for (let i = pts.length - 1; pts.length > 3 && i >= 0; --i) {
    if (collinear(at(pts, i - 1), at(pts, i), at(pts, i + 1), angle)) {
      // Remove the middle point
      pts.splice(i % pts.length, 1);
      num++;
    }
  }
  return num;
}

function splitPaths(cmds) {
  const paths = [];
  let current;
  for (let i = 0; i < cmds.length; i++) {
    if (cmds[i].type === 'M') {
      if (current) {
        paths.push(current);
      }
      current = [];
    }
    current.push(cmdToArr(cmds[i]));
  }
  paths.push(current);
  return paths;
}

function cmdToArr(cmd) {
  const arr = [cmd.type];
  if (cmd.type === 'M' || cmd.type === 'L') {
    // moveto or lineto
    arr.push(cmd.x, cmd.y);
  } else if (cmd.type === 'C') {
    arr.push(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
  } else if (cmd.type === 'Q') {
    arr.push(cmd.x1, cmd.y1, cmd.x, cmd.y);
  }
  // else if (cmd.type === 'Z') { /* no-op */ }
  return arr;
}

function parseOpts(options, defaults) {
  if (typeof options !== 'object') {
    options = defaults;
  } else {
    for (const key in defaults) {
      if (typeof options[key] === 'undefined') {
        options[key] = defaults[key];
      }
    }
  }
  return options;
}

function at(v, i) {
  const s = v.length;
  return v[i < 0 ? i % s + s : i % s];
}

function collinear(a, b, c, thresholdAngle) {
  if (!thresholdAngle) {
    return areaTriangle(a, b, c) === 0;
  }

  if (typeof collinear.tmpPoint1 === 'undefined') {
    collinear.tmpPoint1 = [];
    collinear.tmpPoint2 = [];
  }

  const ab = collinear.tmpPoint1,
    bc = collinear.tmpPoint2;
  ab.x = b.x - a.x;
  ab.y = b.y - a.y;
  bc.x = c.x - b.x;
  bc.y = c.y - b.y;

  const dot = ab.x * bc.x + ab.y * bc.y,
    magA = Math.sqrt(ab.x * ab.x + ab.y * ab.y),
    magB = Math.sqrt(bc.x * bc.x + bc.y * bc.y),
    angle = Math.acos(dot / (magA * magB));

  return angle < thresholdAngle;
}

function areaTriangle(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
}

// Portions of below code copyright 2008 Dmitry Baranovskiy (via MIT license)

function findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
  const t1 = 1 - t;
  const t13 = Math.pow(t1, 3);
  const t12 = Math.pow(t1, 2);
  const t2 = t * t;
  const t3 = t2 * t;
  const x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x;
  const y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y;
  const mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x);
  const my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y);
  const nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x);
  const ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y);
  const ax = t1 * p1x + t * c1x;
  const ay = t1 * p1y + t * c1y;
  const cx = t1 * c2x + t * p2x;
  const cy = t1 * c2y + t * p2y;
  let alpha = 90 - Math.atan2(mx - nx, my - ny) * 180 / Math.PI;

  if (mx > nx || my < ny) {
    alpha += 180;
  }

  return {
    x,
    y,
    m: { x: mx, y: my },
    n: { x: nx, y: ny },
    start: { x: ax, y: ay },
    end: { x: cx, y: cy },
    alpha
  };
}

function getPointAtSegmentLength(
  p1x,
  p1y,
  c1x,
  c1y,
  c2x,
  c2y,
  p2x,
  p2y,
  length
) {
  return length == null
    ? bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y)
    : findDotsAtSegment(
        p1x,
        p1y,
        c1x,
        c1y,
        c2x,
        c2y,
        p2x,
        p2y,
        getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length)
      );
}

function pointAtLength(path, length, istotal) {
  path = path2curve(path);
  let x;
  let y;
  let p;
  let l;
  let sp = '';
  const subpaths = {};
  let point;
  let len = 0;
  for (let i = 0, ii = path.length; i < ii; i++) {
    p = path[i];
    if (p[0] === 'M') {
      x = +p[1];
      y = +p[2];
    } else {
      l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
      if (len + l > length) {
        if (!istotal) {
          point = getPointAtSegmentLength(
            x,
            y,
            p[1],
            p[2],
            p[3],
            p[4],
            p[5],
            p[6],
            length - len
          );
          return { x: point.x, y: point.y, alpha: point.alpha };
        }
      }
      len += l;
      x = +p[5];
      y = +p[6];
    }
    sp += p.shift() + p;
  }
  subpaths.end = sp;

  point = istotal
    ? len
    : findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);

  if (point.alpha) {
    point = { x: point.x, y: point.y, alpha: point.alpha };
  }

  return point;
}

function pathToAbsolute(pathArray) {
  let res = [],
    x = 0,
    y = 0,
    mx = 0,
    my = 0,
    start = 0;
  if (!pathArray) {
    // console.warn("Unexpected state: undefined pathArray"); // shouldn't happen
    return res;
  }
  if (pathArray[0][0] === 'M') {
    x = +pathArray[0][1];
    y = +pathArray[0][2];
    mx = x;
    my = y;
    start++;
    res[0] = ['M', x, y];
  }

  let dots;

  const crz =
    pathArray.length === 3 &&
    pathArray[0][0] === 'M' &&
    pathArray[1][0].toUpperCase() === 'R' &&
    pathArray[2][0].toUpperCase() === 'Z';

  for (let r, pa, i = start, ii = pathArray.length; i < ii; i++) {
    res.push((r = []));
    pa = pathArray[i];
    if (pa[0] !== String.prototype.toUpperCase.call(pa[0])) {
      r[0] = String.prototype.toUpperCase.call(pa[0]);
      switch (r[0]) {
        case 'A':
          r[1] = pa[1];
          r[2] = pa[2];
          r[3] = pa[3];
          r[4] = pa[4];
          r[5] = pa[5];
          r[6] = +(pa[6] + x);
          r[7] = +(pa[7] + y);
          break;
        case 'V':
          r[1] = +pa[1] + y;
          break;
        case 'H':
          r[1] = +pa[1] + x;
          break;
        case 'R':
          dots = [x, y].concat(pa.slice(1));
          for (let j = 2, jj = dots.length; j < jj; j++) {
            dots[j] = +dots[j] + x;
            dots[++j] = +dots[j] + y;
          }
          res.pop();
          res = res.concat(catmullRom2bezier(dots, crz));
          break;
        case 'M':
          mx = +pa[1] + x;
          my = +pa[2] + y;
          break;
        default:
          for (let j = 1, jj = pa.length; j < jj; j++) {
            r[j] = +pa[j] + (j % 2 ? x : y);
          }
      }
    } else if (pa[0] === 'R') {
      dots = [x, y].concat(pa.slice(1));
      res.pop();
      res = res.concat(catmullRom2bezier(dots, crz));
      r = ['R'].concat(pa.slice(-2));
    } else {
      for (let k = 0, kk = pa.length; k < kk; k++) {
        r[k] = pa[k];
      }
    }
    switch (r[0]) {
      case 'Z':
        x = mx;
        y = my;
        break;
      case 'H':
        x = r[1];
        break;
      case 'V':
        y = r[1];
        break;
      case 'M':
        mx = r[r.length - 2];
        my = r[r.length - 1];
        break;
      default:
        x = r[r.length - 2];
        y = r[r.length - 1];
    }
  }
  return res;
}

function path2curve(path, path2) {
  const p = pathToAbsolute(path),
    p2 = path2 && pathToAbsolute(path2);
  const attrs = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null };
  const attrs2 = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null };
  const pcoms1 = []; // path commands of original path p
  const pcoms2 = []; // path commands of original path p2
  let ii;

  const processPath = (path, d, pcom) => {
      let nx;
      let ny;
      const tq = { T: 1, Q: 1 };
      if (!path) {
        return ['C', d.x, d.y, d.x, d.y, d.x, d.y];
      }
      if (!(path[0] in tq)) {
        d.qx = d.qy = null;
      }
      switch (path[0]) {
        case 'M':
          d.X = path[1];
          d.Y = path[2];
          break;
        case 'A':
          path = ['C'].concat(a2c.apply(0, [d.x, d.y].concat(path.slice(1))));
          break;
        case 'S':
          if (pcom === 'C' || pcom === 'S') {
            nx = d.x * 2 - d.bx;
            ny = d.y * 2 - d.by;
          } else {
            nx = d.x;
            ny = d.y;
          }
          path = ['C', nx, ny].concat(path.slice(1));
          break;
        case 'T':
          if (pcom === 'Q' || pcom === 'T') {
            d.qx = d.x * 2 - d.qx;
            d.qy = d.y * 2 - d.qy;
          } else {
            d.qx = d.x;
            d.qy = d.y;
          }
          path = ['C'].concat(q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
          break;
        case 'Q':
          d.qx = path[1];
          d.qy = path[2];
          path = ['C'].concat(
            q2c(d.x, d.y, path[1], path[2], path[3], path[4])
          );
          break;
        case 'L':
          path = ['C'].concat(l2c(d.x, d.y, path[1], path[2]));
          break;
        case 'H':
          path = ['C'].concat(l2c(d.x, d.y, path[1], d.y));
          break;
        case 'V':
          path = ['C'].concat(l2c(d.x, d.y, d.x, path[1]));
          break;
        case 'Z':
          path = ['C'].concat(l2c(d.x, d.y, d.X, d.Y));
          break;
      }
      return path;
    },
    fixArc = (pp, i) => {
      if (pp[i].length > 7) {
        pp[i].shift();
        const pi = pp[i];
        while (pi.length) {
          pcoms1[i] = 'A';
          if (p2) {
            pcoms2[i] = 'A';
          }
          pp.splice(i++, 0, ['C'].concat(pi.splice(0, 6)));
        }
        pp.splice(i, 1);
        ii = Math.max(p.length, (p2 && p2.length) || 0);
      }
    },
    fixM = (path1, path2, a1, a2, i) => {
      if (path1 && path2 && path1[i][0] === 'M' && path2[i][0] !== 'M') {
        path2.splice(i, 0, ['M', a2.x, a2.y]);
        a1.bx = 0;
        a1.by = 0;
        a1.x = path1[i][1];
        a1.y = path1[i][2];
        ii = Math.max(p.length, (p2 && p2.length) || 0);
      }
    };

  let pfirst = ''; // temporary holder for original path command
  let pcom = ''; // holder for previous path command of original path

  ii = Math.max(p.length, (p2 && p2.length) || 0);
  for (let i = 0; i < ii; i++) {
    if (p[i]) {
      pfirst = p[i][0];
    } // save current path command

    if (pfirst !== 'C') {
      pcoms1[i] = pfirst; // Save current path command
      if (i) {
        pcom = pcoms1[i - 1];
      } // Get previous path command pcom
    }
    p[i] = processPath(p[i], attrs, pcom);

    if (pcoms1[i] !== 'A' && pfirst === 'C') {
      pcoms1[i] = 'C';
    }

    fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1

    if (p2) {
      // the same procedures is done to p2
      if (p2[i]) {
        pfirst = p2[i][0];
      }
      if (pfirst !== 'C') {
        pcoms2[i] = pfirst;
        if (i) {
          pcom = pcoms2[i - 1];
        }
      }
      p2[i] = processPath(p2[i], attrs2, pcom);

      if (pcoms2[i] !== 'A' && pfirst === 'C') {
        pcoms2[i] = 'C';
      }

      fixArc(p2, i);
    }
    fixM(p, p2, attrs, attrs2, i);
    fixM(p2, p, attrs2, attrs, i);
    const seg = p[i],
      seg2 = p2 && p2[i],
      seglen = seg.length,
      seg2len = p2 && seg2.length;
    attrs.x = seg[seglen - 2];
    attrs.y = seg[seglen - 1];
    attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
    attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
    attrs2.bx = p2 && (parseFloat(seg2[seg2len - 4]) || attrs2.x);
    attrs2.by = p2 && (parseFloat(seg2[seg2len - 3]) || attrs2.y);
    attrs2.x = p2 && seg2[seg2len - 2];
    attrs2.y = p2 && seg2[seg2len - 1];
  }

  return p2 ? [p, p2] : p;
}

function a2c(x1, y1, rx, ry, angle, lac, sweep_flag, x2, y2, recursive) {
  // for more information of where this Math came from visit:
  // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
  const PI = Math.PI;

  const _120 = PI * 120 / 180;
  let f1;
  let f2;
  let cx;
  let cy;
  const rad = PI / 180 * (+angle || 0);
  let res = [];
  let xy;

  const rotate = (x, y, rad) => {
    const X = x * Math.cos(rad) - y * Math.sin(rad),
      Y = x * Math.sin(rad) + y * Math.cos(rad);
    return { x: X, y: Y };
  };

  if (!recursive) {
    xy = rotate(x1, y1, -rad);
    x1 = xy.x;
    y1 = xy.y;
    xy = rotate(x2, y2, -rad);
    x2 = xy.x;
    y2 = xy.y;
    const x = (x1 - x2) / 2;
    const y = (y1 - y2) / 2;
    let h = x * x / (rx * rx) + y * y / (ry * ry);
    if (h > 1) {
      h = Math.sqrt(h);
      rx = h * rx;
      ry = h * ry;
    }
    const rx2 = rx * rx,
      ry2 = ry * ry;
    const k =
      (lac === sweep_flag ? -1 : 1) *
      Math.sqrt(
        Math.abs(
          (rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)
        )
      );

    cx = k * rx * y / ry + (x1 + x2) / 2;
    cy = k * -ry * x / rx + (y1 + y2) / 2;
    f1 = Math.asin(((y1 - cy) / ry).toFixed(9));
    f2 = Math.asin(((y2 - cy) / ry).toFixed(9));

    f1 = x1 < cx ? PI - f1 : f1;
    f2 = x2 < cx ? PI - f2 : f2;

    if (f1 < 0) {
      f1 = PI * 2 + f1;
    }
    if (f2 < 0) {
      f2 = PI * 2 + f2;
    }

    if (sweep_flag && f1 > f2) {
      f1 = f1 - PI * 2;
    }
    if (!sweep_flag && f2 > f1) {
      f2 = f2 - PI * 2;
    }
  } else {
    f1 = recursive[0];
    f2 = recursive[1];
    cx = recursive[2];
    cy = recursive[3];
  }
  let df = f2 - f1;
  if (Math.abs(df) > _120) {
    const f2old = f2,
      x2old = x2,
      y2old = y2;
    f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
    x2 = cx + rx * Math.cos(f2);
    y2 = cy + ry * Math.sin(f2);
    res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [
      f2,
      f2old,
      cx,
      cy
    ]);
  }
  df = f2 - f1;
  const c1 = Math.cos(f1),
    s1 = Math.sin(f1),
    c2 = Math.cos(f2),
    s2 = Math.sin(f2),
    t = Math.tan(df / 4),
    hx = 4 / 3 * rx * t,
    hy = 4 / 3 * ry * t,
    m1 = [x1, y1],
    m2 = [x1 + hx * s1, y1 - hy * c1],
    m3 = [x2 + hx * s2, y2 - hy * c2],
    m4 = [x2, y2];
  m2[0] = 2 * m1[0] - m2[0];
  m2[1] = 2 * m1[1] - m2[1];
  if (recursive) {
    return [m2, m3, m4].concat(res);
  } else {
    res = [m2, m3, m4]
      .concat(res)
      .join()
      .split(',');
    const newres = [];
    for (let i = 0, ii = res.length; i < ii; i++) {
      newres[i] =
        i % 2
          ? rotate(res[i - 1], res[i], rad).y
          : rotate(res[i], res[i + 1], rad).x;
    }
    return newres;
  }
}

// http://schepers.cc/getting-to-the-point
function catmullRom2bezier(crp, z) {
  const d = [];
  for (let i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
    const p = [
      {
        x: +crp[i - 2],
        y: +crp[i - 1]
      },
      {
        x: +crp[i],
        y: +crp[i + 1]
      },
      {
        x: +crp[i + 2],
        y: +crp[i + 3]
      },
      {
        x: +crp[i + 4],
        y: +crp[i + 5]
      }
    ];
    if (z) {
      if (!i) {
        p[0] = {
          x: +crp[iLen - 2],
          y: +crp[iLen - 1]
        };
      } else if (iLen - 4 === i) {
        p[3] = {
          x: +crp[0],
          y: +crp[1]
        };
      } else if (iLen - 2 === i) {
        p[2] = {
          x: +crp[0],
          y: +crp[1]
        };
        p[3] = {
          x: +crp[2],
          y: +crp[3]
        };
      }
    } else {
      if (iLen - 4 === i) {
        p[3] = p[2];
      } else if (!i) {
        p[0] = {
          x: +crp[i],
          y: +crp[i + 1]
        };
      }
    }
    d.push([
      'C',
      (-p[0].x + 6 * p[1].x + p[2].x) / 6,
      (-p[0].y + 6 * p[1].y + p[2].y) / 6,
      (p[1].x + 6 * p[2].x - p[3].x) / 6,
      (p[1].y + 6 * p[2].y - p[3].y) / 6,
      p[2].x,
      p[2].y
    ]);
  }

  return d;
}

function l2c(x1, y1, x2, y2) {
  return [x1, y1, x2, y2, x2, y2];
}

function q2c(x1, y1, ax, ay, x2, y2) {
  const _13 = 1 / 3,
    _23 = 2 / 3;
  return [
    _13 * x1 + _23 * ax,
    _13 * y1 + _23 * ay,
    _13 * x2 + _23 * ax,
    _13 * y2 + _23 * ay,
    x2,
    y2
  ];
}

function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
  if (z == null) {
    z = 1;
  }
  z = z > 1 ? 1 : z < 0 ? 0 : z;
  const z2 = z / 2;
  const n = 12;
  const Tvalues = [
    -0.1252,
    0.1252,
    -0.3678,
    0.3678,
    -0.5873,
    0.5873,
    -0.7699,
    0.7699,
    -0.9041,
    0.9041,
    -0.9816,
    0.9816
  ];

  let sum = 0;
  const Cvalues = [
    0.2491,
    0.2491,
    0.2335,
    0.2335,
    0.2032,
    0.2032,
    0.1601,
    0.1601,
    0.1069,
    0.1069,
    0.0472,
    0.0472
  ];

  for (let i = 0; i < n; i++) {
    const ct = z2 * Tvalues[i] + z2,
      xbase = base3(ct, x1, x2, x3, x4),
      ybase = base3(ct, y1, y2, y3, y4),
      comb = xbase * xbase + ybase * ybase;
    sum += Cvalues[i] * Math.sqrt(comb);
  }
  return z2 * sum;
}

function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
  if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
    return;
  }
  const t = 1;
  let step = t / 2;
  let t2 = t - step;
  let l;
  const e = 0.01;
  l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
  while (Math.abs(l - ll) > e) {
    step /= 2;
    t2 += (l < ll ? 1 : -1) * step;
    l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
  }
  return t2;
}

function base3(t, p1, p2, p3, p4) {
  const t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
    t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
  return t * t2 - 3 * p1 + 3 * p2;
}

