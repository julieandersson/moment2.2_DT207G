"use strict";

const apiUrl = 'https://moment2-dt207g-bqqf.onrender.com/api/workexperience'; // infogar API

// Funktion för att hämta arbetserfarenheter och visa dem i en lista
async function fetchWorkExperience() {
    try {
        // Skickar förfrågan till API:et för att hämta data
        const response = await fetch(apiUrl);

        // Kontrollera om förfrågan lyckades, om inte, skicka ett felmeddelande
        if (!response.ok) {
            throw new Error('Något gick fel med API-förfrågan');
        }
        // Gör om API-svaret till JSON-format
        const workExperiences = await response.json();
        
        const listElement = document.getElementById('work-experience-list');
        listElement.innerHTML = ''; // Rensa listan innan uppdatering

        // Loopa genom varje arbetserfarenhet och lägg till den i listan
        workExperiences.forEach(experience => {
            // Omvandla datum till svenska standard-format
            const startDate = new Date(experience.startdate).toLocaleDateString('sv-SE');
            const endDate = experience.enddate ? new Date(experience.enddate).toLocaleDateString('sv-SE') : 'pågående';
            
            // Nytt list-item för varja arbetserfarenhet
            const listItem = document.createElement('li');
            listItem.textContent = experience.jobtitle + " på " + experience.companyname + " (" + startDate + " - " + endDate + ") i " + experience.location;

            // Lägg till i DOM
            listElement.appendChild(listItem);
        });
    } catch (error) {
        // Felmeddelande om något går fel under hämtningen
        console.error('Fel vid hämtning av arbetserfarenheter:', error);
    }
}

// Kör funktionen när sidan laddas
window.onload = fetchWorkExperience;