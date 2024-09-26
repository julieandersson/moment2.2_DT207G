# Moment 2.2 - DT207G

## Introduktion till webbtjänster

Denna uppgift tillhör moment 2.2 i kurs DT207G och är en fortsättning på moment 2.1 (https://github.com/julieandersson/moment2_DT207G.git) där det skapades en webbtjänst. 

### Uppgiftsbeskrivning:
Denna uppgift gick alltså ut på att konsumera webbtjänsten från moment 2.1 och skapa en webbplats utifrån bestämda krav. Webbplatsen består utav:
- En startsida
- En lägg till-sida
- En om-sida

Datan i webbtjänsten lagras i en Postgre-databas och uppdateras automatiskt vid ändringar. Webbplatsen använder Fetch API med GET, POST samt DELETE för att visa datan i en lista, lägga till ny post i listan samt radera en post. 

### Funktionalitet
På startsidan visas all data (arbetserfarenheter) i enskilda "block" i en lista. Här kan användaren även välja att radera en arbetserfarenhet om man vill. 

På lägg till-sidan finns ett formulär där användaren kan lägga till nya arbetserfarenheter som sedan visas i listan på startsidan. Felmeddelanden är definerade för formuläret om fält skulle saknas när en ny post skapas. 

Om-sidan beskriver webbplatsen och dess syfte, samt information om vilken databas-server som använts och mina egna slutsatser av uppgiften. 

### Använda tekniker
Detta projekt är skapad med HTML, JavaScript och CSS samt använder Parcel för en automatiserad utvecklingsmiljö. Commits har gjorts i detta repository på Github. Redovisning av uppgiften sker i form av en videodemonstration. 

### Skapad av:
- Julie Andersson
- Webbutvecklingsprogrammet på Mittuniversitetet i Sundsvall
- Moment 2.2 i kursen DT207G Backendbaserad Webbutveckling

