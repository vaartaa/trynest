import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AdminModule } from './admin.module'; // lib

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpressCustomLoader } from './express-custom.loader';
import { Admin } from './mongoose/admin-model';
import { Student } from './mongoose/student-model';
import { MongooseSchemasModule } from './mongoose/mongoose.module';

const AdminJS = require('adminjs');
const AdminJSMongoose = require('@adminjs/mongoose');

AdminJS.registerAdapter(AdminJSMongoose);

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    AdminModule.createAdminAsync({
      imports: [MongooseSchemasModule],
      inject: [getModelToken('Admin'), getModelToken('Student')],
      useFactory: (adminModel: Model<Admin>, studentModel: Model<Student>) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [{ resource: studentModel }, { resource: adminModel }],
        },
        auth: {
          authenticate: async (email, password) =>
            Promise.resolve({ email: 'test' }),
          cookieName: 'test',
          cookiePassword: 'testPass',
        },
      }),
      customLoader: ExpressCustomLoader,
    }),
    MongooseSchemasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
