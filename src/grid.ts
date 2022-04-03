/**
 * The game board state.
 */
class Grid {
  protected _grid: number[][] = [];
  protected _width: number;
  protected _height: number;

  /**
   * Constructs the game grid
   * @param columns Number of columns for grid
   * @param rows Number of rows for grid
   */
  constructor(columns: number, rows: number) {
    this._width = columns;
    this._height = rows;

    for (let j = 0; j < rows; j++) {
      const line: number[] = [];
      for (let i = 0; i < columns; i++) {
        line.push(0);
      }
      this._grid.push(line);
    }
  }

  /**
   * Retrieves the grid 2d array
   */
  public get state(): number[][] {
    return this._grid;
  }

  /**
   * Draw a given 2d sprite onto the game board with clipping.
   * Places the sprite from the centre point
   * @param sprite A 2d array containing the sprite
   * @param x x-coordinate
   * @param y y-coordinate
   */
  public draw_sprite(sprite: number[][], x: number, y: number) {
    const height = sprite.length;
    const width = sprite[0].length;
    y -= Math.floor(height / 2);
    x -= Math.floor(width / 2);
    for (let k = 0; k < height; k++) {
      for (let j = 0; j < width; j++) {
        if (y + k > 0 && y + k < this._height && x + j > 0 && x + j < this._width) {
          this._grid[y + k][x + j] = sprite[k][j];
        }
      }
    }
  }
}

export { Grid };
