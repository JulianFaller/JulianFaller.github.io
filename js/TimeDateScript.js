function updateDateTime() {
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');

    const now = new Date();
    
    // Datum formatieren
    const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = now.toLocaleDateString('de-DE', optionsDate);
    
    // Uhrzeit formatieren
    const optionsTime = { hour: '2-digit', minute: '2-digit' };         // second: '2-digit'
    const formattedTime = now.toLocaleTimeString('de-DE', optionsTime);
    
    dateElement.textContent = formattedDate;
    timeElement.textContent = formattedTime;
}

// Aktualisiere Datum und Uhrzeit beim Laden der Seite
updateDateTime();
// Aktualisiere Datum und Uhrzeit jede Sekunde
setInterval(updateDateTime, 1000);
