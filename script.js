function renderTable(data) {
    console.log("Starting renderTable function");
    console.log("Data received:", data);

    try {
        const tableData = data.tableData;
        const backgrounds = data.backgrounds;
        const fontColors = data.fontColors;
        const horizontalAlignments = data.horizontalAlignments;
        const verticalAlignments = data.verticalAlignments;
        const fontWeights = data.fontWeights;
        const fontStyles = data.fontStyles;
        const fontSizes = data.fontSizes;
        const strikethroughs = data.strikethroughs;
        const mergedCells = data.mergedCells;

        const table = document.createElement('table');
        tableData.forEach((rowData, rowIndex) => {
            const row = table.insertRow(-1);
            rowData.forEach((cellData, cellIndex) => {
                const cell = row.insertCell(-1);
                cell.innerHTML = cellData.text;
                cell.style.backgroundColor = backgrounds[rowIndex][cellIndex];
                cell.style.color = fontColors[rowIndex][cellIndex];
                cell.style.textAlign = horizontalAlignments[rowIndex][cellIndex];
                cell.style.verticalAlign = verticalAlignments[rowIndex][cellIndex];
                cell.style.fontWeight = fontWeights[rowIndex][cellIndex];
                cell.style.fontStyle = fontStyles[rowIndex][cellIndex];
                cell.style.fontSize = fontSizes[rowIndex][cellIndex] + 'px';
                if (strikethroughs[rowIndex][cellIndex]) {
                    cell.style.textDecoration = 'line-through';
                }
            });
        });

        // Apply merged cells
        mergedCells.forEach((merge) => {
            const startRow = merge.row;
            const startCol = merge.column;
            const numRows = merge.numRows;
            const numCols = merge.numColumns;

            console.log(`Merging cells at row ${startRow}, column ${startCol} spanning ${numRows} rows and ${numCols} columns`);

            const cell = table.rows[startRow].cells[startCol];
            cell.rowSpan = numRows;
            cell.colSpan = numCols;

            // Remove the cells that were merged
            for (let i = 0; i < numRows; i++) {
                for (let j = 0; j < numCols; j++) {
                    if (i === 0 && j === 0) continue; // Skip the original cell
                    const rowToDeleteFrom = startRow + i;
                    const colToDelete = startCol + j;

                    // Ensure we are within the bounds of the table
                    if (rowToDeleteFrom < table.rows.length) {
                        if (colToDelete < table.rows[rowToDeleteFrom].cells.length) {
                            console.log(`Deleting cell at row ${rowToDeleteFrom}, column ${colToDelete}`);
                            table.rows[rowToDeleteFrom].deleteCell(colToDelete);
                        } else {
                            console.warn(`Cannot delete cell at row ${rowToDeleteFrom}, column ${colToDelete} - column out of range`);
                        }
                    } else {
                        console.warn(`Cannot delete cell at row ${rowToDeleteFrom} - row out of range`);
                    }
                }
            }
        });

        document.body.appendChild(table);
    } catch (error) {
        console.error("Error loading JSON data:", error);
    }
}

fetch('data.json')
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.error('Error fetching JSON:', error));
