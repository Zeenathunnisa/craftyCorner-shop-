// src/analytics/AnalyticsTracker.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import posthog from 'posthog-js';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics pageview
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }

    // PostHog page capture
    posthog?.capture('$pageview', {
      $current_url: window.location.href,
    });

  }, [location]);

  return null; // This component only handles tracking
};

export default AnalyticsTracker;