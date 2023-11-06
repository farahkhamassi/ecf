document.addEventListener('DOMContentLoaded', function () {
    const boutonRecherche = document.getElementById('boutonRecherche');
    const resultat = document.getElementById('resultats');
    const key = "ce2e689";

    boutonRecherche.addEventListener('click', () => {
        resultat.innerHTML = ''; 

        const titre = document.getElementById('titre').value;
        const annee = document.getElementById('annee').value;
        const type = document.getElementById('typeSelection').value;

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                if (response.Search) {
                    response.Search.forEach((film) => {
                        const poster = film.Poster;
                        const title = film.Title;
                        const year = film.Year;

                        const resultatFilm = document.createElement('div');
                        resultatFilm.className = 'resultat';

                        const image = document.createElement('img');
                        image.alt = title;

                        if (poster !== "N/A") {
                            image.src = poster;
                        } else {
                            image.src = "poster par defaut.jpg";
                        }

                        resultatFilm.appendChild(image);
                        resultatFilm.innerHTML += `
                            <p>${title}</p>
                            <p>Année: ${year}</p>
                        `;

                        resultat.appendChild(resultatFilm);
                    });
                } else {
                    resultat.innerHTML = '<p>Aucun résultat trouvé.</p>';
                }
            }
        };

        xhr.open('GET', `http://www.omdbapi.com/?apikey=${key}&s=${titre}&y=${annee}&type=${type}`);
        xhr.send();
    });
});
