document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => renderTable(data))
        .catch(error => console.error("Error loading JSON data:", error));
});

function renderTable(data) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // Object to record merged cell positions
    const mergedCellPositions = {};

    // Set up merged cell information
    if (data.mergedCells) {
        data.mergedCells.forEach(merge => {
            for (let i = 0; i < merge.numRows; i++) {
                for (let j = 0; j < merge.numColumns; j++) {
                    mergedCellPositions[`${merge.row - 1 + i},${merge.column - 1 + j}`] = true;
                }
            }
        });
    }

    // Set up table data
    data.tableData.forEach((rowData, rowIndex) => {
        const row = document.createElement('tr');

        rowData.forEach((cellData, colIndex) => {
            // Skip cells that are part of a merge
            if (mergedCellPositions[`${rowIndex},${colIndex}`]) {
                return;
            }

            const cell = document.createElement('td');
            const mergedCell = data.mergedCells.find(mc => mc.row === rowIndex + 1 && mc.column === colIndex + 1);

            if (mergedCell) {
                cell.rowSpan = mergedCell.numRows || 1;
                cell.colSpan = mergedCell.numColumns || 1;
            }

            cell.innerHTML = cellData.richText || cellData.text || '';

            applyStyles(cell, rowIndex, colIndex, data);
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    document.body.appendChild(table);
}

function applyStyles(cell, rowIndex, colIndex, data) {
    // Apply styling
    const backgroundColor = data.backgrounds[rowIndex][colIndex];
    const fontColor = data.fontColors[rowIndex][colIndex];
    const textAlign = data.horizontalAlignments[rowIndex][colIndex];
    const verticalAlign = data.verticalAlignments[rowIndex][colIndex];
    const fontWeight = data.fontWeights[rowIndex][colIndex];
    const fontSize = data.fontSizes[rowIndex][colIndex] + 'px';

    cell.style.backgroundColor = backgroundColor || '';
    cell.style.color = fontColor || '';
    cell.style.textAlign = textAlign || '';
    cell.style.verticalAlign = verticalAlign || '';
    cell.style.fontWeight = fontWeight || '';
    cell.style.fontSize = fontSize || '';
}
