document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error('Error loading JSON data:', error));
});

function renderTable(data) {
    const container = document.getElementById('table-container');
    const table = document.createElement('table');

    const tableData = data.tableData;
    const backgrounds = data.backgrounds;
    const fontColors = data.fontColors;
    const horizontalAlignments = data.horizontalAlignments;
    const verticalAlignments = data.verticalAlignments;
    const fontWeights = data.fontWeights;
    const fontStyles = data.fontStyles;
    const fontSizes = data.fontSizes;
    const mergedCells = data.mergedCells;

    const rowCount = tableData.length;
    const colCount = tableData[0].length;

    // Create table rows and cells
    for (let i = 0; i < rowCount; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < colCount; j++) {
            const cellData = tableData[i][j];
            const cell = document.createElement('td');
            cell.textContent = cellData.text;

            // Apply styles
            cell.style.backgroundColor = backgrounds[i][j];
            cell.style.color = fontColors[i][j];
            cell.style.textAlign = horizontalAlignments[i][j];
            cell.style.verticalAlign = verticalAlignments[i][j];
            cell.style.fontWeight = fontWeights[i][j];
            cell.style.fontStyle = fontStyles[i][j];
            cell.style.fontSize = `${fontSizes[i][j]}px`;

            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    // Handle merged cells
    mergedCells.forEach(merge => {
        const { row, column, numRows, numColumns } = merge;
        const cell = table.rows[row - 1].cells[column - 1];
        cell.rowSpan = numRows;
        cell.colSpan = numColumns;

        // Remove the merged cells
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numColumns; j++) {
                if (i > 0 || j > 0) {
                    table.rows[row - 1 + i].deleteCell(column - 1 + j);
                }
            }
        }
    });

    container.appendChild(table);
}
