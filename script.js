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

            if (cellData) {
                cell.textContent = cellData.text || '';

                // Apply styles if they exist
                if (cellData.style) {
                    Object.assign(cell.style, cellData.style);
                }

                row.appendChild(cell);
            } else {
                const emptyCell = document.createElement('td');
                row.appendChild(emptyCell);
            }
        }
        table.appendChild(row);
    }

    // Handle merged cells
    mergedCells.forEach(merge => {
        const { row, column, numRows, numColumns } = merge;

        const cell = table.rows[row].cells[column];
        if (numRows > 1) cell.rowSpan = numRows;
        if (numColumns > 1) cell.colSpan = numColumns;

        for (let i = row; i < row + numRows; i++) {
            for (let j = column; j < column + numColumns; j++) {
                if (i === row && j === column) continue;

                const targetRow = table.rows[i];
                if (targetRow && targetRow.cells[j]) {
                    targetRow.cells[j].remove();
                }
            }
        }
    });

    container.appendChild(table);
}
