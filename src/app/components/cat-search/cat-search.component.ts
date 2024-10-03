import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Observable, Subject, switchMap, takeUntil} from 'rxjs';
import {CatState, FetchBreeds, SearchCats} from '../../state/cat.state';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {AsyncPipe, NgForOf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {IBreed} from '../../interfaces/breed.interface';
import {ICatSearch} from '../../interfaces/cat-search.interface';

@Component({
  selector: 'app-cat-search',
  standalone: true,

  templateUrl: './cat-search.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    AsyncPipe,
    MatOption,
    MatInput,
    MatButton,
    MatCard,
    NgForOf
  ],
  styleUrl: './cat-search.component.scss'
})
export class CatSearchComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  form!: FormGroup;

  bread!: string;
  limit!: number;

  breeds!: IBreed[]
  searchResults!: ICatSearch[]

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.form = this.fb.group({
      breed: [''],
      limit: [10],
    });

    this.getBreeds();
  }

  getBreeds() {
    this.store.select(CatState.breeds).pipe(
      switchMap((breeds: IBreed[]): Observable<IBreed[]> | IBreed[][] => {
        if (!breeds.length) {
          return this.store.dispatch(new FetchBreeds()).pipe(
            switchMap((): Observable<IBreed[]> => this.store.select(CatState.breeds))
          );
        }
        return [breeds];
      }),
    takeUntil(this.destroy$)
    ).subscribe((breeds: IBreed[]) => {
      this.breeds = breeds;
    });
  }

  searchCats() {
    const { breed, limit } = this.form.value;

    if (this.bread === breed && this.limit === limit) {
      this.store.select(CatState.searchResults)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((cats: ICatSearch[]) => {
        this.searchResults = cats;
      })
    } else {
      this.store.dispatch(new SearchCats(breed, limit)).pipe(
        switchMap((): Observable<ICatSearch[]> => this.store.select(CatState.searchResults)),
        takeUntil(this.destroy$)
      ).subscribe((cats: ICatSearch[]) => {
        this.searchResults = cats;
        this.bread = breed;
        this.limit = limit;
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
