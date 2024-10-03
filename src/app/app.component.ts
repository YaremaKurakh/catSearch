import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CatSearchComponent} from './components/cat-search/cat-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CatSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
