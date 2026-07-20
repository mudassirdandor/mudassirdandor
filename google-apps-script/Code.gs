/**
 * Mudassir Javed | Business Intelligence & Data Analytics Portfolio
 * Production Google Apps Script (GAS) Backend Service - v0.7.0 (Sprint 6A.7)
 * 
 * This service manages portfolio submissions, stores contacts, logs resume downloads,
 * dispatches notifications and client confirmations, and generates comprehensive operational audits.
 */

// ==========================================
// 1. SYSTEM AUDIT & LOGGING SERVICE
// ==========================================

/**
 * Handles persistent database-style system logging to a "SystemLogs" spreadsheet.
 * Falls back gracefully to standard console logging in case of sheet access issues.
 */
var SystemLogs = {
  /**
   * Records a structured audit entry in the SystemLogs spreadsheet.
   * 
   * @param {string} level - Log level ("INFO", "WARN", "ERROR").
   * @param {string} service - The system module or service ("Router", "ContactService", "EmailService", "ResumeService").
   * @param {string} action - The programmatic action being performed (e.g. "Incoming Request", "Contact Created").
   * @param {string} details - Detailed descriptive message regarding the event.
   * @param {string} requestId - The unique request tracking identifier.
   */
  log: function(level, service, action, details, requestId) {
    var timestamp = new Date().toISOString();
    var reqId = requestId || "N/A";
    
    // Output log to standard Stackdriver Execution Log
    Logger.log("[" + level + "] [" + service + "] [" + action + "] Request ID: " + reqId + " - " + details);
    
    // Attempt to persist the log in Google Sheets "SystemLogs" for deep auditable traceability
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      if (ss) {
        var sheet = ss.getSheetByName("SystemLogs");
        if (!sheet) {
          // Auto-provision log sheet with correct column headers if missing
          sheet = ss.insertSheet("SystemLogs");
          sheet.appendRow(["Timestamp", "Request ID", "Level", "Service", "Action", "Details"]);
        }
        sheet.appendRow([timestamp, reqId, level, service, action, details]);
      }
    } catch (e) {
      Logger.log("Failed to write to SystemLogs sheet: " + e.toString());
    }
  }
};

// ==========================================
// 2. COMMUNICATIONS & EMAIL SERVICE
// ==========================================

/**
 * Service governing email operations.
 * Resolves to structured action logs instead of simple true/false booleans.
 */
var EmailService = {
  /**
   * Dispatches a confirmation email to the inquiring client.
   * 
   * @param {string} email - Recipient client email address.
   * @param {string} name - Recipient client full name.
   * @param {string} requestId - The unique tracking reference identifier.
   * @returns {object} Structured completion status payload.
   */
  sendClientConfirmation: function(email, name, requestId) {
    var action = "Client Confirmation";
    var subject = "Contact Inquiry Received - Ref: " + requestId;
    var body = "Hi " + name + ",\n\n" +
               "Thank you for reaching out and initiating connection.\n" +
               "This is an automated confirmation verifying that your message has been received and added to our queue.\n" +
               "I will review your inquiry details and follow up with you personally shortly.\n\n" +
               "Reference Number: " + requestId + "\n\n" +
               "Best regards,\n" +
               "Mudassir Javed\n" +
               "Business Intelligence & Data Analytics";
               
    try {
      MailApp.sendEmail({
        to: email,
        subject: subject,
        body: body
      });
      
      var details = "Recipient: " + email + " | Reference Number: " + requestId + " | Subject: " + subject;
      SystemLogs.log("INFO", "EmailService", "Client Confirmation Sent", details, requestId);
      
      return {
        success: true,
        action: action,
        recipient: email,
        message: "Email sent successfully."
      };
    } catch (err) {
      var errMsg = err.toString();
      var failDetails = "Recipient: " + email + " | Reference Number: " + requestId + " | Subject: " + subject + " | Error: " + errMsg;
      SystemLogs.log("ERROR", "EmailService", "Client Confirmation Failed", failDetails, requestId);
      
      return {
        success: false,
        action: action,
        recipient: email,
        message: errMsg
      };
    }
  },

  /**
   * Dispatches a detailed admin alert notifying the site owner of a new message.
   * 
   * @param {object} contactData - The incoming contact metadata and request payload.
   * @param {string} requestId - The unique tracking reference identifier.
   * @returns {object} Structured completion status payload.
   */
  sendOwnerNotification: function(contactData, requestId) {
    var action = "Owner Notification";
    var ownerEmail = Session.getActiveUser().getEmail() || "owner@example.com";
    var subject = "New Portfolio Inquiry from " + contactData.fullName + " - Ref: " + requestId;
    var body = "You have received a new business inquiry from your portfolio website.\n\n" +
               "Reference Details:\n" +
               "- Reference Number: " + requestId + "\n" +
               "- Name: " + contactData.fullName + "\n" +
               "- Email: " + contactData.email + "\n" +
               "- Organization: " + (contactData.organization || "N/A") + "\n" +
               "- Subject: " + contactData.subject + "\n\n" +
               "Message Core:\n" + contactData.message + "\n\n" +
               "Navigation Details:\n" +
               "- Source: " + (contactData.source || "Portfolio Website") + "\n" +
               "- Page: " + (contactData.page || "/") + "\n";

    try {
      MailApp.sendEmail({
        to: ownerEmail,
        subject: subject,
        body: body
      });
      
      var details = "Recipient: " + ownerEmail + " | Reference Number: " + requestId + " | Subject: " + subject;
      SystemLogs.log("INFO", "EmailService", "Owner Notification Sent", details, requestId);
      
      return {
        success: true,
        action: action,
        recipient: ownerEmail,
        message: "Email sent successfully."
      };
    } catch (err) {
      var errMsg = err.toString();
      var failDetails = "Recipient: " + ownerEmail + " | Reference Number: " + requestId + " | Subject: " + subject + " | Error: " + errMsg;
      SystemLogs.log("ERROR", "EmailService", "Owner Notification Failed", failDetails, requestId);
      
      return {
        success: false,
        action: action,
        recipient: ownerEmail,
        message: errMsg
      };
    }
  }
};

