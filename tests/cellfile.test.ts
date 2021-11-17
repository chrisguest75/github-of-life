import { CellFile } from '../src/cellfile';

const hwssCells = `!Name: HWSS
!Author: John Conway
!The fourth most common spaceship (after the glider, lightweight spaceship and middleweight spaceship).
!www.conwaylife.com/wiki/index.php?title=Heavyweight_spaceship
...OO
.O....O
O
O.....O
OOOOOO`;

describe('loading cell files', function () {
  test('works for valid file paths', () => {
    // ARRANGE
    const cellfile = new CellFile();
    // ACT
    const grid = cellfile.parse(hwssCells);
    // ASSERT
    expect(grid.length).toBe(5);

    grid.forEach((element) => {
      expect(element.length).toBe(7);
    });
  });

  test('empty files work', () => {
    // ARRANGE
    const cellfile = new CellFile();
    // ACT
    const grid = cellfile.parse('');
    // ASSERT
    expect(grid.length).toBe(0);
  });

  test('skip comment lines', () => {
    // ARRANGE
    const cellfile = new CellFile();
    // ACT
    const grid = cellfile.parse('!comment\n...\nOOO\n');
    // ASSERT
    expect(grid.length).toBe(2);
    grid.forEach((element) => {
      expect(element.length).toBe(3);
    });
    // expect(true).toBe(false)
  });
});
