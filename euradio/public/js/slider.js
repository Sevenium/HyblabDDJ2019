var valeurRadio;
var hasChanged = false;
var radios = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed','Al', 'eiusmod','Euradio', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua','Ut','Coucou','On','Continu','jusqu'];


$('#draggable').draggable({
  axis: "x",
  grid: [ 27, 20 ],
  drag: function( event, ui ) {
    var offset = $(this).offset(); // Avoir les coordonnées du slider
    var xPos = offset.left; //
    changer_radio(xPos);
  },
  containment: "parent"
});

function changer_radio(xPos){
  var position = xPos;
  var valeur = parseInt(((parseInt(xPos) - 547)/27))+7; //Valeur réelle
  $( ".imagesPage1 p" ).text(radios[valeur]);
  console.log((valeur));
  if(!hasChanged){
    valeurRadio = valeur%10+1;
    document.getElementById('imgBackground').src="img/RadioFm/Radiofm_fréquence_"+valeurRadio+".png";
  }else{
    valeurRadio = valeur%7+1;
    document.getElementById('imgBackground').src="img/RadioRnt/Radiornt_img_"+valeurRadio+".png";
  }

  if( !hasChanged &&valeur >18){
    hasChanged =true;
    //document.getElementById('imgBackground').src="img/rntradioRNT.png";

    //document.getElementById('conteneurRadio').style.width= "40%";
    //document.getElementById('conteneurRadio').style.marginTop= "6%";
    //document.getElementById('conteneurRadio').style.marginBottom= "5%";

    document.getElementById('sliderBackground').src="img/slider_rnt_ok.png";

    document.getElementById('conteneurLigne').style.width= "50%";
    document.getElementById('conteneurLigne').style.margin= "auto";
    document.getElementById('conteneurLigne').style.marginTop= "-1%";
    //document.getElementById('imgBackground').marginRight="5px";
    $('#draggable').draggable({
      axis: "x",
      grid: [ 23, 20 ],
      drag: function( event, ui ) {
        var offset = $(this).offset(); // Avoir les coordonnées du slider
        var xPos = offset.left; //
        offset.left=changer_radio(xPos);
      },
      containment: "parent"
    });
    //document.getElementById('nomRadio').style.top="65%";
    //document.getElementById('nomRadio').style.left="50%";
  }
}
