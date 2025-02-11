export enum QueueStatus {
  WAIT = 'WAIT',
  ACTIVE = 'ACTIVE',
  EXPIRY = 'EXPIRY',
}

export enum SeatStatus {
  FULL = 'FULL',
  EMPTY = 'EMPTY',
}

export enum TicketStatus {
  WAIT = 'WAIT',
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

export enum TicketingStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REVOKE = 'REVOKE',
}

export enum PayHistoryType {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  REFUND = 'REFUND',
}
