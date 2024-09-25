"use strict";

const apiUrl = 'https://moment2-dt207g-bqqf.onrender.com/api/workexperience'; // infogar API

// Funktion för att hämta arbetserfarenheter och visa dem i en lista
async function fetchWorkExperience() {
    const listElement = document.getElementById('work-experience-list');
    if (!listElement) {
        // Om elementet inte finns, avbryt funktionen
        return;
    }

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
            listItem.textContent = experience.jobtitle + " på " + experience.companyname + " (" + startDate + " - " + endDate + ") i " + experience.location + ": " + experience.description;

            // Lägg till i DOM
            listElement.appendChild(listItem);
        });
    } catch (error) {
        // Felmeddelande om något går fel under hämtningen
        console.error('Fel vid hämtning av arbetserfarenheter:', error);
    }
}

// Funktion för att lägga till/skicka en ny arbetserfarenhet via formuläret
async function addWorkExperience(event) {
    event.preventDefault();

    const newExperience = {
        companyname: document.querySelector("#companyname").value,
        jobtitle: document.querySelector("#jobtitle").value,
        location: document.querySelector("#location").value,
        startdate: document.querySelector("#startdate").value,
        enddate: document.querySelector("#enddate").value,
        description: document.querySelector("#description").value,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExperience)
        });

        if (!response.ok) {
            throw new Error('Något gick fel med att skicka data');
        }

        const result = await response.json();
        document.getElementById('response-message').textContent = 'Arbetserfarenhet tillagd!';
    } catch (error) {
        console.error('Fel vid tillägg av arbetserfarenhet:', error);
        document.getElementById('response-message').textContent = 'Ett fel uppstod, försök igen.';
    }
}

// Event listener för att hantera formulärets submit-knapp
const form = document.getElementById('add-experience-form');
if (form) {
    form.addEventListener('submit', addWorkExperience);
}

// Kör funktionen när sidan laddas
window.onload = fetchWorkExperience;