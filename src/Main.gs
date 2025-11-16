/**
 * Returns a friendly greeting along with metadata about the deployment.
 * @return {GoogleAppsScript.Content.TextOutput}
 */
function doGet() {
  var response = {
    message: 'Hello from the repo-managed Apps Script project!',
    generatedAt: new Date().toISOString(),
    branch: 'work',
  };
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Demonstrates a simple log entry to verify clasp pushes succeeded.
 */
function logHeartbeat() {
  console.log('Apps Script heartbeat @ ' + new Date().toISOString());
}
