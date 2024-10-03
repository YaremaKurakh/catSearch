import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {CatService} from '../services/cat.service';
import { tap } from 'rxjs/operators';
import {ICatsState} from '../interfaces/cat-state.interface';
import {IBreed} from '../interfaces/breed.interface';
import {ICatSearch} from '../interfaces/cat-search.interface';
import {Observable} from 'rxjs';

export class FetchBreeds {
  static readonly type = '[Cat] Fetch Breeds';
}

export class SearchCats {
  static readonly type = '[Cat] Search Cats';
  constructor(public breedId: string, public limit: number) {}
}

@State<ICatsState>({
  name: 'cats',
  defaults: {
    breeds: [],
    searchResults: [],
  }
})
@Injectable()
export class CatState {
  constructor(private catService: CatService) {}

  @Selector()
  static breeds(state: ICatsState): IBreed[] {
    return state.breeds;
  }

  @Selector()
  static searchResults(state: ICatsState): ICatSearch[] {
    return state.searchResults;
  }

  @Action(FetchBreeds)
  fetchBreeds(ctx: StateContext<ICatsState>): Observable<IBreed[]> {
    return this.catService.getBreeds().pipe(
      tap((breeds: IBreed[]) => {
        const state: ICatsState = ctx.getState();
        ctx.setState({
          ...state,
          breeds: breeds
        })
      })
    );
  }

  @Action(SearchCats)
  searchCats(ctx: StateContext<ICatsState>, action: SearchCats): Observable<ICatSearch[]> {
    return this.catService.getCatsByFilter(action.breedId, action.limit).pipe(
      tap((searchResults: ICatSearch[]) => {
        const state: ICatsState = ctx.getState();
        ctx.setState({
          ...state,
          searchResults: searchResults
        })
      })
    );
  }
}
