const fs = require('fs');
const path = require('path');

function readCsvFile(filePath) {
    const resolvedPath = path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath);
    if (!fs.existsSync(resolvedPath)) {
        console.error('File not found:', resolvedPath);
        return '';
    }
    return fs.readFileSync(resolvedPath, 'utf-8');
}

function writeJsonFile(filePath, data) {
    const resolvedPath = path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath);
    fs.writeFileSync(resolvedPath, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * NEW: Responsibility - Data Persistence (Database Mock)
 * This separates the "storage medium" from the "data processing."
 */
function saveToDatabase(data) {
    console.log(`--- [DATABASE STORAGE] ---`);
    console.log(`Successfully saved ${data.length} records to the database.`);
    // Actual SQL/NoSQL connection logic would reside here.
}

module.exports = {
    readCsvFile,
    writeJsonFile,
    saveToDatabase 
};