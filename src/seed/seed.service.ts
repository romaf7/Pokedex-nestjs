import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonResponse } from './interface/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;
  
  async populationDB(){
    const {data} = await this.axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
    
    data.results.forEach(({name, url})=>{
      const segments = url.split('/');
      const numPokemon = +segments[segments.length - 2];
      
    })
    return data.results;
  
  }
}
