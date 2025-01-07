import { Module } from '@nestjs/common';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ContactModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
