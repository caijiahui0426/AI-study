function icon(pptx, slide, U, cx, cy, type, opts = {}) {
  const c = opts.color || "07195A";
  const soft = opts.soft || "F3F6FA";
  const line = { color: c, width: opts.width || 1.4 };
  const fill = { color: soft };
  const none = { type: "none" };
  const shape = pptx.ShapeType;
  const addCircle = (x, y, r, f = fill, l = line) => {
    slide.addShape(shape.ellipse, { x: U(x - r), y: U(y - r), w: U(2 * r), h: U(2 * r), fill: f, line: l });
  };
  const addLine = (x1, y1, x2, y2, endArrowType) => {
    slide.addShape(shape.line, {
      x: U(Math.min(x1, x2)), y: U(Math.min(y1, y2)),
      w: U(Math.abs(x2 - x1) || 0.01), h: U(Math.abs(y2 - y1) || 0.01),
      line: { ...line, endArrowType },
      flipH: x2 < x1,
      flipV: y2 < y1
    });
  };

  if (type === "document") {
    slide.addShape(shape.roundRect, { x: U(cx - 22), y: U(cy - 26), w: U(44), h: U(52), fill, line, rectRadius: U(5) });
    addLine(cx - 12, cy - 7, cx + 12, cy - 7);
    addLine(cx - 12, cy + 6, cx + 12, cy + 6);
  } else if (type === "person") {
    addCircle(cx, cy - 14, 11);
    slide.addShape(shape.roundRect, { x: U(cx - 23), y: U(cy + 2), w: U(46), h: U(28), fill, line, rectRadius: U(13) });
  } else if (type === "hub") {
    addCircle(cx, cy, 16, { color: c }, none);
    [[-42, -32], [42, -32], [-42, 32], [42, 32]].forEach(([dx, dy]) => {
      addLine(cx, cy, cx + dx, cy + dy);
      addCircle(cx + dx, cy + dy, 8);
    });
  } else if (type === "chart") {
    [18, 32, 46].forEach((h, i) => {
      slide.addShape(shape.rect, { x: U(cx - 26 + i * 20), y: U(cy + 24 - h), w: U(12), h: U(h), fill: { color: i === 2 ? c : soft }, line });
    });
    addLine(cx - 34, cy + 24, cx + 34, cy + 24);
  } else if (type === "arrow") {
    addLine(cx - 30, cy + 20, cx + 24, cy - 22, "triangle");
    addLine(cx - 30, cy + 20, cx + 30, cy + 20);
  } else if (type === "shield") {
    slide.addShape(shape.roundRect, { x: U(cx - 23), y: U(cy - 23), w: U(46), h: U(46), fill, line, rectRadius: U(10) });
    slide.addText("OK", { x: U(cx - 18), y: U(cy - 11), w: U(36), h: U(22), fontFace: "Century Gothic", fontSize: 10, color: c, bold: true, align: "center", valign: "mid", margin: 0 });
  } else if (type === "clock") {
    addCircle(cx, cy, 25);
    addLine(cx, cy, cx, cy - 14);
    addLine(cx, cy, cx + 13, cy + 8);
  } else {
    addCircle(cx, cy, 24);
    slide.addText("i", { x: U(cx - 18), y: U(cy - 16), w: U(36), h: U(32), fontFace: "Century Gothic", fontSize: 20, color: c, bold: true, align: "center", valign: "mid", margin: 0 });
  }
}

module.exports = { icon };
