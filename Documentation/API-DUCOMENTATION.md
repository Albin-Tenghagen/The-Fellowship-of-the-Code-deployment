hej
Beskrivning av API:er
Strukturen för API:ets olika endpoints och routing är nu färdiga i sin grundform.
Default :
localhost:5000/
//---------------------------------------------------
User route :
http://localhost:5000/user/
//---------------------------------------------------
User routes :
http://localhost:5000/user/tips
http://localhost:5000/user/risks
http://localhost:5000/user/notifications
http://localhost:5000/user/safety
//---------------------------------------------------
Admin route :
localhost:5000/admin/
localhost:5000/admin/adminAuth/
//---------------------------------------------------
Monitoring routes :
http://localhost:5000/admin/adminAuth/authenticated/monitoring/
http://localhost:5000/admin/adminAuth/authenticated/monitoring/historicalMonitoring
//---------------------------------------------------
Other routes :
http://localhost:5000/admin/adminAuth/authenticated/issueUpkeep
http://localhost:5000/admin/adminAuth/authenticated/infrastructureIssues

Detta är URL:erna för dem olika endpointerna. Dem kommer tillhandahålla olika handlingar och information som användare och arbetare kan komma åt. Urls har namngets på så vis att dem ska vara hyfsate självförklarande
