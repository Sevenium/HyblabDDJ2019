'use strict';

// No need for window.onload event here since we are using the def attribute
// when loading our scripts

// Load a dummy json file using the fetch API
fetch('data/dummy.json')
    // this promise will be fulfilled when the json fill will be
    .then(function (response){
        // if we could load the resource, parse it
        if( response.ok )
            return response.json();
        else // if not, send some error message as JSON data
            return {data: "JSON file not found"};

    })
    // in case of invalid JSON (parse error) send some error message as JSON data
    .catch( function (error){
        return {data: "Invalid JSON"};
    })
    // this promise will be fulfilled when the json will be parsed
    .then(function (json) {
        document.querySelector('#data')
            .textContent = json.data;
    });

    //Pour le onepage
      new fullpage('#fullpage', {
      });
      $('.down').click(function(){ //Fleche du bas qui fait changer la slide
        fullpage_api.moveSectionDown();
      });
      $('.up').click(function(){ //Fleche du haut qui fait changer la slide
        fullpage_api.moveSectionUp();
      });

      var maison = true;
      var radio = false;
      var recepteur = false;
      var route = false;
      var voiture = false;
      var reseau = false;
      var donneeAffichee ="maison";

      //Lecture de données
      var ourData;
       d3.csv("csv/Donnees.csv").then(function(data) {
          console.log(data); // [{"Hello": "world"}, …]
          //console.log(data[10])
          ourData=data;
          affichageGraphique(data);
      });
var ctx;
var xPosRouge ;
var xPosJaune ;
var valRouge=2;
var valJaune=0;
var myLineChart;
var otherLineChart;
var reseauRougeData;
var reseauJauneData;
var chartData;
var chartData2;

