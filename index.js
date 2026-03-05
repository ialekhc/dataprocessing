const dataservice = require('./dataservice');

const CSV_PATH = 'projects.csv';

// Start data processing
const projects = dataservice.readProjectData(CSV_PATH);

console.log('Data processing complete. Total projects:', projects.length);
