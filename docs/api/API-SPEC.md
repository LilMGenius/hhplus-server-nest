# API Specifications

## 1. User Token API
- **Endpoint**: `/api/token`
- **Method**: POST
- **Request**:
  ```json
  {
    "user_id": "string"
  }
  ```
- **Response**:
  ```json
  {
    "token": "string",
    "queue_info": {
      "position": "number",
      "estimated_wait_time": "string"
    }
  }
  ```
- **Error**:
  - 400: Invalid User ID
  - 500: Server Error
- **Authorization**: 없음

## 2. Checking Dates Availability API
- **Endpoint**: `/api/tickets/dates`
- **Method**: GET
- **Response**:
  ```json
  [
    "YYYY-MM-DD",
    "YYYY-MM-DD"
  ]
  ```
- **Error**:
  - 500: Server Error
- **Authorization**: Bearer Token

## 3. Checking Seats Availability API
- **Endpoint**: `/api/tickets/seats`
- **Method**: GET
- **Request**:
  ```json
  {
    "date": "YYYY-MM-DD"
  }
  ```
- **Response**:
  ```json
  [
    {
      "seat_id": 1,
      "status": "available"
    },
    {
      "seat_id": 2,
      "status": "reserved"
    }
  ]
  ```
- **Error**:
  - 400: Invalid Date
  - 500: Server Error
- **Authorization**: Bearer Token

## 4. Ticketing Seat API
- **Endpoint**: `/api/tickets`
- **Method**: POST
- **Request**:
  ```json
  {
    "date": "YYYY-MM-DD",
    "seat_id": "number"
  }
  ```
- **Response**:
  ```json
  {
    "status": "reserved",
    "expiration": "ISO 8601"
  }
  ```
- **Error**:
  - 400: Invalid Seat ID or Date
  - 409: Seat Already Reserved
  - 500: Server Error
- **Authorization**: Bearer Token

## 5. Charging User Balance API
- **Endpoint**: `/api/balance`
- **Method**: POST
- **Request**:
  ```json
  {
    "amount": "number"
  }
  ```
- **Response**:
  ```json
  {
    "balance": "number"
  }
  ```
- **Error**:
  - 400: Invalid Amount
  - 500: Server Error
- **Authorization**: Bearer Token

## 6. Checking User Balance API
- **Endpoint**: `/api/balance`
- **Method**: GET
- **Response**:
  ```json
  {
    "balance": "number"
  }
  ```
- **Error**:
  - 500: Server Error
- **Authorization**: Bearer Token

## 7. Payment API
- **Endpoint**: `/api/payment`
- **Method**: POST
- **Request**:
  ```json
  {
    "ticket_id": "string",
    "seat_id": "number",
    "date": "YYYY-MM-DD"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "receipt": {
      "payment_id": "string",
      "amount": "number",
      "date": "ISO 8601"
    }
  }
  ```
- **Error**:
  - 400: Invalid Ticket, Seat, or Date
  - 402: Insufficient Balance
  - 500: Server Error
- **Authorization**: Bearer Token
