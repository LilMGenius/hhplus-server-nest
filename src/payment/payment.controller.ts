import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { RespondPaymentDto } from './dto/respond-payment.dto';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Process payment for a reserved ticket' })
  @ApiResponse({
    status: 201,
    description: 'Payment successfully processed',
    type: RespondPaymentDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid ticket, seat, or date' })
  @ApiResponse({ status: 402, description: 'Insufficient balance' })
  processPayment(@Body() processPaymentDto: ProcessPaymentDto) {
    return this.paymentService.processPayment(processPaymentDto);
  }
}
