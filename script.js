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

        // Render cells without merging
        tableData.forEach((rowData, rowIndex) => {
            const row = table.insertRow(-1);
            rowData.forEach((cellData, cellIndex) => {
                const cell = row.insertCell(-1);
                cell.innerHTML = cellData.text || ""; // Ensure text is set
                cell.style.backgroundColor = backgrounds[rowIndex][cellIndex] || "transparent";
                cell.style.color = fontColors[rowIndex][cellIndex] || "#000";
                cell.style.textAlign = horizontalAlignments[rowIndex][cellIndex] || "left";
                cell.style.verticalAlign = verticalAlignments[rowIndex][cellIndex] || "top";
                cell.style.fontWeight = fontWeights[rowIndex][cellIndex] || "normal";
                cell.style.fontStyle = fontStyles[rowIndex][cellIndex] || "normal";
                cell.style.fontSize = (fontSizes[rowIndex][cellIndex] || 10) + 'px';
                if (strikethroughs[rowIndex][cellIndex]) {
                    cell.style.textDecoration = 'line-through';
                }
            });
        });

        // Apply merged cells after creating the table
        mergedCells.forEach((merge) => {
            const startRow = merge.row;
            const startCol = merge.column;
            const numRows = merge.numRows;
            const numCols = merge.numColumns;

            console.log(`Merging cells at row ${startRow}, column ${startCol} spanning ${numRows} rows and ${numCols} columns`);

            if (table.rows[startRow] && table.rows[startRow].cells[startCol]) {
                const cell = table.rows[startRow].cells[startCol];
                cell.rowSpan = numRows;
                cell.colSpan = numCols;

                // Hide merged cells (no need to delete them)
                for (let i = startRow; i < startRow + numRows; i++) {
                    for (let j = startCol; j < startCol + numCols; j++) {
                        if (i === startRow && j === startCol) continue;
                        if (table.rows[i] && table.rows[i].cells[j]) {
                            table.rows[i].cells[j].style.display = 'none';
                        }
                    }
                }
            } else {
                console.error(`Cell at row ${startRow}, column ${startCol} does not exist`);
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
