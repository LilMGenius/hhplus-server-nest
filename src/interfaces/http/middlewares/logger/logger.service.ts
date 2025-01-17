import { Injectable } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
          ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`,
        ),
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
