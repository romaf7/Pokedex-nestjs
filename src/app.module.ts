import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [PokemonModule, MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'), CommonModule, SeedModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
