import mongoos, { connect } from 'mongoose';
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoos> =>
      connect(process.env.DATA_BASE as string),
  },
];
