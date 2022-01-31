import config from '../config';
import { logger } from '../utils/logger';
import { Injectable, Scope } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

interface dbConfig {
  username?: string,
  password?: string,
  host: string;
  port: number;
  database: string;
}

/**
 * All the methods and properties mentioned in the following class is
 * specific to MongoDB. You should make necessary changes to support
 * the database you want to use.
 */
@Injectable({ scope: Scope.REQUEST })
export class MongoService implements MongooseOptionsFactory {
  private password: string;
  private user: string;
  private host: string;
  private dbName: string;
  private port: number;

  constructor() {
    const { username, host, port, database }: dbConfig = config.dbConfig;
    this.password = process.env.DB_PWD || '';
    this.user = username || '';
    this.host = host || 'localhost:';
    this.port = port || 27017;
    this.dbName = database || 'my-db';
  }  

  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
    const dbConnectionString = this.getConnectionString();
    return {
      uri: dbConnectionString.uri,
      retryAttempts: 3,
      retryDelay: 10,
      connectTimeoutMS: dbConnectionString.connectTimeoutMS
    }
  }

  /**
   * Build database connection string.
   * Customize as needed for your database.
   */
  private getConnectionString() {
    const env = process.env.NODE_ENV;
    if (env === 'test' && !process.env.DB_NAME) {
      this.dbName += '_test';
    }

    let url: string;
    if (env !== 'localhost' && this.user && this.password) {
      url = `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.dbName}`;
    } else {
      url = `mongodb://${this.host}:${this.port}/${this.dbName}`;
    }

    const TWO_MINUTES_IN_MS = 2 * 60 * 1000;
    const dbConnection = {
      uri: url,
      connectTimeoutMS: TWO_MINUTES_IN_MS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    return dbConnection;
  }

  public getDbHost() {
    return this.host;
  }

  public getDbPassword() {
    return this.password;
  }

  public getDbUser() {
    return this.user;
  }

  public getDbName() {
    return this.dbName;
  }
}

// const db = new DatabaseMongo();

// export default db;