//Corps du js en asynchrone
function affichageGraphique(data,val1,val2){
  //format de données pour un affichage classique jaune
   chartData2 = {
      labels: ["",""],
      datasets: [{
        data: [data[valJaune][donneeAffichee],100-data[valJaune][donneeAffichee]],
        backgroundColor: ['rgba(252, 233, 55, 1)','rgba(252, 233, 55, 0)'], // green
        borderColor:['rgba(252, 233, 55, 1)','rgba(252, 233, 55, 1)'],
        borderWidth:5

      }],


  };
  //option associée
  var opt2 = {
    responsive: false,
    legend: {
          display: false
      },
    scales: {
       xAxes: [{
          display:false
       }],
       yAxes: [{
          display:false
       }]
    },
    cutoutPercentage: 70,
    segmentShowStroke: false
  };
  // Chart pour le jaune
   var ctx2 = document.getElementById("ctx2"),
       otherLineChart = new Chart(ctx2, {
          type: 'doughnut',
          data: chartData2,
          options: opt2,

       });
  //format de données pour un affichage classique rouge
   chartData = {
      labels: ["",""],
      datasets: [{
        data: [data[valJaune][donneeAffichee],100-data[valJaune][donneeAffichee]],
        backgroundColor: ['rgba(230, 55, 75, 1)','rgba(230, 55, 75, 0)'], // green
        borderColor:['rgba(230, 55, 75, 1)','rgba(230, 55, 75, 1)'],
        borderWidth:5

      }],


  };
  //format de données splitées jaunes
   reseauJauneData = {
      labels: ["",""],
      datasets: [{
        data: [data[valJaune]["reseau"],100-data[valJaune]["reseau"]],
        backgroundColor: ['rgba(252, 233, 55, 1)','rgba(252, 233, 55, 0)'], // green
        borderColor:['rgba(252, 233, 55, 1)','rgba(252, 233, 55, 1)'],
        borderWidth:5

      },
      {
        data: [data[valJaune]["reseau2"],100-data[valJaune]["reseau2"]],
        backgroundColor: ['rgba(252, 210, 55, 1)','rgba(252, 210, 55, 0)'], // green
        borderColor:['rgba(252, 210, 55, 1)','rgba(252, 210, 55, 1)'],
        borderWidth:5

      }
    ],


  };
  //format de données splitées rouge
   reseauRougeData = {
      datasets: [{
        labels: ["",""],
        data: [data[valRouge]["reseau"],100-data[valRouge]["reseau"]],
        backgroundColor: ['rgba(230, 55, 75, 1)','rgba(230, 55, 75, 0)'], // green
        borderColor:['rgba(230, 55, 75, 1)','rgba(230, 55, 75, 1)'],
        borderWidth:5

      },
      {
        labels: ["",""],
        data: [data[valRouge]["reseau2"],100-data[valRouge]["reseau2"]],
        backgroundColor: ['rgba(200, 55, 90, 1)','rgba(200, 55, 90, 0)'], // green
        borderColor:['rgba(200, 55, 90, 1)','rgba(200, 55, 90, 1)'],
        borderWidth:5

      }
    ],


  };

  var opt = {
    responsive: false,
    legend: {
          display: false
      },
    scales: {
       xAxes: [{
          display:false
       }],
       yAxes: [{
          display:false
       }]
    },
    cutoutPercentage: 70,
    segmentShowStroke: false
  };
  // Graphique rouge
  ctx = document.getElementById("ctx"),
       myLineChart = new Chart(ctx, {
          type: 'doughnut',
          data: chartData,
          options: opt,

       });
       // Ajout des evenements des pictogrammes
       $('#maison').on({
         mouseenter: function () {
           if(!maison){
             document.getElementById('maison').src="img/Picto/Picto maison-blanc.png"
           }
         },
         mouseleave: function () {
           if(!maison){
             document.getElementById('maison').src="img/Picto/Picto maison-bleu.png"
           }
         },
         click: function(){
           document.getElementById('pictoCentrale').src="img/Picto/Picto maison-bleu.png"
           pictoChanging(true,false,false,false,false,false);
         }
       });
       $('#recepteur').on({
         mouseenter: function () {
           if(!recepteur){
             document.getElementById('recepteur').src="img/Picto/Picto recepteur-blanc.png"
           }
         },
         mouseleave: function () {
           if(!recepteur){
             document.getElementById('recepteur').src="img/Picto/Picto recepteur-bleu.png"
           }
         },
         click: function(){
           document.getElementById('pictoCentrale').src="img/Picto/Picto recepteur-bleu.png"
           pictoChanging(false,false,true,false,false,false);
         }
       });
       $('#route').on({
         mouseenter: function () {
           if(!route){
             document.getElementById('route').src="img/Picto/Picto route-blanc.png"
           }
         },
         mouseleave: function () {
           if(!route){
             document.getElementById('route').src="img/Picto/Picto route-bleu.png"
           }
         },
         click: function(){
           document.getElementById('pictoCentrale').src="img/Picto/Picto route-bleu.png"
           pictoChanging(false,false,false,true,false,false);
         }
       });
       $('#voiture').on({
         mouseenter: function () {
           if(!voiture){
             document.getElementById('voiture').src="img/Picto/Picto voiture-blanc.png"
           }
         },
         mouseleave: function () {
           if(!voiture){
             document.getElementById('voiture').src="img/Picto/Picto voiture-bleu.png"
           }
         },
         click: function(){
           document.getElementById('pictoCentrale').src="img/Picto/Picto voiture-bleu.png"
           pictoChanging(false,false,false,false,true,false);
         }
       });
       $('#reseau').on({
         mouseenter: function () {
           if(!reseau){
             document.getElementById('reseau').src="img/Picto/Picto couverture réseaux-blanc.png"
           }
         },
         mouseleave: function () {
           if(!reseau){
             document.getElementById('reseau').src="img/Picto/Picto couverture réseaux-bleu.png"
           }
         },
         click: function(){
           document.getElementById('pictoCentrale').src="img/Picto/Picto couverture réseaux-bleu.png"
           pictoChanging(false,false,false,false,false,true);
         }
       });


       // Changement du pictogramme selectionné et des données à afficher
       function pictoChanging(maison2,radio2,recepteur2,route2,voiture2,reseau2) {
         maison = maison2;
         radio = radio2;
         recepteur =recepteur2;
         route = route2;
         voiture =voiture2;
         reseau =reseau2;
         if (maison) {
           document.getElementById('maison').src="img/Picto/Picto maison-blanc.png";
           document.getElementById('critere').innerHTML="TAUX D’ÉQUIPEMENT EN RÉCEPTEURS DAB+ ";
           donneeAffichee ="maison";
         }else{
           document.getElementById('maison').src="img/Picto/Picto maison-bleu.png"
         }
         if (recepteur) {
           document.getElementById('recepteur').src="img/Picto/Picto recepteur-blanc.png";
           document.getElementById('critere').innerHTML="NOMBRE DE STATIONS NATIONALES EN DAB/DAB+ / EN FM";
           donneeAffichee ="recepteur";
         }else{
           document.getElementById('recepteur').src="img/Picto/Picto recepteur-bleu.png";
         }
         if (route) {
           document.getElementById('route').src="img/Picto/Picto route-blanc.png";
           document.getElementById('critere').innerHTML="DAB/DAB+ : TAUX DE COUVERTURE ROUTIÈRE du DAB+";
           donneeAffichee ="route";
         }else{
           document.getElementById('route').src="img/Picto/Picto route-bleu.png"
         }
         if (voiture) {
           document.getElementById('voiture').src="img/Picto/Picto voiture-blanc.png"
           document.getElementById('critere').innerHTML=" TAUX DES NOUVEAUX VÉHICULES INTÉGRANT LE DAB+";
           donneeAffichee ="voiture";
         }else{
           document.getElementById('voiture').src="img/Picto/Picto voiture-bleu.png"
         }
         if (reseau) {
           document.getElementById('reseau').src="img/Picto/Picto couverture réseaux-blanc.png"
           document.getElementById('critere').innerHTML="ÉTENDUE DE LA COUVERTURE DU RÉSEAU DAB+";
           donneeAffichee ="reseau";
         }else{

           document.getElementById('reseau').src="img/Picto/Picto couverture réseaux-bleu.png"
         }
         refreshOtherLine(otherLineChart,data); //update des graphiques
         refreshMyLine(myLineChart,data);
       }

document.getElementById('paysJaune').innerHTML=data[valJaune]["nomPays"];
document.getElementById('paysRouge').innerHTML=data[valRouge]["nomPays"];
document.getElementById('valeurJaune').innerHTML=data[valJaune][donneeAffichee]+"%";
document.getElementById('valeurRouge').innerHTML=data[valRouge][donneeAffichee]+"%";
//fin Graphiques

//bouton rouge du slider
$('#rouge').draggable({
  axis: "x",
  grid: [ 62, 10 ],
  drag: function( event, ui ) {
    var offset = $(this).offset(); // Avoir les coordonnées du slider
    var xPos = offset.left; //
    valRouge = parseInt((xPos - xPosRouge)/60)+2;
    //console.log(valRouge);
    refreshMyLine(myLineChart,data);
  },
  create: function(event,ui){
    xPosRouge = $(this).offset().left;
  },
  containment: "parent"
});
//bouton jaune du slider
$('#jaune').draggable({
  axis: "x",
  grid: [ 62, 10 ],
  drag: function( event, ui ) {
    var offset = $(this).offset(); // Avoir les coordonnées du slider
    var xPos = offset.left; //
    valJaune = parseInt((xPos - xPosJaune)/60);
    refreshOtherLine(otherLineChart,data);

  },
  create: function(event,ui){
    xPosJaune = $(this).offset().left;
  },
  containment: "parent"
});



};

