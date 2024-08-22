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

        rowData.forEach((cellData, cellIndex) => {
            let cell;

            // Check if cell is part of a merged cell
            const mergedCell = data.mergedCells.find(mc => mc.row === rowIndex + 1 && mc.column === cellIndex + 1);

            if (mergedCell) {
                cell = row.insertCell(-1);
                cell.rowSpan = mergedCell.numRows;
                cell.colSpan = mergedCell.numColumns;
                cell.innerHTML = cellData.richText || cellData.text;
                applyStyles(cell, rowIndex, cellIndex, data);
            } else if (!row.cells[cellIndex]) {
                cell = row.insertCell(-1);
                cell.innerHTML = cellData.richText || cellData.text;
                applyStyles(cell, rowIndex, cellIndex, data);
            }
        });
    });

    document.body.appendChild(table);
}

function applyStyles(cell, rowIndex, cellIndex, data) {
    cell.style.backgroundColor = data.backgrounds[rowIndex][cellIndex];
    cell.style.color = data.fontColors[rowIndex][cellIndex];
    cell.style.fontWeight = data.fontWeights[rowIndex][cellIndex];
    cell.style.fontStyle = data.fontStyles[rowIndex][cellIndex];
    cell.style.fontSize = data.fontSizes[rowIndex][cellIndex] + 'px';
    cell.style.textAlign = data.horizontalAlignments[rowIndex][cellIndex];
    cell.style.verticalAlign = data.verticalAlignments[rowIndex][cellIndex];
}
