import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { HeroService }        from './hero.service';
import { HTTP_PROVIDERS } from '@angular/http';
import './rxjs-operators';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        HeroService,
        HTTP_PROVIDERS
    ]
})

export class AppComponent {
    title = 'Tour of Heroes';
}