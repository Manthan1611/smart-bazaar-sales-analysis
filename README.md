# SMART BAZAAR SALES ANALYSIS
> **An Interactive Retail Sales Analytics and Forecasting System**  
> *College Mini Project in Data Warehousing and Mining (DWM)*

---

## 📌 Project Overview
**Smart Bazaar Sales Analysis** is a complete, interactive business intelligence and predictive sales forecasting web application built for retail management. It processes raw CSV sales datasets, validates and standardizes transaction columns, calculates retail KPIs in **Indian Rupees (₹)**, renders 8 colourful interactive Recharts visualizations, executes 5-year and 7-year linear regression forecasts, and generates downloadable CSV analytical reports.

---

## 🛠️ Technology Stack
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Data Visualizations**: Recharts
- **CSV Parsing Engine**: PapaParse
- **Icons**: Lucide React
- **Styling**: Modern CSS3 (Custom Design System with Inter typography)
- **Currency & Date Standard**: Indian Rupee (`₹` INR) & `DD/MM/YYYY`

---

## 🚀 How to Run locally in VS Code

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Execution Steps
1. Open terminal in VS Code and navigate to the project directory:
   ```bash
   cd "C:\Users\Aenose Joel Gurrala\.gemini\antigravity\scratch\smart-bazaar-sales-analysis"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch Vite local development server:
   ```bash
   npm run dev
   ```

4. Open your web browser at:
   [http://localhost:5173](http://localhost:5173)

---

## 🌟 Key Application Modules

### 1. Overview Dashboard
- Executive KPI Cards: Total Revenue (₹), Total Units Sold, Unique Products, Average Unit Price (₹), Best-Selling Product, Highest-Revenue Product, Average Order Value (₹), YoY Growth Rate (%).
- Dataset Health Diagnostics summary badge.

### 2. CSV Dataset Upload & Preprocessing
- Drag & Drop CSV upload zone with browse button.
- Automatic column alias detection for `Product`, `Price`, `Quantity`, `Revenue`, `Order_Date`, `Category`, `Order_ID`, `Region`.
- Interactive Column Mapper modal for manual header matching.
- First 10 rows formatted preview table.

### 3. Sales Visualizations Dashboard (8 Recharts Visuals)
1. **Top Products by Revenue**: Horizontal bar chart in INR (`₹`).
2. **Top Products by Quantity**: Vertical bar chart of units sold.
3. **Monthly Sales Trend**: Interactive area/line trend.
4. **Category-Wise Share**: Donut chart with department breakdown.
5. **Historical Sales & Future Forecast**: Dual-series line chart comparing empirical actuals vs model projections.
6. **Price vs. Quantity Scatter Plot**: Correlation between selling price and sales volume.
7. **Multi-Product Comparison**: Side-by-side product performance tool.
8. **Year-over-Year Growth**: Annual sales trajectory chart.

### 4. Product Analysis Page
- Individual product lookup and performance deep-dive.
- Product-specific historical trend and 5-year forecast.

### 5. 5-Year & 7-Year Sales Forecasting
- Toggle between 5-year and 7-year forecast horizons.
- OLS Linear Regression algorithm extrapolating future demand.
- Baseline revenue, CAGR, confidence bands (lower & upper bounds), and R-squared fit score.
- Honest limitation handling: Includes a scenario growth simulation mode when historical dates are unavailable.

### 6. Data Explorer & CSV Downloads
- Searchable, sortable, filterable transaction grid with pagination.
- Export options: Original CSV, Cleaned Dataset CSV, Product Summary CSV, Filtered View CSV, Sales Forecast CSV.
- Pure numeric figures in CSV downloads with explicit INR metadata headers.

### 7. Insights & Recommendations
- Automated business intelligence highlighting top revenue drivers, volume drivers, dominant categories, and actionable strategic recommendations.

### 8. About Project Page
- Detailed DWM college mini-project documentation page.

---

## 📁 Project Structure
```
smart-bazaar-sales-analysis/
├── package.json
├── vite.config.js
├── index.html
├── README.md
├── public/
│   └── sample-sales.csv
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── Sidebar.jsx
    │   ├── Header.jsx
    │   ├── KPICard.jsx
    │   ├── CSVUploader.jsx
    │   ├── ColumnMapperModal.jsx
    │   ├── DataTable.jsx
    │   └── ChartCard.jsx
    ├── pages/
    │   ├── Overview.jsx
    │   ├── UploadDataset.jsx
    │   ├── SalesDashboard.jsx
    │   ├── ProductAnalysis.jsx
    │   ├── SalesForecast.jsx
    │   ├── DataExplorer.jsx
    │   ├── Insights.jsx
    │   └── About.jsx
    ├── utils/
    │   ├── csvParser.js
    │   ├── dataCleaning.js
    │   ├── salesCalculations.js
    │   ├── forecasting.js
    │   ├── csvExport.js
    │   ├── formatters.js
    │   └── sampleData.js
    └── styles/
        ├── global.css
        └── dashboard.css
```
