import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminSchema } from './admin-model';
import { StudentSchema } from './student-model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema },
      { name: 'Student', schema: StudentSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongooseSchemasModule {}
