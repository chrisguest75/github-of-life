import { Game } from '../src/game';

test('empty test', () => {
  // ARRANGE
  const game = new Game();
  // ACT
  const grid1 = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  const outgrid = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  game.process(grid1, outgrid);

  // ASSERT
  // because of the screen fade
  grid1.forEach((element) => {
    expect(element).toStrictEqual([0, 0, 0, 0, 0]);
  });
  outgrid.forEach((element) => {
    expect(element).toStrictEqual([-1, -1, -1, -1, -1]);
  });
});

test('A cell with fewer than two live neighbours dies of under-population - nothing surrounds', () => {
  // ARRANGE
  const game = new Game();
  // ACT
  const grid1 = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  const outgrid = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  game.process(grid1, outgrid);

  // ASSERT
  expect(outgrid).toStrictEqual([
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, 0, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ]);
});

test('A cell with fewer than two live neighbours dies of under-population - one surrounds', () => {
  // ARRANGE
  const game = new Game();
  // ACT
  const grid1 = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  const outgrid = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  game.process(grid1, outgrid);

  // ASSERT
  expect(outgrid).toStrictEqual([
    [-1, -1, -1, -1, -1],
    [-1, 0, -1, -1, -1],
    [-1, -1, 0, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ]);
});

test('A cell with 2 or 3 live neighbours lives on to the next generation - ', () => {
  // ARRANGE
  const game = new Game();
  // ACT
  const grid1 = [
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0],
  ];
  const outgrid = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  game.process(grid1, outgrid);

  // ASSERT
  expect(outgrid).toStrictEqual([
    [-1, -1, -1, -1, -1],
    [-1, 0, -1, -1, -1],
    [-1, -1, 1, -1, -1],
    [-1, -1, -1, 0, -1],
    [-1, -1, -1, -1, -1],
  ]);
});

test('A cell with 2 or 3 live neighbours lives on to the next generation - ', () => {
  // ARRANGE
  const game = new Game();
  // ACT
  const grid1 = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  const outgrid = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  game.process(grid1, outgrid);

  // ASSERT
  expect(outgrid).toStrictEqual([
    [-1, -1, -1, -1, -1],
    [-1, 1, 1, -1, -1],
    [-1, 1, 1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ]);
});

/*
4. An empty cell with exactly 3 live neighbours "comes to life"
*/
test('A cell with more than 3 live neighbours dies of overcrowding', () => {
  // ARRANGE
  const game = new Game();
  // ACT
  const grid1 = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  const outgrid = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  game.process(grid1, outgrid);

  // ASSERT
  expect(outgrid).toStrictEqual([
    [-1, -1, 1, -1, -1],
    [-1, 1, 0, 1, -1],
    [-1, 1, 0, 1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ]);
});

test('Simple oscillator', () => {
  // ARRANGE
  const game = new Game();
  // ACT
  const grid1 = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  const outgrid = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  game.process(grid1, outgrid);

  // ASSERT
  expect(outgrid).toStrictEqual([
    [-1, -1, -1, -1, -1],
    [-1, -1, 0, -1, -1],
    [-1, 1, 1, 1, -1],
    [-1, -1, 0, -1, -1],
    [-1, -1, -1, -1, -1],
  ]);
});
