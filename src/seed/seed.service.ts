import { Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonResponse } from './interface/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ){}


  
  async populationDB(){
    await this.pokemonModel.deleteMany({}); //delete all * frome pokemon

    const data = await this.http.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
    
    // const insertPromises/**: {name : string, numPokemon : number}[] */ = []; //Se supone que esto es mas rapido (?)

    data.results.forEach(async({name, url})=>{
      const segments = url.split('/');
      const numPokemon = +segments[segments.length - 2];
      
      await this.pokemonModel.create({name,numPokemon})
      // insertPromises.push(this.pokemonModel.create({name,numPokemon})); //Se supone que esto es mas rapido (?)
      // insertPromises.push({name, numPokemon}); //Se supone que esto es mas rapido (?) 2.0
      // await this.pokemonModel.insertMany(insertPromises);//Se supone que esto es mas rapido (?)
    })
    // const results = await Promise.all(insertPromises); //Se supone que esto es mas rapido (?)
    return "Resettlement of Pokemon";
  
  }
}
