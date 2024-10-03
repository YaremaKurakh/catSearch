import {IBreed} from './breed.interface';
import {ICatSearch} from './cat-search.interface';

export interface ICatsState {
  breeds: IBreed[];
  searchResults: ICatSearch[]
}
