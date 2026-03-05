const path = require('path');
const file = require('./file');

/**
 * SRP: This helper handles ONLY the visual representation of currency.
 */
function formatCurrency(amount, currencyType) {
    if (currencyType === 'euro') {
        // European format: €1.234,56
        return '€' + amount.toLocaleString('de-DE');
    }
    // Default format: $1,234.56
    return '$' + amount.toLocaleString('en-US');
}

function readProjectData(csvPath, currency = 'dollar', saveToDb = false) {
    const rawContent = file.readCsvFile(csvPath);
    if (rawContent === '') return [];

    const lines = rawContent.split(/\r?\n/).filter(line => line.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map(p => p.trim());
        const budgetNum = parseInt(parts[4], 10) || 0;

        result.push({
            projectName: parts[0] || '',
            jobPoster: parts[1] || '',
            budget: budgetNum,
            // Requirement 1: Apply dynamic currency format
            budgetFormatted: formatCurrency(budgetNum, currency),
            completionTime: parts[5] || ''
        });
    }

    // Requirement 2: Support saving to DB for non-filtered processing
    if (saveToDb) {
        file.saveToDatabase(result);
    } else {
        file.writeJsonFile(path.join(__dirname, 'projects.json'), result);
    }

    return result;
}

function getFilteredProjects(csvPath, minBudget, maxBudget, currency) {
    // We pass saveToDb=false because DB support is strictly for non-filtered data
    const data = readProjectData(csvPath, currency, false);

    const filtered = data.filter(p => {
        const b = p.budget || 0;
        return (minBudget == null || b >= minBudget) && (maxBudget == null || b <= maxBudget);
    });

    // Save filtered results to JSON
    file.writeJsonFile(path.join(__dirname, 'projects.json'), filtered);
    return filtered;
}

module.exports = {
    readProjectData,
    getFilteredProjects
};