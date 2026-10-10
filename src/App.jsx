import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { Header } from './components/Header.jsx';
import { ColumnMapperModal } from './components/ColumnMapperModal.jsx';

import { OverviewPage } from './pages/Overview.jsx';
import { UploadDatasetPage } from './pages/UploadDataset.jsx';
import { SalesDashboardPage } from './pages/SalesDashboard.jsx';
import { ProductAnalysisPage } from './pages/ProductAnalysis.jsx';
import { SalesForecastPage } from './pages/SalesForecast.jsx';
import { DataExplorerPage } from './pages/DataExplorer.jsx';
import { InsightsPage } from './pages/Insights.jsx';
import { AboutPage } from './pages/About.jsx';

import { parseCSVData } from './utils/csvParser.js';
import { cleanDataset } from './utils/dataCleaning.js';
import { computeSalesMetrics } from './utils/salesCalculations.js';
import { SAMPLE_CSV_STRING } from './utils/sampleData.js';

import './styles/global.css';
import './styles/dashboard.css';

export function App() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [rawData, setRawData] = useState(null);
  const [parseResult, setParseResult] = useState(null);
  const [columnMapping, setColumnMapping] = useState(null);
  const [cleaningResult, setCleaningResult] = useState(null);
  
  const [isSample, setIsSample] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMapperModalOpen, setIsMapperModalOpen] = useState(false);

  // Compute aggregated sales metrics whenever cleaned rows change
  const metrics = useMemo(() => {
    if (!cleaningResult || !cleaningResult.cleanedRows) return null;
    return computeSalesMetrics(cleaningResult.cleanedRows);
  }, [cleaningResult]);

  // Load sample dataset helper
  const processCSVContent = async (fileOrString, isSampleData = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const parsed = await parseCSVData(fileOrString);
      setParseResult(parsed);
      setRawData(parsed.rawData);
      setColumnMapping(parsed.detectedMapping);

      const cleaned = cleanDataset(parsed.rawData, parsed.detectedMapping);
      setCleaningResult(cleaned);
      setIsSample(isSampleData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while parsing the CSV file.');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-load sample Indian retail sales dataset on first mount
  useEffect(() => {
    processCSVContent(SAMPLE_CSV_STRING, true);
  }, []);

  const handleFileUpload = (file) => {
    processCSVContent(file, false);
  };

  const handleLoadSample = () => {
    processCSVContent(SAMPLE_CSV_STRING, true);
  };

  const handleSaveMapping = (newMapping) => {
    setColumnMapping(newMapping);
    if (rawData) {
      const cleaned = cleanDataset(rawData, newMapping);
      setCleaningResult(cleaned);
    }
    setIsMapperModalOpen(false);
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="main-content">
        {/* Top Header */}
        <Header
          isSample={isSample}
          datasetSummary={cleaningResult?.summary}
          onLoadSample={handleLoadSample}
          onNavigateUpload={() => setActiveTab('upload')}
        />

        {/* Page Content Body */}
        <main className="page-body">
          {activeTab === 'overview' && (
            <OverviewPage
              metrics={metrics}
              cleaningSummary={cleaningResult?.summary}
              isSample={isSample}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'upload' && (
            <UploadDatasetPage
              onFileUpload={handleFileUpload}
              onLoadSample={handleLoadSample}
              isLoading={isLoading}
              error={error}
              parseResult={parseResult}
              cleaningResult={cleaningResult}
              columnMapping={columnMapping}
              onOpenMapperModal={() => setIsMapperModalOpen(true)}
            />
          )}

          {activeTab === 'dashboard' && (
            <SalesDashboardPage
              metrics={metrics}
              cleanedRows={cleaningResult?.cleanedRows}
            />
          )}

          {activeTab === 'product' && (
            <ProductAnalysisPage
              metrics={metrics}
              cleanedRows={cleaningResult?.cleanedRows}
            />
          )}

          {activeTab === 'forecast' && (
            <SalesForecastPage
              cleanedRows={cleaningResult?.cleanedRows}
              metrics={metrics}
            />
          )}

          {activeTab === 'explorer' && (
            <DataExplorerPage
              rawData={rawData}
              cleanedRows={cleaningResult?.cleanedRows}
              metrics={metrics}
            />
          )}

          {activeTab === 'insights' && (
            <InsightsPage metrics={metrics} />
          )}

          {activeTab === 'about' && (
            <AboutPage />
          )}
        </main>
      </div>

      {/* Manual Column Mapping Modal */}
      {isMapperModalOpen && parseResult && (
        <ColumnMapperModal
          headers={parseResult.headers}
          currentMapping={columnMapping}
          onSave={handleSaveMapping}
          onClose={() => setIsMapperModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
