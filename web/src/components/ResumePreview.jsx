import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';

const ResumePreview = ({ resumeData, templateComponent: TemplateComponent }) => {
  if (!TemplateComponent) {
    return <div className="text-center p-4">Plantilla no disponible</div>;
  }

  return (
    <div className="h-full">
      <PDFViewer width="100%" height="100%" className="border-0">
        <TemplateComponent resume={resumeData} />
      </PDFViewer>
    </div>
  );
};

export default ResumePreview; 