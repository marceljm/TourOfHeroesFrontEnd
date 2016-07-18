import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Hero } from './hero';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class HeroService {
    private heroesUrl = 'http://ctaro2-7831:8080/TourOfHeroesBackEnd/rest/heroes/';

    constructor(private http: Http) { }

    getHeroes(): Observable<Hero[]> {
        return this.http.get(this.heroesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getHero(id: number): Observable<Hero> {
        return this.http.get(this.heroesUrl + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    addHero(name: string): Observable<Hero> {
        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.heroesUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(hero: Hero): Observable<Hero> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let url = `${this.heroesUrl}${hero.id}`;
        return this.http
            .delete(url, headers)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private put(hero: Hero): Observable<Hero> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let url = `${this.heroesUrl}`;
        return this.http
            .put(url, hero, headers)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private post(hero: Hero): Observable<Hero> {
        return this.addHero(hero.name);
    }

    save(hero: Hero): Observable<Hero> {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }
}
