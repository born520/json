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

        let cellIndex = 0;

        rowData.forEach((cellData) => {
            let cell;

            // 병합된 셀의 처리
            const mergedCell = data.mergedCells.find(mc => mc.row === rowIndex + 1 && mc.column === cellIndex + 1);

            if (mergedCell) {
                cell = row.insertCell(-1);
                cell.rowSpan = mergedCell.numRows;
                cell.colSpan = mergedCell.numColumns;
                cell.innerHTML = cellData.richText || cellData.text;
                applyStyles(cell, rowIndex, cellIndex, data);
                
                // 병합된 셀 범위만큼 인덱스 증가
                cellIndex += mergedCell.numColumns;
            } else {
                cell = row.insertCell(-1);
                cell.innerHTML = cellData.richText || cellData.text;
                applyStyles(cell, rowIndex, cellIndex, data);
                cellIndex++;
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
