/**
 * Google Apps Script - Portfolio CMS Backend
 * 
 * This script serves as the backend for the portfolio CMS.
 * It connects to Google Sheets to store and retrieve page content.
 * 
 * DEPLOYMENT:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this entire code
 * 4. Deploy → New deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL
 * 6. Paste it into the CMS Settings page
 * 
 * SHEETS STRUCTURE:
 * - "Content" sheet: Cell A1 stores the full JSON content
 * - "Settings" sheet: A1=Username header, B1=Password header,
 *                     A2=admin username, B2=admin password
 */

// This constant defines the sheet name for content storage
const CONTENT_SHEET_NAME = 'Content';

// This constant defines the sheet name for settings/credentials
const SETTINGS_SHEET_NAME = 'Settings';

/**
 * This function handles GET requests to retrieve page content.
 * Returns the stored JSON content from the Content sheet.
 */
function doGet() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(CONTENT_SHEET_NAME);
    
    if (!sheet) {
      return createJsonResponse({ error: 'Content sheet not found' });
    }
    
    const data = sheet.getRange('A1').getValue();
    if (!data) {
      return createJsonResponse({});
    }
    
    return createJsonResponse(JSON.parse(data));
  } catch (error) {
    return createJsonResponse({ error: error.message });
  }
}

/**
 * This function handles POST requests for login and content updates.
 * Supports two actions:
 * - "login": Validates admin credentials against the Settings sheet
 * - "update": Saves updated content to the Content sheet
 */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    
    // Handle login action - validates credentials
    if (body.action === 'login') {
      return handleLogin(body.username, body.password);
    }

    // Handle change credentials action
    if (body.action === 'changeCredentials') {
      return handleChangeCredentials(body.newUsername, body.newPassword);
    }
    
    // Handle content update action
    if (body.action === 'update') {
      return handleContentUpdate(body.data);
    }
    
    return createJsonResponse({ error: 'Invalid action' });
  } catch (error) {
    return createJsonResponse({ error: error.message });
  }
}

/**
 * This function validates admin login credentials.
 * Checks against the Settings sheet first, then falls back to defaults.
 */
function handleLogin(username, password) {
  try {
    const settingsSheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(SETTINGS_SHEET_NAME);
    
    if (settingsSheet) {
      const lastRow = settingsSheet.getLastRow();
      if (lastRow >= 2) {
        const credentials = settingsSheet.getRange(2, 1, lastRow - 1, 2).getValues();
        
        for (let i = 0; i < credentials.length; i++) {
          if (credentials[i][0] === username && credentials[i][1] === password) {
            return createJsonResponse({ success: true, username: username });
          }
        }
      }
    }
    
    // Default fallback credentials for initial setup
    if (username === 'admin' && password === 'admin123') {
      return createJsonResponse({ success: true, username: username });
    }
    
    return createJsonResponse({ success: false, error: 'Invalid credentials' });
  } catch (error) {
    return createJsonResponse({ success: false, error: error.message });
  }
}

/**
 * This function updates the admin login credentials.
 * Modifies the first credential entry in the Settings sheet.
 */
function handleChangeCredentials(newUsername, newPassword) {
  try {
    let settingsSheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(SETTINGS_SHEET_NAME);
    
    if (!settingsSheet) {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      settingsSheet = ss.insertSheet(SETTINGS_SHEET_NAME);
      settingsSheet.getRange('A1:B1').setValues([['Username', 'Password']]);
    }
    
    // Always update the first credentials row (row 2)
    settingsSheet.getRange('A2:B2').setValues([[newUsername, newPassword]]);
    
    return createJsonResponse({ success: true, message: 'Credentials updated successfully' });
  } catch (error) {
    return createJsonResponse({ success: false, error: error.message });
  }
}

/**
 * This function updates the page content in the Content sheet.
 * Stores the full JSON content in cell A1 of the Content sheet.
 */
function handleContentUpdate(data) {
  try {
    let sheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(CONTENT_SHEET_NAME);
    
    // Create the Content sheet if it doesn't exist
    if (!sheet) {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      sheet = ss.insertSheet(CONTENT_SHEET_NAME);
    }
    
    // Store the full JSON content in cell A1
    sheet.getRange('A1').setValue(JSON.stringify(data));
    
    return createJsonResponse(data);
  } catch (error) {
    return createJsonResponse({ error: error.message });
  }
}

/**
 * This function creates a JSON response for the web app.
 * Sets the proper MIME type for cross-origin requests.
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * This function initializes the spreadsheet with required sheets.
 * Run this once after setting up the Apps Script project.
 */
function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create Content sheet if missing
  let contentSheet = ss.getSheetByName(CONTENT_SHEET_NAME);
  if (!contentSheet) {
    contentSheet = ss.insertSheet(CONTENT_SHEET_NAME);
    contentSheet.getRange('A1').setValue('{}');
  }
  
  // Create Settings sheet if missing
  let settingsSheet = ss.getSheetByName(SETTINGS_SHEET_NAME);
  if (!settingsSheet) {
    settingsSheet = ss.insertSheet(SETTINGS_SHEET_NAME);
    settingsSheet.getRange('A1:B1').setValues([['Username', 'Password']]);
    settingsSheet.getRange('A2:B2').setValues([['admin', 'admin123']]);
    settingsSheet.setColumnWidth(1, 200);
    settingsSheet.setColumnWidth(2, 200);
  }
  
  Logger.log('Sheets initialized successfully!');
}
