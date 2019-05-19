import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../core/services/data.service';
import {Planet} from '../../core/models/Planet';
import {ApiConfig} from '../../shared/ApiConfig';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {of} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  planetList: Planet[] = [];
  nameFilter = new FormControl('');
  displayedColumns: string[] = ['name', 'climate', 'gravity', 'diameter', 'rotationPeriod', 'orbitalPeriod', 'population'];
  dataSource = new MatTableDataSource<Planet>([]);
  isLoading = of(true);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dataService: DataService,
    private router: Router,
    private cookie: CookieService
  ) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate =
      (planet: Planet, searchedName: string) => (!searchedName || planet.name.toLocaleLowerCase().includes(searchedName));
    this.getPlanetList(ApiConfig.planetListUrl);
    if (this.cookie.get('pageSize')) {
      this.paginator._changePageSize(parseInt(this.cookie.get('pageSize'), 10));
    }
  }

  getPlanetList(url: string): void {
    this.isLoading = of(true);
    this.dataService.getPlanetList(url)
      .subscribe(baseResponse => {
          console.log(baseResponse);
          if (baseResponse.results != null) {
            this.planetList = this.planetList.concat(baseResponse.results);
            this.dataSource.data = this.planetList;
          }
          if (baseResponse.next != null) {
            this.getPlanetList(baseResponse.next);
          } else {
            this.isLoading = of(false);
          }
        }
      );
  }

  pageEvent(event: PageEvent) {
    console.log('saving ' + event.pageSize);
    this.cookie.set('pageSize', event.pageSize.toString());
  }

  applyFilter() {
    console.log(this.nameFilter.value);
    this.dataSource.filter = this.nameFilter.value.trim().toLocaleLowerCase();
  }

  onRowClicked(planet: Planet): void {
    const id = this.getId(planet);
    console.log(id);
    // if (!isNaN(id)) {
    //   this.router.navigate([ApiConfig.planetListUrl + id]);
    // }
  }

  private getId(planet: Planet): number {
    if (planet.url) {
      const id = planet.url.trim().replace(ApiConfig.planetListUrl, '').replace('\/', '');
      return parseInt(id, 10);
    }
  }
}
