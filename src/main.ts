import { CellFile } from './cellfile';
import { Grid } from './grid';
import { Game } from './game';
import data from './index.json';
import build from './build.json';
import * as Cookies from 'js-cookie';

/**
 * @interface FullScreennHTMLCanvasElement
 */
interface FullScreennHTMLCanvasElement extends HTMLCanvasElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
}

const tile_width = 20;
const tile_height = 20;

let columns = 1;
let rows = 1;
let grid_1 = new Grid(columns, rows);
let grid_2 = new Grid(columns, rows);
let grids: [Grid, Grid] = [grid_1, grid_2];
const game = new Game();
let current = 0;
let file_loaded = '';
let file_selected = './cells/gosperglidergun.cells';

let initial_cells: Array<Array<number>> = [];
const cellfile = new CellFile();

/**
 * goFullScreen
 */
function goFullScreen() {
  const canvas = <FullScreennHTMLCanvasElement>document.getElementById('github');
  if (canvas != null) {
    if (canvas.requestFullscreen) canvas.requestFullscreen();
    else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
    else if (canvas.mozRequestFullScreen) canvas.mozRequestFullScreen();
  }
}

async function create() {
  const defaultselected = Cookies.get('selected');
  if (defaultselected == undefined) {
    file_selected = './cells/gosperglidergun.cells';
  } else {
    file_selected = defaultselected;
  }

  const buildnumber = document.getElementById('buildnumber');
  if (buildnumber != null) {
    buildnumber.textContent = 'commitid:' + build.build;
  }

  const select = <HTMLSelectElement>document.getElementById('settings_select');
  if (select != null) {
    let selectindex = 0;
    for (let i = 0; i < data.files.length; i++) {
      const opt = document.createElement('option');
      opt.value = './cells/' + data.files[i] + '.cells';
      opt.textContent = data.files[i];
      if (file_selected == opt.value) {
        selectindex = i;
      }
      select.appendChild(opt);
    }
    select.selectedIndex = selectindex;

    select.onchange = function (e) {
      if (e.target != null) {
        file_selected = (e.target as HTMLInputElement).value;
        Cookies.set('selected', file_selected);
      }
    };
  }

  const canvas = document.getElementById('github');
  if (canvas != null) {
    canvas.addEventListener('click', () => {
      goFullScreen();
    });
  }
  setInterval(update, 60);
}

function loadnew(columns: number, rows: number) {
  grid_1 = new Grid(columns, rows);
  grid_2 = new Grid(columns, rows);
  current = 0;
  grids = [grid_1, grid_2];
  grids[0].draw_sprite(initial_cells, Math.floor(columns / 2), Math.floor(rows / 2));
}

function resize(vw: number, vh: number) {
  const new_columns = Math.floor(vw / tile_width + 1);
  const new_rows = Math.floor(vh / tile_height + 1);
  if (new_columns != columns || new_rows != rows) {
    columns = new_columns;
    rows = new_rows;
    loadnew(columns, rows);
  }
}

async function update() {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  if (file_loaded != file_selected) {
    file_loaded = file_selected;
    const response = await window.fetch(file_loaded, {});
    response.text().then(function (text: string) {
      console.log(text);
      initial_cells = cellfile.parse(text);
      loadnew(columns, rows);
    });
  } else {
    resize(vw, vh);

    const grid = grids[current];
    current = (current + 1) % 2;
    const buffer = grids[current];
    game.process(grid.state, buffer.state);

    const canvas = <HTMLCanvasElement>document.getElementById('github');
    canvas.width = vw;
    canvas.height = vh;
    const context = canvas.getContext('2d');
    if (context == null) {
      console.log('Canvas context is null');
      return;
    }
    const cw = columns;
    const ch = rows;

    const normalColours = ['#181122', '#0e4429', '#006d32', '#26a641', '#39d353'];
    const halloweenColours = ['#181122', '#631c03', '#bd561d', '#fa7a18', '#fddf68'];
    let colours = normalColours;

    const today = new Date();
    if (today.getDate() == 31 && today.getMonth() == 9) {
      colours = halloweenColours;
    }

    context.clearRect(0, 0, cw, ch);
    for (let y = 0; y < ch; y++) {
      for (let x = 0; x < cw; x++) {
        // offset the array
        let colourIndex = buffer.state[y][x] + 3;
        if (colourIndex <= 0) {
          colourIndex = 0;
        }
        context.fillStyle = colours[colourIndex];
        context.fillRect(x * tile_width, y * tile_height, 17, 17);
      }
    }
  }
}

create();
