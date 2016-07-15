import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Hero }                from './hero';
import { HeroService }         from './hero.service';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css'],
    directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;
    addingHero = false;
    errorMessage: string;

    constructor(
        private router: Router,
        private heroService: HeroService) { }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes() {
        this.heroService.getHeroes()
            .subscribe(
            heroes => this.heroes = heroes,
            error => this.errorMessage = <any>error);
    }

    addHero(name: string) {
        this.addingHero = true;
        this.selectedHero = null;

        if (!name) { return; }
        this.heroService.addHero(name)
            .subscribe(
            hero => this.heroes.push(hero),
            error => this.errorMessage = <any>error);
    }

    close(savedHero: Hero) {
        this.addingHero = false;
        if (savedHero) {
            this.getHeroes();
        }
    }

    deleteHero(hero: Hero, event: any) {
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .subscribe(
            hero => { this.selectedHero = null; this.heroes.splice(this.heroes.indexOf(hero, 0), 1) },
            error => this.errorMessage = <any>error);
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
        this.addingHero = false;
    }

    gotoDetail() {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}