// ==========================================
// 3. CORE TRANSACTIONS & SERVICES
// ==========================================

/**
 * Service governing client contact storage and lifecycle processing.
 */
var ContactService = {
  /**
   * Processes contact requests, appends database rows, triggers email handlers, 
   * and completes workflows with comprehensive logging.
   * 
   * @param {object} contactData - Form field inputs.
   * @param {string} requestId - Pre-generated unique request tracking ID.
   * @param {string} timestamp - ISO timestamp of request entry.
   */
  createContact: function(contactData, requestId, timestamp) {
    // 1. Transaction: Store contact row in "Contacts" sheet (Primary transaction)
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      if (ss) {
        var sheet = ss.getSheetByName("Contacts");
        if (!sheet) {
          // Provision table dynamically if not present
          sheet = ss.insertSheet("Contacts");
          sheet.appendRow(["Timestamp", "Request ID", "Full Name", "Email", "Organization", "Subject", "Message", "Source", "Page"]);
        }
        sheet.appendRow([
          timestamp,
          requestId,
          contactData.fullName,
          contactData.email,
          contactData.organization || "",
          contactData.subject,
          contactData.message,
          contactData.source || "Portfolio Website",
          contactData.page || "/"
        ]);
      }
      
      // Confirm successful storage
      var details = "ID: " + requestId + " | Name: " + contactData.fullName + " | Email: " + contactData.email;
      SystemLogs.log("INFO", "ContactService", "Contact Created", details, requestId);
    } catch (e) {
      SystemLogs.log("ERROR", "ContactService", "Contact Creation Failed", e.toString(), requestId);
      throw e; // Crash primary transaction so router returns standard error
    }
    
    // 2. Post-Processing: Trigger secondary notifications inside resilient guards
    // Failures during confirmation or admin dispatch will not abort primary transactions or return responses
    try {
      EmailService.sendClientConfirmation(contactData.email, contactData.fullName, requestId);
    } catch (err) {
      SystemLogs.log("ERROR", "ContactService", "Client Confirmation Exception Blocked", err.toString(), requestId);
    }

    try {
      EmailService.sendOwnerNotification(contactData, requestId);
    } catch (err) {
      SystemLogs.log("ERROR", "ContactService", "Owner Notification Exception Blocked", err.toString(), requestId);
    }

    // 3. Workflow Completion: Log workflow conclusion unconditionally
    try {
      SystemLogs.log("INFO", "ContactService", "Workflow Completed", "Contact stored and post-processing completed.", requestId);
    } catch (err) {
      Logger.log("Failed to write final workflow completion log: " + err.toString());
    }
  }
};

/**
 * Service governing professional credential analytics and tracking operations.
 */
