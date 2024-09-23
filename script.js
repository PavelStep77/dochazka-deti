const dochazkaSoucty = {};

document.getElementById('zapisDochazku').addEventListener('click', function() {
    const datum = document.getElementById('datum').value;
    const den = document.getElementById('den').value;
    const dochazka = document.querySelectorAll('.dochazka');
    const tabulka = document.getElementById('tabulkaDochazky').getElementsByTagName('tbody')[0];

    for (let i = 0; i < dochazka.length; i++) {
        const jmeno = dochazka[i].getAttribute('data-jmeno');
        if (dochazka[i].checked) {
            // Přidání do tabulky docházky
            const radek = tabulka.insertRow();
            radek.insertCell(0).innerText = jmeno;
            radek.insertCell(1).innerText = datum;
            radek.insertCell(2).innerText = den;
            radek.insertCell(3).innerText = 'Ano';

            // Aktualizace součtu docházky
            if (!dochazkaSoucty[jmeno]) {
                dochazkaSoucty[jmeno] = 0;
            }
            dochazkaSoucty[jmeno]++;
        } else {
            // Přidání do tabulky s "Ne" pro ty, co nebyli přítomní
            if (!dochazkaSoucty[jmeno]) {
                dochazkaSoucty[jmeno] = 0; // Nezaznamenaná přítomnost
            }
            const radek = tabulka.insertRow();
            radek.insertCell(0).innerText = jmeno;
            radek.insertCell(1).innerText = datum;
            radek.insertCell(2).innerText = den;
            radek.insertCell(3).innerText = 'Ne';
        }
    }

    // Reset checkboxy
    for (let i = 0; i < dochazka.length; i++) {
        dochazka[i].checked = false;
    }

    // Aktualizace součtů
    aktualizaceSoucet();
});

function aktualizaceSoucet() {
    const soucetTabulka = document.getElementById('soucetDochazky').getElementsByTagName('tbody')[0];
    soucetTabulka.innerHTML = ''; // Vymazání předchozího obsahu

    for (const jmeno in dochazkaSoucty) {
        const radek = soucetTabulka.insertRow();
        radek.insertCell(0).innerText = jmeno;
        radek.insertCell(1).innerText = dochazkaSoucty[jmeno];
    }
}