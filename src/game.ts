class Game {
  public skip(grid: number[][], buffer: number[][]): string[] {
    const out: string[] = [];
    const rows = grid.length;
    const columns = grid[0].length;

    for (let y = 0; y < rows; y++) {
      let line = '';
      for (let x = 0; x < columns; x++) {
        if (grid[y][x] == 1) {
          line += '⚪';
          buffer[y][x] = 1;
        } else {
          line += '⚫';
          buffer[y][x] = 0;
        }
      }
      out.push(line);
    }
    return out;
  }

  public process(grid: number[][], buffer: number[][]) {
    const rows = grid.length;
    const columns = grid[0].length;

    for (let y = 0; y < rows; y++) {
      const top = y - 1 < 0 ? rows - 1 : y - 1;
      const middle_row = y;
      const bottom = y + 1 > rows - 1 ? 0 : y + 1;

      for (let x = 0; x < columns; x++) {
        const left = x - 1 < 0 ? columns - 1 : x - 1;
        const middle_column = x;
        const right = x + 1 > columns - 1 ? 0 : x + 1;

        let count = 0;
        if (grid[top][left] > 0) {
          count++;
        }
        if (grid[top][middle_column] > 0) {
          count++;
        }
        if (grid[top][right] > 0) {
          count++;
        }
        if (grid[middle_row][left] > 0) {
          count++;
        }
        //if (grid[y-0][x-0] != 0) {
        //    count++
        //}
        if (grid[middle_row][right] > 0) {
          count++;
        }
        if (grid[bottom][left] > 0) {
          count++;
        }
        if (grid[bottom][middle_column] > 0) {
          count++;
        }
        if (grid[bottom][right] > 0) {
          count++;
        }

        // game of life
        if (grid[y][x] == 1) {
          // 2. A cell with 2 or 3 live neighbours lives on to the next generation
          if (count == 2 || count == 3) {
            buffer[y][x] = 1;
          } else {
            // 1. A cell with fewer than two live neighbours dies of under-population
            // 3. A cell with more than 3 live neighbours dies of overcrowding
            buffer[y][x]--;
          }
        } else {
          // 4. An empty cell with exactly 3 live neighbours "comes to life"
          if (count == 3) {
            buffer[y][x] = 1;
          } else {
            buffer[y][x]--;
          }
        }
      }
    }
  }
}

export { Game };
