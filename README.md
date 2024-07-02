# Order App with RabbitMQ

This repository contains three microservices for an order application using RabbitMQ for communication.
The services included are general-service, order-service, and payment-service, all built with Node.js and Express.js.

## Folder Structure

- `order-app-rabbitmq/`
  - `general-service/`
  - `order-service/`
  - `payment-service/`

## Technology Stack

- Node.js 14.x
- Express.js
- RabbitMQ

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/order-app-rabbitmq.git
   cd order-app-rabbitmq
   ```

2. Install dependencies for each service:

   ```sh
   cd general-service
   npm install
   cd ../order-service
   npm install
   cd ../payment-service
   npm install
   ```

## Configuration

Each service requires environment variables to be configured. Create a `.env` file in each service folder with the following variables:

### general-service/.env

```sh
PORT=3000
AMQP_URI=your_rabbitmq_uri
...
```

### order-service/.env

```sh
PORT=3001
AMQP_URI=your_rabbitmq_uri
GENERAL_SERVICE_URL=
...
```

### payment-service/.env

```sh
PORT=3002
AMQP_URI=your_rabbitmq_uri
ORDER_SERVICE_URL=
GENERAL_SERVICE_URL=
...
```

## Usage

To start the services, you must run the order-service first, followed by the general-service and payment-service.

1. Start the order-service:

   ```sh
   cd order-service
   npm start
   ```

2. Start the general-service:

   ```sh
   cd ../general-service
   npm start
   ```

3. Start the payment-service:

   ```sh
   cd ../payment-service
   npm start
   ```

## Example

The order-service must be running before starting the general-service or payment-service to ensure proper communication between services.
After starting the services, you can make API requests to the services using their respective ports.

## Contributing

Feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License.
