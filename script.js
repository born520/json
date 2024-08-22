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
    const mergedCells = data.mergedCells;

    // Create table rows and cells
    for (let i = 0; i < tableData.length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < tableData[i].length; j++) {
            const cellData = tableData[i][j];
            const cell = document.createElement('td');

            cell.textContent = cellData.text || '';

            // Apply styles if they exist
            if (cellData.style) {
                Object.assign(cell.style, cellData.style);
            }

            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    // Handle merged cells
    mergedCells.forEach(merge => {
        const { row, column, numRows, numColumns } = merge;

        // Check if the starting cell exists
        if (table.rows[row] && table.rows[row].cells[column]) {
            const cell = table.rows[row].cells[column];
            cell.rowSpan = numRows;
            cell.colSpan = numColumns;

            // Remove the cells that are merged into the main cell
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numColumns; j++) {
                    if (i !== 0 || j !== 0) {
                        const targetRow = row + i;
                        const targetCol = column + j;
                        if (table.rows[targetRow] && table.rows[targetRow].cells[targetCol]) {
                            table.rows[targetRow].deleteCell(targetCol);
                        }
                    }
                }
            }
        } else {
            console.error(`Failed to merge cells at row ${row}, column ${column}`);
        }
    });

    container.appendChild(table);
}
