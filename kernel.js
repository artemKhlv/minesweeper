launchMinesweeper(16, 16, 40); //ширина, высота и количество мин

//функция старта начало игры
function launchMinesweeper(BREADTH, THICKNESS, MINE_COUNT) {
    const margin = document.querySelector('.field');
    const slotsCalculate = BREADTH * THICKNESS;
    margin.innerHTML = '<button></button>'.repeat(slotsCalculate);
    const cells = [...margin.children];

    let besideMine = slotsCalculate

    //генерация мин
    const mines = [...Array(slotsCalculate).keys()] //индексы бомб
      .sort(() => Math.random() - 0.5)
        .slice(0, MINE_COUNT);

    margin.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        const  point = cells.indexOf(event.target);
        const column = point % BREADTH;
        const row = Math.floor(point / BREADTH);
        open(row, column);
    });

    //проверка на валидность
    function isPermissible(row, column) {
        return row >= 0 && row < THICKNESS && column >= 0 && column < BREADTH;
    }

    //функция вычисления хрянящихся рядом мин
    function getCount(row, column) {
        let figures = 0;
        for (let x = -1; x <= 1; x++){
            for (let y = -1; y <=1; y++){
                if (isMine(row + y, column + x)){
                    figures++;
                }
            }
        }
        return figures;
    }

    //функция для открывания ячеек
    function open(row, column) {
        if (!isPermissible(row, column)){
            return;
        }
        const point = row * BREADTH + column;
        const slot = cells[point];

        if (slot.disabled === true){
            return;
        }
        slot.disabled = true;

        if (isMine(row, column)){
            slot.innerHTML = 'X';
            alert('You have lost(');
            return;
        }

        besideMine--;
        if (besideMine <= MINE_COUNT){
            alert('You won!))');
            return;
        }
        const count = getCount(row, column);

        if (count !== 0){
            slot.innerHTML = count;
            return;
        }

        for (let x = -1; x <= 1; x++){
            for (let y = -1; y <=1; y++){
                open(row + y, column + x);
            }
        }
    }

    //поверка ячеек на мину
    function isMine(row, column) {
        if(!isPermissible(row, column)){
            return false;
        }
        const point = row * BREADTH + column; //индекс ячейки
        return mines.includes(point);
    }
}

