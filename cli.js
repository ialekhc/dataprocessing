const dataservice = require('./dataservice');
const CSV_PATH = 'projects.csv';
const args = process.argv.slice(2);

function parseOption(name) {
    const arg = args.find(a => a.startsWith('--' + name + '='));
    return arg ? arg.split('=')[1] : null;
}

const command = args.find(a => !a.startsWith('--'));
const currency = parseOption('currency') || 'dollar';
const saveTarget = parseOption('save');

if (command === 'process-data') {
    const saveToDb = (saveTarget === 'db');
    const projects = dataservice.readProjectData(CSV_PATH, currency, saveToDb);
    console.log(`Processed ${projects.length} projects using ${currency} format.`);
} else if (command === 'filterdata') {
    const min = parseInt(parseOption('min'), 10);
    const max = parseInt(parseOption('max'), 10);

    const filtered = dataservice.getFilteredProjects(CSV_PATH, min, max, currency);
    console.log(`Filtered ${filtered.length} projects (Saved to projects.json).`);
}