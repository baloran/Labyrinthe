/*
    Prototypes
*/
/*
function Arme (){

    this.type = "1K47";

    this.feu = function (){
        alert('faire feu');
    };

}

function Mechant (nom){

    this.vie = 100;
    this.nom = nom;
    this.arme = new Arme();

    this.attaque = function (){
        alert('attaquer');
    };

}

function Tiles(genre, nbre_murs) {

    this.murs = config.nbre_murs;

}


/*
    Objet | Entité
*/
/*
var toto = new Mechant();
//toto.attaquer();

var Tiles00 = new Tiles('genre', A);


/*
    Json
*/
/*
var dependances = {
    donjon: true
};


var config = {

    0 : new Array(false, true, true, true),
    1 : new Array(true, false, true, true),
    2 : new Array(true, true, false, true),
    3 : new Array(true, true, true, false),
    4 : new Array(false, false, true, true),
    5 : new Array(true, false, false, true),
    6 : new Array(true, true, false, false),
    7 : new Array(false, true, true, false),
    8 : new Array(false, false, false, true),
    9 : new Array(true, false, false, false),
    A : new Array(false, true, false, false),
    B : new Array(false, false, true, false),
    C : new Array(false, true, false, true),
    D : new Array(true, false, true, false),
    E : new Array(true, true, true, true),
    F : new Array(false, false, false, false)

}

*/























var TabBool = new Array();
var Murs = new Array();

function construction(nombre_case, nombre_case_ligne) 
{

    $

    contenu = "<table id='tableau'>";

    for (i = 0; i < nombre_case; i++) 
    {
        if(i % nombre_case_ligne == 0 && i !=0)
        {
            contenu = contenu + "<tr>";
        }
        
        contenu = contenu + "<td><div id='case_" + i + "' class='case'></div></td>";
        TabBool[i] = false;
        Murs[i] = new Array();
        for (t = 0; t < 4; t++)
        {
            Murs[i][t] = 1;
        }
        
        if(i % nombre_case_ligne == i - 1 && i !=0)
        {
            contenu = contenu + "</tr>";
        }
    }
    contenu = contenu + "</table>";
    $("#content").append(contenu);
}

construction(1200, 60);

var pile = new Array();
var nombre_case = 1200;
var nombre_case_ligne = 60;

var voisin = new Array();
var z = 0;
var k = chiffre_aleatoire(nombre_case);

var compteur = 0;

//pile.push(12);

//console.log(pile);

//labyrinthe(12);

function labyrinthe(k) {
    
    $('#case_' + k).css("background", "#0d0a02");
    TabBool[k] = true;

    //console.log(fil_arianne.length);
    //console.log(cheminement_long.length);
    /*if(fil_arianne.length > cheminement_long.length)
    {
        cheminement_long = fil_arianne;
    }*/


    //test = trouver_voisins(k);
    //case_choisie = chiffre_aleatoire(voisin.length);
    //TabBool[k][l] = true;
    //$(case_choisie).css("background", "#450045");

    //console.log(test);

    case_suivante = trouver_voisins(k);

    //console.log(case_suivante);

    if(case_suivante == false)
    {
        fil_arianne.pop();
        case_suivante = fil_arianne[fil_arianne.length - 1];
        if(case_suivante == fil_arianne[0])
        {
            return;
        }
    }
    //TabBool[case_suivante] = true;
    
    
        setTimeout('labyrinthe(case_suivante)', 5);
        //labyrinthe(case_suivante);
}


var fil_arianne = new Array();
var cheminement_long = new Array();
labyrinthe(0);

function chiffre_aleatoire(C){
    x = Math.floor(Math.random() * C);
    return x;
}

