import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../core/services/data.service';
import {Planet} from '../../core/models/Planet';
import {Location} from '@angular/common';
import {of} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() planet: Planet;
  isLoading = of(true);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dataService: DataService,
  ) {
  }

  ngOnInit() {
    this.getPlanet();
  }

  getPlanet(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataService.getPlanet(id)
      .subscribe(planet => this.resolveResponse(planet));
  }

  resolveResponse(planet: Planet) {
    this.isLoading = of(false);
    if (planet.name) {
      this.planet = planet;
    } else {
      this.router.navigate(['not-found']);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
