import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ERPBulkUpload from './modules/erp/ERPBulkUpload';
import WarehouseBulkUpload from './modules/warehouse/WarehouseBulkUpload';
import CRMBulkUpload from './modules/crm/CRMBulkUpload';
import HRBulkUpload from './modules/hr/HRBulkUpload';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/erp/upload" element={<ERPBulkUpload />} />
            <Route path="/warehouse/upload" element={<WarehouseBulkUpload />} />
            <Route path="/crm/upload" element={<CRMBulkUpload />} />
            <Route path="/hr/upload" element={<HRBulkUpload />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;