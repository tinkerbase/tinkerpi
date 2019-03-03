# Tinker Pi Web Site

Template: [Themeforest Elastic UI](https://themeforest.net/item/elastic-ui-angular-4-material-design-reduxngrx-admin-template/20513764).

## Development server

Run `ng serve --disable-host-check` for a dev server. 

You need the option or you will get `Invalid Host/Origin Header`

Navigate to `http://localhost:4200/`. 

## Mock API

[Json Server](https://github.com/typicode/json-server)

`db.json` has fake customer data

```
json-server --watch db.json
```

## CRUD Component

[Link that needs fixed](http://localhost:4200/master/people)

```
/src/app/master/people/people.component.ts
```

I tried to wire it in on line 61, it calls the mock API:

```
this.people = this.getPeople();
```

Uncommenting this on line 69 and it will work (provided by template):

```
this.people = ALL_IN_ONE_TABLE_DEMO_DATA.map(person => new Person(person));
```





