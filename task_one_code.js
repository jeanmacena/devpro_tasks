const fs = require('fs');

function log_message(fileName, message, level) {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;

    fs.appendFileSync(fileName, logEntry, 'utf8');
}

log_message("application.log", "User logged in", "INFO");
log_message("application.log", "Failed login attempt", "WARNING");

//Tests

const fs = require('fs');
const { log_message } = require('./logger'); // Assuming logger.js contains the log_message function implementation

describe('log_message', () => {
  const logFileName = 'test.log';

  beforeEach(() => {
    // Clear the log file before each test
    fs.writeFileSync(logFileName, '');
  });

  test('log_message writes the message to the log file with correct format', () => {
    const message = 'Test message';
    const level = 'INFO';
    const expectedLogEntryRegex = new RegExp(`\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\] \\[${level}\\] ${message}\n`);

    log_message(logFileName, message, level);
    
    const logContent = fs.readFileSync(logFileName, 'utf8');
    expect(logContent).toMatch(expectedLogEntryRegex);
  });

  test('log_message handles different log levels properly', () => {
    const message = 'Test message';
    const levels = ['INFO', 'WARNING', 'ERROR'];

    levels.forEach(level => {
      log_message(logFileName, message, level);
      const logContent = fs.readFileSync(logFileName, 'utf8');
      expect(logContent).toContain(`[${level}]`);
    });
  });

  test('log_message appends new log entry without overwriting existing content', () => {
    const message1 = 'Test message 1';
    const message2 = 'Test message 2';
    const level = 'INFO';

    log_message(logFileName, message1, level);
    log_message(logFileName, message2, level);

    const logContent = fs.readFileSync(logFileName, 'utf8');
    expect(logContent).toContain(message1);
    expect(logContent).toContain(message2);
  });
});
