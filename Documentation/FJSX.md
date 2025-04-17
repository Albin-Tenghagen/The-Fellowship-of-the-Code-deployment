1. Dagens progress 4/4-25
   Branch FJSX-develop created

# Endpoints/modules for the REST-API

## /user

- |
- |-----/user/tips
- |
- |-----/user/risk assessments and floodwarnings and water levels
- |
- |-----/user/safety information and uppsamlingsplatser
- |
- |-----/user/notification

## As a community member

1. I want to submit tips about flood conditions so that I can help keep my community informed.

2. I want to see current flood warnings so that I can stay informed about potential dangers in my area.
   I want to view current water levels so that I understand the severity of flooding in my area.
   I want to view risk assessments for potential floods so that I can prepare appropriately.

3. I want to access safety information during flood events so that I can protect myself and my family.
   I want to find designated security meeting points so that I know where to go during emergencies.

4. I want to register for flood notifications so that I receive timely updates about changing conditions.

//------------------------------------------------------------------------

## /(admin/municipal worker)

- |-----/admin
- |-----------/admin/Auth/
- |------------|---/admin/Authenticated/Monitoring
- |-----------------|
- |-----------------|---/admin/Authenticated/Monitoring/historicalMonitoring
- |------------|
- |------------|----/admin/Authenticated/Infrastructure issues
- |------------|
- |------------|----/admin/Authenticated/create and update issue
- |
  _Authenticated User Stories_

## As a municipal employee

1.  I want to log in to access advanced features so that I can perform my job responsibilities.

2.  I want to monitor water levels so that I can track changes over time.
    I want to track soil moisture levels so that I can predict potential flooding.
    I want to monitor air humidity so that I can understand environmental conditions.
    I want to monitor water temperature so that I can assess environmental impacts.
    I want to view resolved issues so that I can learn from past events.

3.  I want to check water pressure readings so that I can identify potential infrastructure issues.

4.  I want to create and update issue reports so that I can communicate problems to the team.
    I want to update flood warning statuses so that the public receives accurate information.

//------------------------------------------------------------------------

# Databas struktur

## Vi vet ej hur det byggs upp så vi lägger fokus på api:et idag tills vi kan med mer säkerhet planera databasen och dess struktur

## /Database

---

2. **11/4-25**

## Agenda för dagen

### !!OBS!! DOKUMENTATION ÄR EN VIKTIG OCH KONTINUERLIG UPPGIFT !!OBS!!

1. Prata om TS VS JS

- TS Är bra för att typa data

- TS it is!!

2. Introducera mer middleware( Winston, morgan etc.)?

3. Enkla CRUd-Operation (GET, POST, PUT, DELETE)

4. Manipulera mockad JSON data

Dagen börjar med

- Enkel crud för user/tips with JS, Then converting all files to Typescript and figuring it out
- JSON Data to be manipulated during CRUD

- OBS!! DOCUMENTAION

- Functional middleware

## Vad som har åstakommits

1. CRUD-operationer för userTips endpoint är färdig med mockdata så att vi kan simulera en databas

2. Vi har använt oss av JSON-data för att simulera data som passeras

3. TypeScript har initierats in i projektet med en tsconfig.json fil

- Skapade mappen dist/ i samma nivå som source. Här får vi the compiled js file.
- i tsconfig.json filen så la vi in outDir": "./dist"
- ändrade "target": "ES2020" från es2016
- ändrade "moduleResolution": "node", från node10.

4. Middleware har lagts !!OBS BARA SOM ROUTING MIDDLEWARE

## Vad som komma skall

1. Typescript Conversion

2. expandering av CRUD behöver fixas,

   - Vad för data ska skickas och dess typer behöver diskuteras med frontend
   - Vad för handlingar som varje endpoint behöver

3. Middleware för logging & felhantering & input validering behöver göras. För att "modulera" koden.

---

# English ↓

    Progress of the day 4/4-25
    Branch FJSX-develop created

Endpoints/modules for the REST-API
/user

    |

    |-----/user/tips

    |

    |-----/user/risk assessments and flood warnings and water levels

    |

    |-----/user/safety information and meeting points

    |

    |-----/user/notification

As a community member

    I want to submit tips about flood conditions so that I can help keep my community informed.

    I want to see current flood warnings so that I can stay informed about potential dangers in my area.
    I want to view current water levels so that I understand the severity of flooding in my area.
    I want to view risk assessments for potential floods so that I can prepare appropriately.

    I want to access safety information during flood events so that I can protect myself and my family.
    I want to find designated security meeting points so that I know where to go during emergencies.

    I want to register for flood notifications so that I receive timely updates about changing conditions.

//------------------------------------------------------------------------
/(admin/municipal worker)

    |-----/admin

    |-----------/admin/Auth/

    |------------|---/admin/Authenticated/Monitoring

    |-----------------|

    |-----------------|---/admin/Authenticated/Monitoring/historicalMonitoring

    |------------|

    |------------|----/admin/Authenticated/Infrastructure issues

    |------------|

    |------------|----/admin/Authenticated/create and update issue

    | Authenticated User Stories

As a municipal employee

    I want to log in to access advanced features so that I can perform my job responsibilities.

    I want to monitor water levels so that I can track changes over time.
    I want to track soil moisture levels so that I can predict potential flooding.
    I want to monitor air humidity so that I can understand environmental conditions.
    I want to monitor water temperature so that I can assess environmental impacts.
    I want to view resolved issues so that I can learn from past events.

    I want to check water pressure readings so that I can identify potential infrastructure issues.

    I want to create and update issue reports so that I can communicate problems to the team.
    I want to update flood warning statuses so that the public receives accurate information.

//------------------------------------------------------------------------
Database structure
We don’t yet know how it will be built, so we are focusing on the API today until we can more confidently plan the database and its structure.
/Database

    11/4-25

Agenda for the day
!!NOTE!! DOCUMENTATION IS AN IMPORTANT AND ONGOING TASK !!NOTE!!

    Talk about TS VS JS

    TS is great for typing data

    TS it is!!

    Introduce more middleware (Winston, Morgan, etc.)?

    Simple CRUD Operations (GET, POST, PUT, DELETE)

    Manipulate mocked JSON data

The day starts with

    Simple CRUD for user/tips with JS, then converting all files to TypeScript and figuring it out

    JSON data to be manipulated during CRUD

    NOTE!! DOCUMENTATION

    Functional middleware

What has been accomplished

    CRUD operations for the userTips endpoint are finished using mock data to simulate a database

    We have used JSON data to simulate data being passed

    TypeScript has been initiated in the project with a tsconfig.json file

    Middleware has been added !!NOTE ONLY AS ROUTING MIDDLEWARE
