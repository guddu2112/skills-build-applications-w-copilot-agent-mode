# Frontend Setup Commands

Run these commands in order:

```bash
# 1. Navigate to workspace root
cd /workspaces/skills-build-applications-w-copilot-agent-mode

# 2. Create React app in frontend directory
npx create-react-app octofit-tracker/frontend

# 3. Navigate to frontend directory
cd octofit-tracker/frontend

# 4. Install additional packages
npm install bootstrap react-router-dom

# 5. Start the development server (optional)
npm start
```

# Update src/index.js

After the React app is created, update `octofit-tracker/frontend/src/index.js` to include:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
```

The key addition is the Bootstrap CSS import: `import 'bootstrap/dist/css/bootstrap.min.css';`