import { DataSource } from 'typeorm';
import * as process from 'process';
import { PayHistory } from 'src/interfaces/entities/pay-history.entity';
import { Ticketing } from 'src/interfaces/entities/ticketing.entity';
import { Concert } from 'src/interfaces/entities/concert.entity';
import { Ticket } from 'src/interfaces/entities/ticket.entity';
import { Seat } from 'src/interfaces/entities/seat.entity';
import { User } from 'src/interfaces/entities/user.entity';
import { Queue } from 'src/interfaces/entities/queue.entity';

let datasource: DataSource;

export const getDatasource = async () => {
  if (datasource) {
    return datasource;
  }
  datasource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    migrations: [`migrations/*`],
    logging: true,
    entities: [PayHistory, Ticketing, Concert, Ticket, Seat, User, Queue],
    relationLoadStrategy: 'join',
  });
  await datasource.initialize();
  return datasource;
};
