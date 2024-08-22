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

        // Step 1: Render the table cells
        tableData.forEach((rowData, rowIndex) => {
            const row = table.insertRow(-1);
            rowData.forEach((cellData, cellIndex) => {
                const cell = row.insertCell(-1);
                cell.innerHTML = cellData.text || "";
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

        // Step 2: Apply merged cells after creating the table
        mergedCells.forEach((merge) => {
            const startRow = merge.row;
            const startCol = merge.column;
            const numRows = merge.numRows;
            const numCols = merge.numColumns;

            console.log(`Merging cells at row ${startRow}, column ${startCol} spanning ${numRows} rows and ${numCols} columns`);

            // Ensure that the starting cell exists
            if (table.rows[startRow] && table.rows[startRow].cells[startCol]) {
                const cell = table.rows[startRow].cells[startCol];
                cell.rowSpan = numRows;
                cell.colSpan = numCols;

                // Hide the cells that are spanned by the merged cell
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

        // Step 3: Apply additional styling to the entire table after merge
        table.style.width = '100%'; // For full-width table
        table.style.borderCollapse = 'collapse'; // To avoid double borders

        // Step 4: Append table to the document body or a specific container
        document.body.appendChild(table);
    } catch (error) {
        console.error("Error loading JSON data:", error);
    }
}

// Fetch data and render table
fetch('data.json')
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.error('Error fetching JSON:', error));
