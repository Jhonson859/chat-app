import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerLicense } from '@syncfusion/ej2-base';
import './index.css'

import App from './App.tsx'
registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXxfdXRSRGFYVERwVks=');


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
