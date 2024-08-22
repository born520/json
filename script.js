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
            const mergedCell = data.mergedCells ? data.mergedCells.find(mc => mc.row === rowIndex + 1 && mc.column === colIndex + 1) : null;

            if (mergedCell) {
                while (row.cells[cellIndex]) {
                    cellIndex++;
                }

                if (cellIndex <= row.cells.length) {
                    const cell = row.insertCell(cellIndex);
                    cell.rowSpan = mergedCell.numRows;
                    cell.colSpan = mergedCell.numColumns;
                    cell.innerHTML = cellData.richText || cellData.text || '';
                    applyStyles(cell, rowIndex, colIndex, data);
                }
                cellIndex += mergedCell.numColumns;
            } else {
                while (row.cells[cellIndex]) {
                    cellIndex++;
                }

                if (cellIndex <= row.cells.length) {
                    const cell = row.insertCell(cellIndex);
                    cell.innerHTML = cellData.richText || cellData.text || '';
                    applyStyles(cell, rowIndex, colIndex, data);
                }
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
