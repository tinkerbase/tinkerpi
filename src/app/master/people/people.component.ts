import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { List } from '../../core/list/list.interface';
import { ListColumn } from '../../core/list/list-column.model';
import { ListDataSource } from '../../core/list/list-datasource';
import { ListDatabase } from '../../core/list/list-database';
import { componentDestroyed } from '../../core/utils/component-destroyed';
import { PersonCreateUpdateComponent } from './person-create-update/person-create-update.component';
import { ROUTE_TRANSITION } from '../../app.animation';
import { Observable, ReplaySubject, of } from 'rxjs';
import { PeopleService } from './people-service';
import { PeopleResponse, Person } from '../../master/people/person-create-update/person-model';
import { tap, map, filter, retry, catchError, takeUntil } from 'rxjs/operators';
import { ALL_IN_ONE_TABLE_DEMO_DATA } from '../../pages/tables/all-in-one-table/all-in-one-table.demo';
@Component({
  selector: 'elastic-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: {'[@routeTransition]': ''}
})

export class PeopleComponent implements List<Person>, OnInit, OnDestroy {
  
  subject$: ReplaySubject<Person[]> = new ReplaySubject<Person[]>(1);
  data$: Observable<Person[]>;
  private errorMsg: string;
  people:any = [];

  @Input()
  columns: ListColumn[] = [
    {name: 'Checkbox', property: 'checkbox', visible: false},
    {name: 'Image', property: 'image', visible: true},
    {name: 'Name', property: 'name', visible: true, isModelProperty: true},
    {name: 'First Name', property: 'firstName', visible: false, isModelProperty: true},
    {name: 'Last Name', property: 'lastName', visible: false, isModelProperty: true},
    {name: 'Street', property: 'street', visible: true, isModelProperty: true},
    {name: 'Zipcode', property: 'zipcode', visible: true, isModelProperty: true},
    {name: 'City', property: 'city', visible: true, isModelProperty: true},
    {name: 'Phone', property: 'phoneNumber', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ] as ListColumn[];
  pageSize = 10;
  resultsLength: number;
  dataSource: ListDataSource<Person> | null;
  database: ListDatabase<Person>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private _peopleService: PeopleService) {
    
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {

    this.people = this.getPeople();
    /* this._peopleService.getPeople().subscribe((result)=>{    
      this.people  =  result.body;
      console.log('Component Init');
    }) */

    this.dataSource = this.people;


    this.people = ALL_IN_ONE_TABLE_DEMO_DATA.map(person => new Person(person));
    this.subject$.next(this.people);
    this.data$ = this.subject$.asObservable();

    this.database = new ListDatabase<Person>();
    
    this.data$.pipe(
      takeUntil(componentDestroyed(this)),
      filter(Boolean)
    ).subscribe((people) => {
      this.people = people;
      this.database.dataChange.next(people);  
      this.resultsLength = people.length; 
    }); 

    this.dataSource = new ListDataSource<Person>(this.database, this.sort, this.paginator, this.columns); 
  }
  
  getPeople() {
    this.people = [];
    this._peopleService.getPeople().subscribe((data: {}) => {
      console.log(data);
      
  });

  }

  createPerson() {
    this.dialog.open(PersonCreateUpdateComponent).afterClosed().subscribe((person: Person) => {
      if (person) {
        this.people.unshift(new Person(person));
        this.subject$.next(this.people);
      }
    });
  }

  updatePerson(person) {
    this.dialog.open(PersonCreateUpdateComponent, {
      data: person
    }).afterClosed().subscribe(resp => {
      if (resp) {
        const index = this.people.findIndex((existingPeople) => existingPeople.id === resp.id);
        this.people[index] = new Person(resp);
        this.subject$.next(this.people);
      }
    });
  }

  deletePerson(customer) {
    this.people.splice(this.people.findIndex((existingPeople) => existingPeople.id === customer.id), 1);
    this.subject$.next(this.people);
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.filter = value;
  }

  ngOnDestroy() {
  }
}
