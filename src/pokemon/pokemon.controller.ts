import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  // Se puede indicar el codigo de error https con  @HttpCode(HttpStatus.OK);
  // @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':busqueda')
  findOne(@Param('busqueda') busqueda: string) {
    return this.pokemonService.findOne(busqueda);
  }

  @Patch(':ibusquedad')
  update(@Param('busqueda') busqueda: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(busqueda, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