// Update du graphique rouge
function refreshMyLine(chart,data) {
  if (valRouge<0) {
    valRouge =0;
  }
  if(valRouge>8){
    valJaune =8;
  }

  if(donneeAffichee=="reseau"){ // Cas de selection du réseau qui est a 2 données
    chart.data = reseauRougeData; // Changement du type de données
    chart.data.datasets[0].data = [data[valRouge][donneeAffichee],100-data[valRouge][donneeAffichee]]; //Update des données
    chart.data.datasets[1].data = [data[valRouge]["reseau2"],100-data[valRouge]["reseau2"]];
    document.getElementById('sousRouge').innerHTML= "(2013) / (2018)";
    if (data[valRouge]["nomPays"]=="Pays-Bas"){ // Les données du Pays-Bas sont manquantes donc à gérer
      document.getElementById('valeurRouge').innerHTML="ND / "+data[valRouge][donneeAffichee]+"%";
    }else{
      document.getElementById('valeurRouge').innerHTML=data[valRouge][donneeAffichee]+"% / "+data[valRouge]["reseau2"]+"%";
    }

  }else if(donneeAffichee=="recepteur"){ // Dans le cas du recepteur, les données ne sont pas des pourcentages mais un nombre de radios
    chart.data = chartData;
    chart.data.datasets[0].data = [data[valRouge][donneeAffichee],data[valRouge]["recepteur2"]];
    document.getElementById('valeurRouge').innerHTML=data[valRouge][donneeAffichee]+" / "+data[valRouge]["recepteur2"];
    document.getElementById('sousRouge').innerHTML= "DAB+ / FM";
  }else{
    if (((data[valRouge]["nomPays"]=="Belgique"|data[valRouge]["nomPays"]=="Pays-Bas"|data[valRouge]["nomPays"]=="Suisse") && donneeAffichee=="maison")|(data[valRouge]["nomPays"]=="France"&donneeAffichee=="route")){
      document.getElementById('valeurRouge').innerHTML="ND";
    }else{
      document.getElementById('valeurRouge').innerHTML=data[valRouge][donneeAffichee]+"%";
      document.getElementById('sousRouge').innerHTML= "(2018)";
    }
    chart.data = chartData;
    chart.data.datasets[0].data = [data[valRouge][donneeAffichee],100-data[valRouge][donneeAffichee]];

  }

  chart.update(); //raffraichissement
  document.getElementById('paysRouge').innerHTML=data[valRouge]["nomPays"];
}
// Idem pour le graphique jaune
function refreshOtherLine(chart,data) {
  if (valJaune<0) {
    valJaune =0;
  }
  if(valJaune>8){
    valJaune =8;
  }
  if(donneeAffichee=="reseau"){
    chart.data = reseauJauneData;
    chart.data.datasets[0].data = [data[valJaune][donneeAffichee],100-data[valJaune][donneeAffichee]];
    chart.data.datasets[1].data = [data[valJaune]["reseau2"],100-data[valJaune]["reseau2"]];
    document.getElementById('sousJaune').innerHTML= "(2013) / (2018)";
    if (((data[valJaune]["nomPays"]=="Belgique"|data[valJaune]["nomPays"]=="Pays-Bas"|data[valJaune]["nomPays"]=="Suisse") && donneeAffichee=="maison")|(data[valJaune]["nomPays"]=="France"&donneeAffichee=="route")){
      document.getElementById('valeurJaune').innerHTML="ND / "+data[valJaune][donneeAffichee]+"%";
    }else{
      document.getElementById('valeurJaune').innerHTML=data[valJaune][donneeAffichee]+"% / "+data[valJaune]["reseau2"]+"%";
    }

  }else if(donneeAffichee=="recepteur"){
    chart.data = chartData2;
    chart.data.datasets[0].data = [data[valJaune][donneeAffichee],data[valJaune]["recepteur2"]];
    document.getElementById('valeurJaune').innerHTML=data[valJaune][donneeAffichee]+" / "+data[valJaune]["recepteur2"];
    document.getElementById('sousJaune').innerHTML= "DAB+ / FM";
  }else{
    if ((data[valJaune]["nomPays"]=="Suisse"|data[valJaune]["nomPays"]=="Belgique"|data[valJaune]["nomPays"]=="Pays-Bas") && donneeAffichee=="maison"|(data[valRouge]["nomPays"]=="France"&donneeAffichee=="route")){
      document.getElementById('valeurJaune').innerHTML="ND";
    }else{
      document.getElementById('valeurJaune').innerHTML=data[valJaune][donneeAffichee]+"%";
    }
    document.getElementById('sousJaune').innerHTML= "(2018)";
    chart.data = chartData2;
    chart.data.datasets[0].data = [data[valJaune][donneeAffichee],100-data[valJaune][donneeAffichee]];

  }
  chart.update();
  document.getElementById('paysJaune').innerHTML=data[valJaune]["nomPays"];
}
