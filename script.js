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
        let cellIndex = 0;

        rowData.forEach((cellData, colIndex) => {
            if (cellData) {
                const cell = row.insertCell(cellIndex);

                // 병합된 셀 처리
                const mergedCell = data.mergedCells.find(mc => mc.row === rowIndex + 1 && mc.column === colIndex + 1);

                if (mergedCell) {
                    cell.rowSpan = mergedCell.numRows;
                    cell.colSpan = mergedCell.numColumns;
                    cell.innerHTML = cellData.richText || cellData.text;
                    applyStyles(cell, rowIndex, colIndex, data);
                    
                    // 병합된 셀 범위만큼 인덱스 증가
                    cellIndex += mergedCell.numColumns;
                } else {
                    cell.innerHTML = cellData.richText || cellData.text;
                    applyStyles(cell, rowIndex, colIndex, data);
                    cellIndex++;
                }
            } else {
                cellIndex++;
            }
        });
    });

    document.body.appendChild(table);
}

function applyStyles(cell, rowIndex, colIndex, data) {
    const styleData = data.styles.find(s => s.row === rowIndex + 1 && s.column === colIndex + 1);

    if (styleData) {
        cell.style.backgroundColor = styleData.backgroundColor;
        cell.style.color = styleData.fontColor;
        cell.style.fontWeight = styleData.fontWeight;
        cell.style.fontStyle = styleData.fontStyle;
        cell.style.fontSize = styleData.fontSize + 'px';
        cell.style.textAlign = styleData.textAlign;
        cell.style.verticalAlign = styleData.verticalAlign;
    }
}
