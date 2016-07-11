import { Component } from '@angular/core';

import { HeroService } from './hero.service';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
    selector: 'my-app',
    templateUrl: 'my-app.html',
    styleUrls: ['my-app.css'],
    directives: [HeroDetailComponent],
    providers: [HeroService]
})

export class AppComponent {
    constructor(private heroService: HeroService) { }

    title = 'Tour of Heroes';
    heroes: Hero[];
    selectedHero: Hero;

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }
}
