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
        const adjustedDate = new Date(now);
        // User requested -1 day adjustment for local sighting
        adjustedDate.setDate(now.getDate() - 1);

        const hijriMonths = [
            "MUHARRAM", "SAFAR", "RABI' AL-AWWAL", "RABI' AL-THANI",
            "JUMADA AL-ULA", "JUMADA AL-AKHIRA", "RAJAB", "SHA'BAN",
            "RAMADAN", "SHAWWAL", "DHU AL-QI'DA", "DHU AL-HIJJA"
        ];

        // Use numeric values to avoid browser text fallback bugs
        const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        }).formatToParts(adjustedDate);

        const hDay = parts.find(p => p.type === 'day').value;
        const hMonthIndex = parseInt(parts.find(p => p.type === 'month').value) - 1;
        const hYear = parts.find(p => p.type === 'year').value;

        const hMonthName = hijriMonths[hMonthIndex] || "UNKNOWN";
        document.getElementById("hijri").textContent = `${hDay} ${hMonthName} ${hYear} AH`;
    } catch (e) {
        console.error("Hijri error:", e);
        document.getElementById("hijri").textContent = "HIJRI DATA ERROR";
    }
}

// Initial call and interval
updateClock();
setInterval(updateClock, 1000);
