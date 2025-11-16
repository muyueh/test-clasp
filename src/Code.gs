/**
 * Returns a friendly greeting. Mirrors the default Apps Script example
 * provided by `clasp create --type standalone --rootDir src`.
 * @return {string}
 */
function helloWorld() {
  return 'Hello, World!';
}

/**
 * Simple GET endpoint to expose the greeting through a published web app.
 * @return {GoogleAppsScript.Content.TextOutput}
 */
function doGet() {
  return ContentService.createTextOutput(helloWorld()).setMimeType(
    ContentService.MimeType.TEXT
  );
}