function trouver_voisins(k) {
    

    voisin = new Array();
    z = 0;
    case_dessus = k - nombre_case_ligne;
    case_droite = k + 1;
    case_bas = k + nombre_case_ligne;
    case_gauche = k - 1;

    //console.log(case_dessus);


    if(TabBool[case_dessus] == false && case_dessus >= 0)
    {
        voisin[z] = case_dessus;
        z = z + 1;
    }
    if(TabBool[case_droite] == false && (k % nombre_case_ligne) != nombre_case_ligne - 1)
    {
        voisin[z] = case_droite;
        z = z + 1;
    }
    if(TabBool[case_bas] == false && case_dessus <= nombre_case)
    {
        voisin[z] = case_bas;
        z = z + 1;
    }
    if((TabBool[case_gauche] == false && (k % nombre_case_ligne) != 0))
    {
        voisin[z] = case_gauche;
        z = z + 1;
    }

    //console.log(voisin);
    //console.log(voisin.length);



    if(voisin.length == 0)
    {
        return false;
    }

    if(fil_arianne.length > cheminement_long.length)
    {
        for (f = 0; f <= fil_arianne.length; f++)
        {
            cheminement_long[f] = fil_arianne[f];
        }
    }


    fil_arianne.push(k);

    

    case_suivante = voisin[chiffre_aleatoire(voisin.length)];
    

    switch(case_suivante) 
    {
        case case_dessus:
        $("#case_" + k).css('borderTop', '3px #0d0a02 solid');
        $("#case_" + case_suivante).css('borderBottom', '3px #0d0a02 solid');
        Murs[k][0] = 0;
        Murs[case_suivante][2] = 0;
        break;

        case case_droite:
        $("#case_" + k).css('borderRight', '3px #0d0a02 solid');
        $("#case_" + case_suivante).css('borderLeft', '3px #0d0a02 solid');
        Murs[k][1] = 0;
        Murs[case_suivante][3] = 0;
        break;

        case case_bas:
        $("#case_" + k).css('borderBottom', '3px #0d0a02 solid');
        $("#case_" + case_suivante).css('borderTop', '3px #0d0a02 solid');
        Murs[k][2] = 0;
        Murs[case_suivante][0] = 0;
        break;

        case case_gauche:
        $("#case_" + k).css('borderLeft', '3px #0d0a02 solid');
        $("#case_" + case_suivante).css('borderRight', '3px #0d0a02 solid');
        Murs[k][3] = 0;
        Murs[case_suivante][1] = 0;
        break;
    }


    return case_suivante;
}




