import fs from 'fs';
import path from 'path';

const logBaseDir = path.resolve(__dirname, '../../data');
const logFilePaths: Record<LogLevel, string> = {
  debug: path.join(logBaseDir, 'debug.log'),
  warn: path.join(logBaseDir, 'warn.log'),
  error: path.join(logBaseDir, 'error.log'),
  success: path.join(logBaseDir, 'success.log'),
  info: path.join(logBaseDir, 'info.log'),
};

const colors = {
  reset: '\x1b[0m',
  gray: '\x1b[90m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

type LogLevel = 'debug' | 'warn' | 'error' | 'success' | 'info';

const logLevels: Record<LogLevel, string> = {
  debug: colors.gray,
  warn: colors.yellow,
  error: colors.red,
  success: colors.green,
  info: colors.blue,
};

function formatMessage(level: LogLevel, message: string): string {
  const color = logLevels[level];
  const timestamp = new Date().toISOString();
  return `${color}[${timestamp}] ${level.toUpperCase()}: ${message}${colors.reset}\n`;
}

function writeLog(level: LogLevel, message: string) {
  const logFilePath = logFilePaths[level];
  fs.appendFile(logFilePath, message, (err) => {
    if (err) {
      console.error('Failed to write log to file:', err);
    }
  });
}

export function debug(message: string) {
  const formattedMessage = formatMessage('debug', message);
  writeLog('debug', formattedMessage);
}

export function warn(message: string) {
  const formattedMessage = formatMessage('warn', message);
  console.warn(formattedMessage);
  writeLog('warn', formattedMessage);
}

export function error(message: string) {
  const formattedMessage = formatMessage('error', message);
  console.error(formattedMessage);
  writeLog('error', formattedMessage);
}

export function success(message: string) {
  const formattedMessage = formatMessage('success', message);
  writeLog('success', formattedMessage);
}

export function info(message: string) {
  const formattedMessage = formatMessage('info', message);
  writeLog('info', formattedMessage);
}