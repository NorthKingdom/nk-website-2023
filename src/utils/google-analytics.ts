/**
 *  For Google Analytics
 *  src :: https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/
 */

// Log the pageview from URL (used in _app.js)
export const pageview = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_GA4_TAG, {
    page_path: url,
  })
}

interface EventParams {
  action: string
  category: string
  label: string
  value?: string | number
}

// If we want to use in the future for logging specific events...
export const event = (params: EventParams) => {
  window.gtag('event', params.action, {
    event_category: params.category,
    event_label: params.label,
    value: params.value,
  })
}
