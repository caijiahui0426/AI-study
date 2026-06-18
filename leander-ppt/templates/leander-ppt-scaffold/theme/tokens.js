const theme = {
  fonts: {
    cn: "Microsoft YaHei",
    en: "Century Gothic",
    fallback: "Arial"
  },
  colors: {
    bg: "F5F5F0",
    surface: "FFFFFF",
    surface2: "F3F6FA",
    text: "3D3A32",
    mute: "666666",
    faint: "A8A39A",
    line: "D9D5CB",
    primary: "07195A",
    accent: "C51516",
    accentSoft: "FBECEB",
    blue: "1F6289",
    green: "2F8A5B"
  },
  grid: {
    w: 1920,
    h: 1080,
    safe: { l: 96, t: 80, r: 1824, b: 980 },
    cols: 12,
    gutter: 24
  },
  ppt: {
    layout: { name: "W", width: 13.333, height: 7.5 },
    pxPerIn: 144,
    pxPerPt: 2
  }
};

module.exports = { theme };