var ResumeService = {
  /**
   * Appends analytics data tracking download telemetry metrics.
   * 
   * @param {object} resumeData - Referral source and location metadata.
   * @param {string} requestId - Unique tracking ID.
   * @param {string} timestamp - ISO entry timestamp.
   */
  trackDownload: function(resumeData, requestId, timestamp) {
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      if (ss) {
        var sheet = ss.getSheetByName("ResumeDownloads");
        if (!sheet) {
          sheet = ss.insertSheet("ResumeDownloads");
          sheet.appendRow(["Timestamp", "Request ID", "Source", "Page"]);
        }
        sheet.appendRow([
          timestamp,
          requestId,
          resumeData.source || "",
          resumeData.page || ""
        ]);
      }
      
      var details = "Source: " + (resumeData.source || "N/A") + " | Page: " + (resumeData.page || "N/A");
      SystemLogs.log("INFO", "ResumeService", "Resume Download Logged", details, requestId);
    } catch (e) {
      SystemLogs.log("ERROR", "ResumeService", "Resume Download Log Failed", e.toString(), requestId);
    }
  }
};

// ==========================================
// 4. ROUTER & WEB APPLICATION INTERFACES
// ==========================================

/**
 * Main Web Server POST Dispatcher.
 * Normalizes e.postData into structured routes, validates schemas, and builds ApiResponse contracts.
 * 
 * @param {object} e - Standard doPost event payload configuration from Google Client environment.
 * @returns {TextOutput} JSON payload conforming exactly to the front-end ApiContract.
 */
function doPost(e) {
  var timestamp = new Date().toISOString();
  var requestId = "REQ-" + Math.floor(100000 + Math.random() * 900000) + "-" + Date.now();
  
  // Initialize incoming audit lifecycle log
  SystemLogs.log("INFO", "Router", "Incoming Request", "Starting request dispatch routing.", requestId);
  
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Invalid or missing request body payload.");
    }
    
    var payload = JSON.parse(e.postData.contents);
    var route = payload.route;
    var data = payload.data;
    
    if (!route) {
      throw new Error("Route identifier parameter is required.");
    }
    
    var responseData = {};
    
    if (route === "contact") {
      if (!data) {
        throw new Error("Required contact parameters are missing.");
      }
      if (!data.fullName || !data.email || !data.subject || !data.message) {
        throw new Error("Schema violation: Required contact fields (fullName, email, subject, message) are missing.");
      }
      
      ContactService.createContact(data, requestId, timestamp);
      responseData = { success: true, message: "Contact request processed successfully." };
      
    } else if (route === "resume") {
      if (!data) {
        throw new Error("Required resume parameters are missing.");
      }
      
      ResumeService.trackDownload(data, requestId, timestamp);
      responseData = { success: true };
      
    } else {
      throw new Error("Routing failed: Unknown route path: '" + route + "'.");
    }
    
    // Format response matching the API Contract exactly
    var responseEnvelope = {
      success: true,
      requestId: requestId,
      data: responseData,
      timestamp: timestamp,
      version: "0.7.0",
      metadata: {
        requestId: requestId,
        timestamp: timestamp,
        environment: "production",
        durationMs: 0
      }
    };
    
    return ContentService.createTextOutput(JSON.stringify(responseEnvelope))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    var errMsg = err.toString();
    SystemLogs.log("ERROR", "Router", "Request Failed", errMsg, requestId);
    
    var errorEnvelope = {
      success: false,
      message: errMsg,
      requestId: requestId,
      timestamp: timestamp,
      version: "0.7.0",
      error: {
        code: "SERVER_ERROR",
        message: errMsg
      },
      metadata: {
        requestId: requestId,
        timestamp: timestamp,
        environment: "production",
        durationMs: 0
      }
    };
    
    return ContentService.createTextOutput(JSON.stringify(errorEnvelope))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Health Check and Verification endpoint for browser queries.
 * 
 * @param {object} e - Standard doGet event parameters.
 * @returns {TextOutput} Standard system parameters state.
 */
function doGet(e) {
  var timestamp = new Date().toISOString();
  var healthResult = {
    success: true,
    message: "Mudassir Javed Decision Intelligence Portfolio Backend active and operational.",
    timestamp: timestamp,
    version: "0.7.0"
  };
  return ContentService.createTextOutput(JSON.stringify(healthResult))
    .setMimeType(ContentService.MimeType.JSON);
}
