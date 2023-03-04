startGame(16, 16, 40); //ширина, высота и количество мин

//функция для старта начало игры
function startGame(WIDTH, HEIGHT, BOMBS_COUNT) {
    const field = document.querySelector('.field');
    const cellsCount = WIDTH * HEIGHT;
    field.innerHTML = '<button></button>'.repeat(cellsCount);
    const cells = [...field.children];

    let closedCount = cellsCount

    //генерация мин
    const bombs = [...Array(cellsCount).keys()] //индексы бомб
      .sort(() => Math.random() - 0.5)
        .slice(0, BOMBS_COUNT);

    field.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        const  index = cells.indexOf(event.target);
        const column = index % WIDTH;
        const row = Math.floor(index / WIDTH);
        open(row, column);
        // event.target.innerHTML = isBomb(row, column) ? 'X' : ' ';
        // event.target.disabled = true;
    });

    //поверка на валидность
    function isValid(row, column) {
        return row >= 0
            && row < HEIGHT
            && column >= 0
            && column < WIDTH;
    }

    //функция вычисления хрянящихся рядом мин
    function getCount(row, column) {
        let count = 0;
        for (let x = -1; x <= 1; x++){
            for (let y = -1; y <=1; y++){
                if (isBomb(row + y, column + x)){
                    count++;
                }
            }
        }
        return count;
    }

    //функция для открывания кнопок
    function open(row, column) {
        if (!isValid(row, column)) return;

        const index = row * WIDTH + column;
        const cell = cells[index];

        if (cell.disabled === true) return;

        cell.disabled = true;

        if (isBomb(row, column)){
            cell.innerHTML = 'X';
            alert('You have lost(');
            return;
        }

        closedCount--;
        if (closedCount <= BOMBS_COUNT){
            alert('You won!))');
            return;
        }

        const count = getCount(row, column);

        if (count !== 0){
            cell.innerHTML = count;
            return;
        }

        for (let x = -1; x <= 1; x++){
            for (let y = -1; y <=1; y++){
                open(row + y, column + x);
            }
        }
    }

    //поверка ячеек на мину
    function isBomb(row, column) {
        if(!isValid(row, column)) return false;
        const index = row * WIDTH + column; //индекс ячейки

        return bombs.includes(index);
    }
}

