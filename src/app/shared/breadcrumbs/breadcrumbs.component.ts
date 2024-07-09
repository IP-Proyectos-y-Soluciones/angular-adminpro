import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: ``,
})
export class BreadcrumbsComponent implements OnDestroy {
  
  public title: string = '';
  public titleSubs$: Subscription;

  constructor( private router: Router ) {

    this.titleSubs$ = this.getArgRuta().subscribe(({ title }) => {
      // console.log( title );
      this.title = title;
      document.title = `AdminPro - ${ title }`;
    });
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  /**
   * @ame getArgRuta
   * @description Modulo para definir las rutas de manera dinámica utilizando Observable y parametros
   */
  getArgRuta() {
    return this.router.events.pipe(
      filter(( event ) => event instanceof ActivationEnd ),
      map(( event ) => event as ActivationEnd),
      filter(( event: ActivationEnd ) => event.snapshot.firstChild === null ),
      map(( event: ActivationEnd ) => event.snapshot.data )
    );
  }
}
