import { Injectable } from '@nestjs/common';

@Injectable()
export class BalanceService {
  private balance = 100;

  getBalance() {
    return { balance: this.balance };
  }

  chargeBalance(amount: number) {
    this.balance += amount;
    return { balance: this.balance };
  }
}
