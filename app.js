var films = [
  {
      title: "Deadpool",
      years: 2016,
      authors: "Tim Miller"
  },
  {
      title: "Spiderman",
      years: 2002,
      authors: "Sam Raimi"
  },
  {
      title: "Scream",
      years: 1996,
      authors: "Wes Craven"
  },
  {
      title: "It: chapter 1",
      years: 2019,
      authors: "Andy Muschietti"
  }
];

function generateTable() {
  var table = document.getElementById("filmTable");
  var tableBody = table.getElementsByTagName("tbody")[0];

  for (var i = 0; i < films.length; i++) {
      var film = films[i];
      var row = tableBody.insertRow(i);
      var titleCell = row.insertCell(0);
      var yearCell = row.insertCell(1);
      var authorCell = row.insertCell(2);

      titleCell.innerHTML = film.title;
      yearCell.innerHTML = film.years;
      authorCell.innerHTML = film.authors;
  }
}
window.onload = generateTable;

// Ajouter un film

var addButton = document.getElementById("addButton");
var formulaireAjout = document.getElementById("formulaireAjout");
var filmTable = document.getElementById("filmTable");

addButton.addEventListener("click", function () {
  formulaireAjout.style.display = "block";
});

var saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", function () {
  var titre = document.getElementById("titre").value;
  var annee = document.getElementById("annee").value;
  var auteur = document.getElementById("auteur").value;

  var newRow = filmTable.querySelector("tbody").insertRow();
  var titleCell = newRow.insertCell(0);
  var yearCell = newRow.insertCell(1);
  var authorCell = newRow.insertCell(2);

  titleCell.innerHTML = titre;
  yearCell.innerHTML = annee;
  authorCell.innerHTML = auteur;

  document.getElementById("titre").value = "";
  document.getElementById("annee").value = "";
  document.getElementById("auteur").value = "";

  formulaireAjout.style.display = "none";
});

// Fonction pour le champ selection

function selectTri() {
  var triFiltre = document.getElementById("triFiltre").value;
  var filmTable = document.getElementById("filmTable").getElementsByTagName('tbody')[0];
  var rows = Array.from(filmTable.getElementsByTagName('tr'));

  rows.sort(function(a, b) {
      var valueA = a.getElementsByTagName('td')[triFiltre === 'titre' ? 0 : 1].textContent.toLowerCase();
      var valueB = b.getElementsByTagName('td')[triFiltre === 'titre' ? 0 : 1].textContent.toLowerCase();
      return valueA.localeCompare(valueB);
  });

  rows.forEach(function(row) {
      filmTable.appendChild(row);
  });
}


// Fonction pour supprimer un film

function createDeleteButton(filmIndex) {
  var button = document.createElement("button");
  button.textContent = "Supprimer";
  button.addEventListener("click", function() {
      var confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce film ?");
      if (confirmation) {
          removeFilm(filmIndex);
      }
  });
  return button;
}

function removeFilm(filmIndex) {
  films.splice(filmIndex, 1);

  var table = document.getElementById("filmTable");
  table.deleteRow(filmIndex + 1); 
}

function addFilmToTable(film, filmIndex) {
  var table = document.getElementById("filmTable").getElementsByTagName("tbody")[0];
  var row = table.insertRow(-1); //
  var titleCell = row.insertCell(0);
  var yearCell = row.insertCell(1);
  var authorCell = row.insertCell(2);
  var actionCell = row.insertCell(3);

  titleCell.innerHTML = film.title;
  yearCell.innerHTML = film.years;
  authorCell.innerHTML = film.authors;
  actionCell.appendChild(createDeleteButton(filmIndex));
}

function initializeTable() {
  for (var i = 0; i < films.length; i++) {
      addFilmToTable(films[i], i);
  }
}

window.onload = initializeTable;
