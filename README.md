# Data Processing Project

## Introduction

This project helps you work with a list of **outsourcing or freelance projects** stored in a simple spreadsheet (CSV) file. It turns that spreadsheet into a clean, structured format (JSON) that you can use in reports, dashboards, or other tools.

**What it does:**

- **Convert project data** — Reads your project list from a CSV file and converts it into JSON.
- **Filter by budget** — You can ask for only those projects that fall within a minimum and maximum budget. For example, "show me projects between $5,000 and $20,000." The result is written to the same output file so it stays in one place.

---

## Usage

You need [Node.js](https://nodejs.org/) installed. From the project folder, run the following in a terminal.

### 1. Process all data

Reads the CSV file (`projects.csv`), converts it to JSON, and writes the result to `projects.json`. Use this to refresh the full project list.

```bash
node cli.js process-data
```

### 2. Filter by budget

Reads the CSV, keeps only projects whose budget is between a minimum and maximum (in dollars), and writes that filtered list to `projects.json`. Both `--min` and `--max` are required.

```bash
node cli.js filterdata --min=5000 --max=15000
```

Replace `5000` and `15000` with your desired minimum and maximum budget amounts.

