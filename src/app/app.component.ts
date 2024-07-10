import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { Observable, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  currentUrlId: string = '';
  title = 'One Mart';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentUrlId = this.activatedRoute.snapshot.queryParams['type'];
    });;
  }
}
