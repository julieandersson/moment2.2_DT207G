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
        // Skickar GET förfrågan till API:et för att hämta data
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
            listItem.innerHTML = `
            <strong>Jobbtitel:</strong> ${experience.jobtitle} <br>
            <strong>Företagsnamn:</strong> ${experience.companyname} <br>
            <strong>Plats:</strong> ${experience.location} <br>
            <strong>Perioden:</strong> ${startDate} - ${endDate} <br>
            <strong>Beskrivning:</strong> ${experience.description}
        `;

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

    // Skapar ett objekt för den nya arbetserfarenheten med värden från formuläret
    const newExperience = {
        companyname: document.querySelector("#companyname").value,
        jobtitle: document.querySelector("#jobtitle").value,
        location: document.querySelector("#location").value,
        startdate: document.querySelector("#startdate").value,
        enddate: document.querySelector("#enddate").value,
        description: document.querySelector("#description").value,
    };

    // Array för att lagra felmeddelanden
    let errors = [];

    // Kontrollera om alla fält är tomma
    if (!newExperience.companyname && !newExperience.jobtitle && !newExperience.location && !newExperience.startdate && !newExperience.enddate && !newExperience.description) {
        errors.push("Formuläret kan inte vara tomt.");
    } else {
        if (!newExperience.companyname) errors.push("Du måste ange ett företagsnamn.");
        if (!newExperience.jobtitle) errors.push("Du måste ange en jobbtitel.");
        if (!newExperience.location) errors.push("Du måste ange en plats.");
        if (!newExperience.startdate) errors.push("Du måste ange ett startdatum.");
        if (!newExperience.enddate) errors.push("Du måste ange ett slutdatum.");
        if (!newExperience.description) errors.push("Du måste ange en beskrivning av ditt arbete.");
    }

    if (errors.length > 0) {
        document.getElementById('response-message').textContent = errors.join(", ");
        return; // Stoppa om det finns fel
    }  

    try {
        // Skickar förfrågan till API:et för att lägga till den nya arbetserfarenheten
        const response = await fetch(apiUrl, {
            method: 'POST', // POST-förfrågan
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExperience) // Konvertera till JSON
        });


        if (!response.ok) {
            const errorData = await response.json();
            // Visar felmeddelanden från servern om de finns
            document.getElementById('response-message').textContent = errorData.errors.join(", ");
            return;
        }

        const result = await response.json();
        // Meddelande för att bekräfta att arbetserfarenheten har lagts till
        document.getElementById('response-message').textContent = 'Arbetserfarenhet tillagd!';
    } catch (error) {
        console.error('Fel vid tillägg av arbetserfarenhet:', error);
        // Visa felmeddelande
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