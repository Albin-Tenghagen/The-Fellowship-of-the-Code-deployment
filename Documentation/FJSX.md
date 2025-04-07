Dagens progress 4/4-25
Branch FJSX-develop created

# Endpoints/modules for the REST-API

## /user

|
|-----/user/tips
|
|-----/user/risk assessments and floodwarnings and water levels
|
|-----/user/safety information and uppsamlingsplatser
|
|-----/user/notification

## As a community member

I want to submit tips about flood conditions so that I can help keep my community informed.

I want to see current flood warnings so that I can stay informed about potential dangers in my area.
I want to view current water levels so that I understand the severity of flooding in my area.
I want to view risk assessments for potential floods so that I can prepare appropriately.

I want to access safety information during flood events so that I can protect myself and my family.
I want to find designated security meeting points so that I know where to go during emergencies.

I want to register for flood notifications so that I receive timely updates about changing conditions.

//------------------------------------------------------------------------

## /(admin/municipal worker)

|-----/admin
|-----------/admin/Auth/
|------------|---/admin/Authenticated/Monitoring
|-----------------|
|-----------------|---/admin/Authenticated/Monitoring/historicalMonitoring
|------------|  
|------------|----/admin/Authenticated/Infrastructure issues
|------------|  
|------------|----/admin/Authenticated/create and update issue
|
_Authenticated User Stories_

## As a municipal employee

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

# Databas struktur

## Vi vet ej hur det byggs upp så vi lägger fokus på api:et idag tills vi kan med mer säkerhet planera databasen och dess struktur

## /Database
