document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error("Error loading JSON data:", error));
});

function renderTable(data) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    data.tableData.forEach((rowData, rowIndex) => {
        const row = document.createElement('tr');
        let cellIndex = 0;

        rowData.forEach((cellData, colIndex) => {
            if (!cellData) return;

            // 병합된 셀 처리
            const mergedCell = data.mergedCells ? data.mergedCells.find(mc => mc.row === rowIndex + 1 && mc.column === colIndex + 1) : null;
            if (mergedCell) {
                const cell = document.createElement('td');
                cell.rowSpan = mergedCell.numRows || 1;
                cell.colSpan = mergedCell.numColumns || 1;
                cell.innerHTML = cellData.richText || cellData.text || '';

                applyStyles(cell, rowIndex, colIndex, data);
                row.appendChild(cell);
                cellIndex += mergedCell.numColumns;
            } else {
                const cell = document.createElement('td');
                cell.innerHTML = cellData.richText || cellData.text || '';

                applyStyles(cell, rowIndex, colIndex, data);
                row.appendChild(cell);
                cellIndex++;
            }
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
