document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error("Error loading JSON data:", error));
});

function renderTable(data) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // 병합된 셀들의 위치를 기록하는 객체
    const mergedCellPositions = {};

    // 병합된 셀 정보 설정
    if (data.mergedCells) {
        data.mergedCells.forEach(merge => {
            for (let i = 0; i < merge.numRows; i++) {
                for (let j = 0; j < merge.numColumns; j++) {
                    mergedCellPositions[`${merge.row - 1 + i},${merge.column - 1 + j}`] = true;
                }
            }
        });
    }

    // 테이블 데이터 설정
    data.tableData.forEach((rowData, rowIndex) => {
        const row = document.createElement('tr');

        rowData.forEach((cellData, colIndex) => {
            // 병합된 셀에 속해있으면 건너뜁니다.
            if (mergedCellPositions[`${rowIndex},${colIndex}`]) {
                return;
            }

            const cell = document.createElement('td');
            const mergedCell = data.mergedCells.find(mc => mc.row === rowIndex + 1 && mc.column === colIndex + 1);

            if (mergedCell) {
                cell.rowSpan = mergedCell.numRows || 1;
                cell.colSpan = mergedCell.numColumns || 1;
            }

            cell.innerHTML = cellData.richText || cellData.text || '';

            applyStyles(cell, rowIndex, colIndex, data);
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    document.body.appendChild(table);
}

function applyStyles(cell, rowIndex, colIndex, data) {
    // 스타일 적용 부분
    const backgroundColor = data.backgrounds[rowIndex][colIndex];
    const fontColor = data.fontColors[rowIndex][colIndex];
    const textAlign = data.horizontalAlignments[rowIndex][colIndex];
    const verticalAlign = data.verticalAlignments[rowIndex][colIndex];
    const fontWeight = data.fontWeights[rowIndex][colIndex];
    const fontSize = data.fontSizes[rowIndex][colIndex] + 'px';

    cell.style.backgroundColor = backgroundColor || '';
    cell.style.color = fontColor || '';
    cell.style.textAlign = textAlign || '';
    cell.style.verticalAlign = verticalAlign || '';
    cell.style.fontWeight = fontWeight || '';
    cell.style.fontSize = fontSize || '';
}