function choix_image() {
    for (i = 0; i < nombre_case; i++) 
    {
        /*switch (Murs[i][0])
        {
            case 0:
            switch (Murs[i][1])
            {
                case 0:
                switch (Murs[i][2])
                {
                    case 0:
                    switch (Murs[i][3])
                    {
                        case 0:
                        $('#case_' + i).css("backgroundColor", "#ff0000");
                        break;

                        case 1:
                        $('#case_' + i).css("backgroundColor", "#450000");
                        break;
                    }
                    case 1:
                    switch (Murs[i][3])
                    {
                        case 0:
                        $('#case_' + i).css("backgroundColor", "#004500");
                        break;

                        case 1:
                        $('#case_' + i).css("backgroundColor", "#000045");
                        break;
                    }
                }
                case 1:
                switch (Murs[i][2])
                {
                    case 0:
                    switch (Murs[i][3])
                    {
                        case 0:
                        $('#case_' + i).css("background", "#450045");
                        break;

                        case 1:
                        $('#case_' + i).css("background", "#454500");
                        break;
                    }
                    case 1:
                    switch (Murs[i][3])
                    {
                        case 0:
                        $('#case_' + i).css("background", "#004545");
                        break;

                        case 1:
                        $('#case_' + i).css("background", "#454545");
                        break;
                    }
                }
            }
            case 1:
            switch (Murs[i][1])
            {
                case 0:
                switch (Murs[i][2])
                {
                    case 0:
                    switch (Murs[i][3])
                    {
                        case 0:
                        $('#case_' + i).css("background", "#110000");
                        break;

                        case 1:
                        $('#case_' + i).css("background", "#001100");
                        break;
                    }
                    case 1:
                    switch (Murs[i][3])
                    {
                        case 0:
                        $('#case_' + i).css("background", "#000011");
                        break;

                        case 1:
                        $('#case_' + i).css("background", "#110011");
                        break;
                    }
                }
                case 1:
                switch (Murs[i][2])
                {
                    case 0:
                    switch (Murs[i][3])
                    {
                        case 0:
                        $('#case_' + i).css("background", "#111100");
                        break;

                        case 1:
                        $('#case_' + i).css("background", "#001111");
                        break;
                    }
                    case 1:
                    switch (Murs[i][3])
                    {
                        case 0:
                        $('#case_' + i).css("background", "#111111");
                        break;

                        case 1:
                        $('#case_' + i).css("background", "#dedede");
                        break;
                    }
                }
            }
        }*/



        if (Murs[i][0] == 1 && Murs[i][1] == 0 && Murs[i][2] == 0 && Murs[i][3] == 0)
        {
            $('#case_' + i).css('background-image', 'url(images/carres30/carre_haut.png)');
        }
        else
        {
            if (Murs[i][0] == 0 && Murs[i][1] == 1 && Murs[i][2] == 0 && Murs[i][3] == 0)
            {
                $('#case_' + i).css('background-image', 'url(images/carres30/carre_droite.png)');
            }
            else
            {
                if (Murs[i][0] == 0 && Murs[i][1] == 0 && Murs[i][2] == 1 && Murs[i][3] == 0)
                {
                    $('#case_' + i).css('background-image', 'url(images/carres30/carre_bas.png)');
                }
                else
                {
                    if (Murs[i][0] == 0 && Murs[i][1] == 0 && Murs[i][2] == 0 && Murs[i][3] == 1)
                    {
                        $('#case_' + i).css('background-image', 'url(images/carres30/carre_gauche.png)');
                    }
                    else
                    {
                        if (Murs[i][0] == 1 && Murs[i][1] == 1 && Murs[i][2] == 0 && Murs[i][3] == 0)
                        {
                            $('#case_' + i).css('background-image', 'url(images/carres30/carre_haut_droite.png)');
                        }
                        else
                        {
                            if (Murs[i][0] == 0 && Murs[i][1] == 1 && Murs[i][2] == 1 && Murs[i][3] == 0)
                            {
                                $('#case_' + i).css('background-image', 'url(images/carres30/carre_droite_bas.png)');
                            }
                            else
                            {
                                if (Murs[i][0] == 0 && Murs[i][1] == 0 && Murs[i][2] == 1 && Murs[i][3] == 1)
                                {
                                    $('#case_' + i).css('background-image', 'url(images/carres30/carre_bas_gauche.png)');
                                }
                                else
                                {
                                    if (Murs[i][0] == 1 && Murs[i][1] == 0 && Murs[i][2] == 0 && Murs[i][3] == 1)
                                    {
                                        $('#case_' + i).css('background-image', 'url(images/carres30/carre_haut_gauche.png)');
                                    }
                                    else
                                    {
                                        if (Murs[i][0] == 1 && Murs[i][1] == 0 && Murs[i][2] == 1 && Murs[i][3] == 0)
                                        {
                                            $('#case_' + i).css('background-image', 'url(images/carres30/carre_haut_bas.png)');
                                        }
                                        else
                                        {
                                            if (Murs[i][0] == 0 && Murs[i][1] == 1 && Murs[i][2] == 0 && Murs[i][3] == 1)
                                            {
                                                $('#case_' + i).css('background-image', 'url(images/carres30/carre_droite_gauche.png)');
                                            }
                                            else
                                            {
                                                if (Murs[i][0] == 1 && Murs[i][1] == 1 && Murs[i][2] == 1 && Murs[i][3] == 0)
                                                {
                                                    $('#case_' + i).css('background-image', 'url(images/carres30/carre_haut_droite_bas.png)');
                                                }
                                                else
                                                {
                                                    if (Murs[i][0] == 0 && Murs[i][1] == 1 && Murs[i][2] == 1 && Murs[i][3] == 1)
                                                    {
                                                        $('#case_' + i).css('background-image', 'url(images/carres30/carre_droite_bas_gauche.png)');
                                                    }
                                                    else
                                                    {
                                                        if (Murs[i][0] == 1 && Murs[i][1] == 0 && Murs[i][2] == 1 && Murs[i][3] == 1)
                                                        {
                                                            $('#case_' + i).css('background-image', 'url(images/carres30/carre_haut_bas_gauche.png)');
                                                        }
                                                        else
                                                        {
                                                            if (Murs[i][0] == 1 && Murs[i][1] == 1 && Murs[i][2] == 0 && Murs[i][3] == 1)
                                                            {
                                                                $('#case_' + i).css('background-image', 'url(images/carres30/carre_haut_droite_gauche.png)');
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

//choix_image();


function principale(event)
{
    var touche = event.keyCode;

    if(touche == 39)
    {
        avancerRight();
    }
    else if(touche == 37)
    {
        avancerLeft();
    }
    else if(touche == 38)
    {
        avancerTop();
    }
    else if(touche == 40)
    {
        avancerBottom();
    }
}

var dirX = 96;
var positionJoueur = 0;
var Moving = false;
var speedJoueur = 50;

function avancerRight()
{
    var perso = $('#joueur').position();
    var left = perso.left;
    var top = perso.top;
    console.log(positionJoueur)
    //div.css("backgroundPosition", "-90px 0px");

    if(Murs[positionJoueur][1] == 0 && Moving == false)
    {
        Moving = true;
        positionJoueur ++;
        $('#joueur').animate(
        {
            left : left + dirX,
        },
        speedJoueur,
        "linear",
        function(){
        //     if(top >= hauteur_apparition)
        //     {
        //         div.css('visibility', 'visible');
        //     }
        //     test_route(ligne, (colonne + 1), div, speed, 'right', speed);
            Moving = false;
            lumiere();
        })
    }
}

function avancerLeft()
{
    var perso = $('#joueur').position();
    var left = perso.left;
    var top = perso.top;
    //div.css("backgroundPosition", "-90px 0px");

    if(Murs[positionJoueur][3] == 0 && Moving == false)
    {
        Moving = true;
        positionJoueur --;
        $('#joueur').animate(
        {
            left : left - dirX,
        },
        speedJoueur,
        "linear",
        function(){
        //     if(top >= hauteur_apparition)
        //     {
        //         div.css('visibility', 'visible');
        //     }
        //     test_route(ligne, (colonne + 1), div, speed, 'right', speed);
            Moving = false;
            lumiere();
        })
    }
}

function avancerBottom()
{
    var perso = $('#joueur').position();
    var left = perso.left;
    var top = perso.top;
    //div.css("backgroundPosition", "-90px 0px");

    if(Murs[positionJoueur][2] == 0 && Moving == false)
    {
        Moving = true;
        positionJoueur = positionJoueur + nombre_case_ligne;
        $('#joueur').animate(
        {
            top : top + dirX,
        },
        speedJoueur,
        "linear",
        function(){
        //     if(top >= hauteur_apparition)
        //     {
        //         div.css('visibility', 'visible');
        //     }
        //     test_route(ligne, (colonne + 1), div, speed, 'right', speed);
            Moving = false;
            lumiere();
        })
    }
}

function avancerTop()
{
    var perso = $('#joueur').position();
    var left = perso.left;
    var top = perso.top;
    //div.css("backgroundPosition", "-90px 0px");

    if(Murs[positionJoueur][0] == 0 && Moving == false)
    {
        Moving = true;
        positionJoueur = positionJoueur - nombre_case_ligne;
        $('#joueur').animate(
        {
            top : top - dirX,
        },
        speedJoueur,
        "linear",
        function(){
        //     if(top >= hauteur_apparition)
        //     {
        //         div.css('visibility', 'visible');
        //     }
        //     test_route(ligne, (colonne + 1), div, speed, 'right', speed);
            Moving = false;
            lumiere();
        })
    }
}

function lightOff() {
    $('#content').css('opacity', 0.5);
}


function lumiere() {
    var right = true;
    var left = true;
    var top = true;
    var bottom = true;

    $('td div').css('opacity', 0);
    $('#case_' + positionJoueur).css('opacity', 1);
    // RIGHT
    for (j = positionJoueur + 1 ; j < positionJoueur + 4 ; j++)
    {
        if(Murs[j][3] == 1)
        {
            right = false;
        }
        if(Murs[j][3] == 0 && right == true)
        {
            $('#case_' + j).css('opacity', 1);
        }
    }


    // LEFT
    for (j = positionJoueur - 1 ; j > positionJoueur - 4 ; j--)
    {
        if(j < 0)
        {
            break;
        }
        if(Murs[j][1] == 1)
        {
            left = false;
        }
        if(Murs[j][1] == 0 && left == true)
        {
            $('#case_' + j).css('opacity', 1);
        }
    }

    // BOTTOM
    for (j = positionJoueur + nombre_case_ligne ; j < positionJoueur + (nombre_case_ligne * 4) ; j = j + nombre_case_ligne)
    {
        if(j < 0)
        {
            break;
        }
        if(Murs[j][0] == 1)
        {
            bottom = false;
        }
        if(Murs[j][0] == 0 && bottom == true)
        {
            $('#case_' + j).css('opacity', 1);
        }
    }

    // TOP
    for (j = positionJoueur - nombre_case_ligne ; j > positionJoueur - (nombre_case_ligne * 4) ; j = j - nombre_case_ligne)
    {
        if(j < 0)
        {
            break;
        }
        if(Murs[j][2] == 1)
        {
            top = false;
        }
        if(Murs[j][2] == 0 && top == true)
        {
            $('#case_' + j).css('opacity', 1);
        }
    }
}