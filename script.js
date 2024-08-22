document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error("Error loading JSON data:", error));
});

function renderTable(data) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // 병합된 셀들을 먼저 처리하여 중복을 방지합니다.
    const mergedCellPositions = {};

    if (data.mergedCells) {
        data.mergedCells.forEach(merge => {
            for (let i = 0; i < merge.numRows; i++) {
                for (let j = 0; j < merge.numColumns; j++) {
                    mergedCellPositions[`${merge.row + i},${merge.column + j}`] = true;
                }
            }
        });
    }

    data.tableData.forEach((rowData, rowIndex) => {
        const row = document.createElement('tr');

        rowData.forEach((cellData, colIndex) => {
            // 이미 병합된 셀에 포함된 위치라면 건너뜁니다.
            if (mergedCellPositions[`${rowIndex + 1},${colIndex + 1}`]) {
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
    const styleData = data.styles ? data.styles.find(s => s.row === rowIndex + 1 && s.column === colIndex + 1) : null;

    if (styleData) {
        cell.style.backgroundColor = styleData.backgroundColor || '';
        cell.style.color = styleData.fontColor || '';
        cell.style.fontWeight = styleData.fontWeight || '';
        cell.style.fontStyle = styleData.fontStyle || '';
        cell.style.fontSize = styleData.fontSize ? styleData.fontSize + 'px' : '';
        cell.style.textAlign = styleData.textAlign || '';
        cell.style.verticalAlign = styleData.verticalAlign || '';
    }
}
