import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: ``,
})
export class BreadcrumbsComponent implements OnDestroy {

  public title: string = '';

  constructor( private router: Router ) {

    this.getArgRuta();
  }

  ngOnDestroy(): void {}

  getArgRuta() {
    this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      map( event => event as ActivationEnd ),
      filter( ( event: ActivationEnd ) => event.snapshot.firstChild === null ),
      map( ( event: ActivationEnd ) => event.snapshot.data ),
    )
    .subscribe( ({ title }) => {
      // console.log( title );
      this.title = title;
      document.title = `AdminPro - ${ title }`;
    });
  }
}
