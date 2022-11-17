import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon exist in DB ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(busqueda: string) {
    let pokemon: Pokemon;
    if (!isNaN(+busqueda)) {
      pokemon = await this.pokemonModel.findOne({numPokemon:busqueda})
    }

    //ID mongo
    if (isValidObjectId(busqueda)) {
      pokemon = await this.pokemonModel.findById(busqueda);
    }

    //Buscar por nombre de Pokemon
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({name:busqueda.toLowerCase()});
    }


    //Si no existe pokemon con la busqueda
    if(!pokemon) throw new BadRequestException(`Pokemon with id, name or numPokemon '${busqueda}' not found`);

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
