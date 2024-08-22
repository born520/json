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
            const cell = document.createElement('td');
            cell.textContent = tableData[i][j].text || '';

            // Apply styles if they exist
            if (tableData[i][j].style) {
                Object.assign(cell.style, tableData[i][j].style);
            }

            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    // Handle merged cells
    mergedCells.forEach(merge => {
        const { row, column, numRows, numColumns } = merge;

        // Check if the row and column indices are within bounds
        if (table.rows[row] && table.rows[row].cells[column]) {
            const cell = table.rows[row].cells[column];
            cell.rowSpan = numRows;
            cell.colSpan = numColumns;

            // Remove cells that are merged into this one
            for (let i = row; i < row + numRows; i++) {
                for (let j = column; j < column + numColumns; j++) {
                    // Ensure the cell exists before trying to delete it
                    if (i !== row || j !== column) {
                        if (table.rows[i] && table.rows[i].cells[j]) {
                            table.rows[i].deleteCell(j);
                        }
                    }
                }
            }
        } else {
            console.error(`Cell to be merged not found at row ${row}, column ${column}`);
        }
    });

    container.appendChild(table);
}
