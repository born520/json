function renderTable(data) {
    try {
        console.log("Starting renderTable function");
        console.log("Data received:", data);

        const table = document.createElement('table');

        data.forEach((rowData, rowIndex) => {
            const row = table.insertRow(-1);
            console.log(`Rendering row ${rowIndex}`, rowData);

            rowData.forEach((cellData, cellIndex) => {
                const cell = row.insertCell(-1);
                console.log(`Adding cell at row ${rowIndex}, column ${cellIndex}`, cellData);

                cell.innerHTML = cellData.content;
                if (cellData.colspan) cell.colSpan = cellData.colspan;
                if (cellData.rowspan) cell.rowSpan = cellData.rowspan;

                console.log(`Cell content: ${cellData.content}, colspan: ${cellData.colspan}, rowspan: ${cellData.rowspan}`);
            });
        });

        applyMergedCells(table, data);
        document.body.appendChild(table);
    } catch (error) {
        console.error("Error loading JSON data:", error);
    }
}

function applyMergedCells(table, data) {
    try {
        console.log("Applying merged cells");

        data.forEach((rowData, rowIndex) => {
            rowData.forEach((cellData, cellIndex) => {
                if (cellData.merged) {
                    console.log(`Merging cells starting at row ${rowIndex}, column ${cellIndex}`);
                    const row = table.rows[rowIndex];
                    const cell = row.cells[cellIndex];

                    if (cellData.merged.colspan) {
                        console.log(`Setting colspan for row ${rowIndex}, column ${cellIndex} to ${cellData.merged.colspan}`);
                        cell.colSpan = cellData.merged.colspan;
                    }

                    if (cellData.merged.rowspan) {
                        console.log(`Setting rowspan for row ${rowIndex}, column ${cellIndex} to ${cellData.merged.rowspan}`);
                        cell.rowSpan = cellData.merged.rowspan;
                    }
                }
            });
        });
    } catch (error) {
        console.error("Error applying merged cells:", error);
    }
}

// Sample invocation (assuming data is already loaded)
fetch('data.json')
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.error("Error fetching JSON data:", error));
