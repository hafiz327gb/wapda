function updateClock() {
    const now = new Date();

    // Time Formatting
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

    // Gregorian Date
    const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    document.getElementById("time").textContent = timeString;
    document.getElementById("gdate").textContent = `${String(now.getDate()).padStart(2, '0')} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
    document.getElementById("day").textContent = dayNames[now.getDay()];

    // Hijri Date Calculation
    try {
        // Adjust for local Hijri calculation if needed (-1 or +1)
        const adjustedDate = new Date(now);
        // Note: The original code used a -1 adjustment, we'll keep that logic if it matches user's local sighting.
        adjustedDate.setDate(now.getDate() - 1);

        const hijriOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            calendar: 'islamic-umalqura'
        };

        const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // For better control, we can extract parts
        const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).formatToParts(adjustedDate);

        const hDay = parts.find(p => p.type === 'day').value;
        const hMonth = parts.find(p => p.type === 'month').value;
        const hYear = parts.find(p => p.type === 'year').value;

        document.getElementById("hijri").textContent = `${hDay} ${hMonth.toUpperCase()} ${hYear} AH`;
    } catch (e) {
        console.error("Hijri error:", e);
        document.getElementById("hijri").textContent = "HIJRI DATA ERROR";
    }
}

// Initial call and interval
updateClock();
setInterval(updateClock, 1000);
