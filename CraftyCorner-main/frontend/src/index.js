import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { PostHogProvider } from 'posthog-js/react';
import { initGA } from "./gtag"; // <-- Import GA init function

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
};

// Initialize Google Analytics
initGA();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PostHogProvider 
        apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
        options={options}
      >
        <App />
      </PostHogProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();