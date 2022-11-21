import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private defaultLimit: number;
  private defaultOffest: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService,
  ){
    this.defaultLimit = configService.get<number>('defaultLimit');
    this.defaultOffest = configService.get<number>('defaultOffest');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = this.defaultLimit, offset = this.defaultOffest} = paginationDto;

    return await this.pokemonModel.find()
    .skip(offset)
    .limit(limit)
    .sort({
      numPokemon: 1
    })
    .select('-__v');  
  }

  async findOne(busqueda: string) {
    let pokemon: Pokemon;
    
    //Buscar por numero de pokemon
    if (!isNaN(+busqueda)) {
      pokemon = await this.pokemonModel.findOne({numPokemon:busqueda})
    }else if (isValidObjectId(busqueda)) {
      //ID mongo
      pokemon = await this.pokemonModel.findById(busqueda);
    }else if (!pokemon) {
      //Buscar por nombre de Pokemon
      pokemon = await this.pokemonModel.findOne({name:busqueda.toLowerCase()});
    }
    
    //Si no existe pokemon con la busqueda
    if(!pokemon) throw new BadRequestException(`Pokemon with id, name or numPokemon '${busqueda}' not found`);
    
    return pokemon;
  }

  async update(busqueda: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(busqueda);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
      const updatePokemon = await pokemon.updateOne(updatePokemonDto,{ new: true});
      return {...pokemon.toJSON(), ...updatePokemon};
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const resultado = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({_id: id});
    
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id '${id}' nor fund`);
    }

    return "Delete is successful";
  }

  private handleExceptions(error: any){
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exist in DB ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
}
