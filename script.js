fetch('data.json')
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.error('Error loading JSON data:', error));

function renderTable(data) {
    const table = document.createElement('table');
    document.body.appendChild(table);

    data.tableData.forEach((rowData, rowIndex) => {
        const row = table.insertRow();
        rowData.forEach((cellData, cellIndex) => {
            const cell = row.insertCell();
            cell.textContent = cellData.text;
            cell.style.backgroundColor = data.backgrounds[rowIndex][cellIndex];
            cell.style.color = data.fontColors[rowIndex][cellIndex];
            cell.style.textAlign = data.horizontalAlignments[rowIndex][cellIndex];
            cell.style.verticalAlign = data.verticalAlignments[rowIndex][cellIndex];
            cell.style.fontWeight = data.fontWeights[rowIndex][cellIndex];
            cell.style.fontStyle = data.fontStyles[rowIndex][cellIndex];
            cell.style.fontSize = data.fontSizes[rowIndex][cellIndex] + 'px';
            cell.style.height = data.rowHeights[rowIndex] + 'px';
            cell.style.width = data.columnWidths[cellIndex] + 'px';
            cell.style.whiteSpace = 'pre-wrap';
        });
    });

    applyMergedCells(table, data.mergedCells);
}

function applyMergedCells(table, mergedCells) {
    mergedCells.forEach(cellInfo => {
        const cell = table.rows[cellInfo.row - 1].cells[cellInfo.column - 1];
        cell.rowSpan = cellInfo.numRows;
        cell.colSpan = cellInfo.numColumns;
        for (let i = 0; i < cellInfo.numRows; i++) {
            for (let j = 0; j < cellInfo.numColumns; j++) {
                if (!(i === 0 && j === 0)) {
                    table.rows[cellInfo.row - 1 + i].deleteCell(cellInfo.column - 1);
                }
            }
        }
    });
}
