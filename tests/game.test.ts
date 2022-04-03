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
    expect([0, 0, 0, 0, 0]).toStrictEqual(element);
  });
  outgrid.forEach((element) => {
    expect([-1, -1, -1, -1, -1]).toStrictEqual(element);
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
  expect([
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ]).toStrictEqual(outgrid);
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
  expect([
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ]).toStrictEqual(outgrid);
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
  expect([
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, 1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ]).toStrictEqual(outgrid);
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
  expect([
    [-1, -1, -1, -1, -1],
    [-1, 1, 1, -1, -1],
    [-1, 1, 1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ]).toStrictEqual(outgrid);
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
  expect([
    [-1, -1, 1, -1, -1],
    [-1, 1, -1, 1, -1],
    [-1, 1, -1, 1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ]).toStrictEqual(outgrid);
});
