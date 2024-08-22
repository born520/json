document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error("Error loading JSON data:", error));
});

function renderTable(data) {
    const table = document.createElement('table');
    
    data.tableData.forEach((rowData, rowIndex) => {
        const row = table.insertRow();
        let cellIndex = 0; // 셀 삽입 위치를 추적

        rowData.forEach((cellData, colIndex) => {
            // 병합된 셀 여부를 확인하기 위해 병합된 셀 목록 검색
            const mergedCell = data.mergedCells ? data.mergedCells.find(mc => mc.row === rowIndex + 1 && mc.column === colIndex + 1) : null;

            if (mergedCell) {
                // 셀을 추가하기 전에 해당 위치에 이미 병합된 셀이 존재하는지 확인
                while (row.cells[cellIndex]) {
                    cellIndex++;
                }

                const cell = row.insertCell(cellIndex);
                cell.rowSpan = mergedCell.numRows;
                cell.colSpan = mergedCell.numColumns;
                cell.innerHTML = cellData.richText || cellData.text || '';
                applyStyles(cell, rowIndex, colIndex, data);

                // 병합된 셀의 경우, 해당 범위만큼 cellIndex 증가
                cellIndex += mergedCell.numColumns;
            } else {
                // 이미 병합된 셀이 있는 경우 해당 인덱스 건너뜀
                while (row.cells[cellIndex]) {
                    cellIndex++;
                }

                const cell = row.insertCell(cellIndex);
                cell.innerHTML = cellData.richText || cellData.text || '';
                applyStyles(cell, rowIndex, colIndex, data);
                cellIndex++;
            }
        });
    });

    document.body.appendChild(table);
}

function applyStyles(cell, rowIndex, colIndex, data) {
    if (data.styles) {
        const styleData = data.styles.find(s => s.row === rowIndex + 1 && s.column === colIndex + 1);

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
}
