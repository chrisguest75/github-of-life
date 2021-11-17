class CellFile {
  constructor() {
    // do nothing.
  }

  public parse(celltext: string): number[][] {
    const cells = [];
    const lines: string[] = celltext.split('\n');
    const lengths = lines.map((x) => (x.startsWith('!') ? 0 : x.length));
    const linelength = Math.max(...lengths);

    for (let l = 0; l < lines.length; l++) {
      const line = lines[l];
      if (!(line.startsWith('!') || line.length == 0)) {
        //console.log(lines[l])
        const cellline = [];
        for (let c = 0; c < linelength; c++) {
          if (c >= line.length) {
            cellline.push(0);
          } else {
            if (line[c] == '.') {
              cellline.push(0);
            } else if (line[c] == 'O') {
              cellline.push(1);
            }
          }
        }
        cells.push(cellline);
      }
    }

    return cells;
  }
}

export { CellFile };
