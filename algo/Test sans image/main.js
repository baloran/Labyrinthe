var TabBool = new Array(); // stocke variable TRUE/FALSE pour construction laby
var Murs = new Array(); // stocke variables des 4 murs pour chaque case
var pile = new Array(); 
var fil_arianne = new Array(); // stocke succession de case pour retour en arrière | construction labyrinthe
var cheminement_long = new Array();
var nombre_case = 600; // nombre case totale du labyrinthe
var nombre_case_ligne = 60; // nombre de case par ligne

var voisin = new Array();
var z = 0;

var distance_vue = 3;
// var modificateur_vue = distance_vue / 

var compteur = 0;

var sortie = chiffre_aleatoire(nombre_case); /* ON CHOISIT AU HASARD UNE CASE COMME SORTIE : AMELIORER ALGO
POUR VOIR SI ON PREND QUE SUR LES BORDS, ET sURTOUT LOIN DE LA POSITION DE DEPART */
console.log(sortie);

construction(nombre_case, nombre_case_ligne);

labyrinthe(0);
//$('#case_' + sortie).css("backgroundColor", "#780078");



/*********************************************************************************

CONSTRUCTION DU TABLEAU EN HTML ET CREATION TABLEAU MURS AVEC TOUT LES MURS PLEINS
( = labyrinthe brut, sans chemin)

**********************************************************************************/

function construction(nombre_case, nombre_case_ligne) 
{

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



/**************************************************************************************************************

FONCTION DE CREATION DU LABYRINTHE, QUI BOUCLE AVEC TROUVER_VOISINs() JUSQU'A CE QUE LE LABYRINTHE SOIT TERMINE

***************************************************************************************************************/

function labyrinthe(k) {
    
    //$('#case_' + k).css("background", "#0d0a02");
    if(k == sortie)
    {
        $('#case_' + k).css("background", "#dd00dd");
    }
    TabBool[k] = true;

    case_suivante = trouver_voisins(k);

    if(case_suivante == false)
    {
        fil_arianne.pop();
        case_suivante = fil_arianne[fil_arianne.length - 1];
        if(case_suivante == fil_arianne[0])
        {
            return;
        }
    }  
        /********************************************************************************************************** 
        SWITCH ENTRE CES DEUX LIGNES PERMET D'AVOIR UNE GENERATION SOIT DIRECTE, SOIT "DESSINEE" AU FUR ET A MESURE 
        ***********************************************************************************************************/
        //setTimeout('labyrinthe(case_suivante)', 5);
        labyrinthe(case_suivante);
}


function trouver_voisins(k) {
    

    voisin = new Array();
    z = 0;
    /* ON DETERMINE LES 4 VOISINS */
    case_dessus = k - nombre_case_ligne;
    case_droite = k + 1;
    case_bas = k + nombre_case_ligne;
    case_gauche = k - 1;


    // TEST SI CHAQUE CASE EST NON EXPLOREE ET CONNECTABLE
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


    // SI ON EST DANS UN CUL DE SAC
    if(voisin.length == 0)
    {
        return false;
    }

    // STOCK LE PLUS LONG CHEMIN DANS cheminement_long
    if(fil_arianne.length > cheminement_long.length)
    {
        for (f = 0; f <= fil_arianne.length; f++)
        {
            cheminement_long[f] = fil_arianne[f];
        }
    }


    fil_arianne.push(k);

    
    // CHOIX D'UNE DES CASES AU HASARD
    case_suivante = voisin[chiffre_aleatoire(voisin.length)];
    
    // ON MODIFIE L'ASPECT GRAPHIQUE ET ON STOCKE LES NOUVEAUX MURS
    switch(case_suivante) 
    {
        case case_dessus:
        // $("#case_" + k).css('borderTop', '3px #0d0a02 solid');
        // $("#case_" + case_suivante).css('borderBottom', '3px #0d0a02 solid');
        Murs[k][0] = 0;
        Murs[case_suivante][2] = 0;
        break;

        case case_droite:
        // $("#case_" + k).css('borderRight', '3px #0d0a02 solid');
        // $("#case_" + case_suivante).css('borderLeft', '3px #0d0a02 solid');
        Murs[k][1] = 0;
        Murs[case_suivante][3] = 0;
        break;

        case case_bas:
        // $("#case_" + k).css('borderBottom', '3px #0d0a02 solid');
        // $("#case_" + case_suivante).css('borderTop', '3px #0d0a02 solid');
        Murs[k][2] = 0;
        Murs[case_suivante][0] = 0;
        break;

        case case_gauche:
        // $("#case_" + k).css('borderLeft', '3px #0d0a02 solid');
        // $("#case_" + case_suivante).css('borderRight', '3px #0d0a02 solid');
        Murs[k][3] = 0;
        Murs[case_suivante][1] = 0;
        break;
    }
    lumiere();

    return case_suivante;
}



/********************************

RENVOIE UN CHIFFRE ENTRE 0 ET C

********************************/

function chiffre_aleatoire(C){
    x = Math.floor(Math.random() * C);
    return x;
}


function affichage(){
    var case_css = $('.case');
    case_css.css('backgroundColor', '#0d0a02');
    case_css.css('borderTopWidth', '3 px').css('borderRightWidth', '3 px').css('borderBottomWidth', '3 px').css('borderLeftWidth', '3 px');
    case_css.css('borderTopStyle', 'solid').css('borderRightStyle', 'solid').css('borderBottomStyle', 'solid').css('borderLeftStyle', 'solid');
    case_css.css('borderTopColor', '#063415').css('borderRightColor', '#063415').css('borderBottomColor', '#063415').css('borderLeftColor', '#063415');
    $('#case_' + sortie).css("background", "#dd00dd");
    
    for (i = 0; i < nombre_case; i++) 
    {
        if (Murs[i][0] == 0)
        {
            $("#case_" + i).css('borderTop', '3px #0d0a02 solid');
        }
        if (Murs[i][1] == 0)
        {
            $("#case_" + i).css('borderRight', '3px #0d0a02 solid');
        }
        if (Murs[i][2] == 0)
        {
            $("#case_" + i).css('borderBottom', '3px #0d0a02 solid');
        }
        if (Murs[i][3] == 0)
        {
            $("#case_" + i).css('borderLeft', '3px #0d0a02 solid');
        }
    }

    lumiere();
}



/*********************************************************************************

FONCTION PERMETTANT D'AFFICHER DES .png PLUTOT QUE DU CSS (CARRE AVEC DES BORDERS)

**********************************************************************************/

function choix_image() {
    for (i = 0; i < nombre_case; i++) 
    {
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




/****************************************************************

FONCTION DE CHOIX DE L'ACTION A EFFECTUER SELON LE BOUTON.
POUR LE MOMENT QUE DEPLACEMENT, ACTION COMBAT/EQUIPEMENT A VENIR

*****************************************************************/

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

    if (positionJoueur == sortie)
    {
        alert("Braaaavo !");
    }
}


/* VARIABLES POUR DEPLACEMENTS */
var dirX = 96;
var positionJoueur = 246;
// var joueur = $('#joueur').position();
// joueur.top = 96 * Math.floor(positionJoueur/nombre_case_ligne) + 9 + "px";
// joueur.left = 96 * (positionJoueur % nombre_case_ligne) + 9 + "px";
//$('#content').css({top:-96 * Math.floor(positionJoueur/nombre_case_ligne) - 9 + "px",left:-96 * (positionJoueur % nombre_case_ligne) - 9 + "px"})
var Moving = false;
var speedJoueur = 150;



/*************************************************************************************

DEPLACEMENTS AVEC ANIMATION JQUERY ET STOCK DE LA NOUVELLE POSITION DU JOUEUR + LUMIERE

**************************************************************************************/

function avancerRight()
{
    var perso = $('#content').position();
    var left = perso.left;
    var top = perso.top;
    console.log(positionJoueur)
    //div.css("backgroundPosition", "-90px 0px");

    if(Murs[positionJoueur][1] == 0 && Moving == false)
    {
        Moving = true; /* PERMET D'EVITER DE REPETER DES ANIMATIONS JQUERY AVANT QUE LA PRECEDANTE SOIT TERMINEE */
        positionJoueur ++;
        $('#content').animate(
        {
            left : left - dirX,
        },
        speedJoueur,
        "linear",
        function(){
            Moving = false;
            lumiere();
        })
    }
}

function avancerLeft()
{
    var perso = $('#content').position();
    var left = perso.left;
    var top = perso.top;
    //div.css("backgroundPosition", "-90px 0px");

    if(Murs[positionJoueur][3] == 0 && Moving == false)
    {
        Moving = true;
        positionJoueur --;
        $('#content').animate(
        {
            left : left + dirX,
        },
        speedJoueur,
        "linear",
        function(){
            Moving = false;
            lumiere();
        })
    }
}

function avancerBottom()
{
    var perso = $('#content').position();
    var left = perso.left;
    var top = perso.top;
    //div.css("backgroundPosition", "-90px 0px");

    if(Murs[positionJoueur][2] == 0 && Moving == false)
    {
        Moving = true;
        positionJoueur = positionJoueur + nombre_case_ligne;
        $('#content').animate(
        {
            top : top - dirX,
        },
        speedJoueur,
        "linear",
        function(){
            Moving = false;
            lumiere();
        })
    }
}

function avancerTop()
{
    var perso = $('#content').position();
    var left = perso.left;
    var top = perso.top;
    //div.css("backgroundPosition", "-90px 0px");

    if(Murs[positionJoueur][0] == 0 && Moving == false)
    {
        Moving = true;
        positionJoueur = positionJoueur - nombre_case_ligne;
        $('#content').animate(
        {
            top : top + dirX,
        },
        speedJoueur,
        "linear",
        function(){
            Moving = false;
            lumiere();
        })
    }
}


/* POUR BAISSER LA LUMIERE DANS TOUT LE LABYRINTHE (Malus? ) */
function lightOff() {
    $('#content').css('opacity', 0.5);
}



/************************

TEST LUMIERE DYNAMIQUE

*************************/

function lumiere() {
    var right = true;
    var left = true;
    var top = true;
    var bottom = true;

    var distance;

    $('td div').css('opacity', 0);  /**** LIGNE A METTRE EN COMMENTAIRE SI ON VEUT QUE LES LUMIERES RESTENT APRES DECOUVERTE ****/

    $('#case_' + positionJoueur).css('opacity', 1);

    // RIGHT 
    distance = -1;
    for (j = positionJoueur + 1 ; j < positionJoueur + distance_vue ; j++)
    {
        distance ++;
        if(nombre_case_ligne == j % nombre_case_ligne)
        {
            break;
        }
        if(j >= nombre_case)
        {
            break;
        }
        if(Murs[j][3] == 1)
        {
            break;
        }
        if(Murs[j][3] == 0 && right == true)
        {
            $('#case_' + j).css('opacity', 1 - (distance * 0.2));
        }
    }


    // LEFT
    distance = -1;
    for (j = positionJoueur - 1 ; j > positionJoueur - distance_vue ; j--)
    {
        distance ++;
        if(j < 0)
        {
            break;
        }
        if(Murs[j][1] == 1)
        {
            break;
        }
        if(Murs[j][1] == 0 && left == true)
        {
            $('#case_' + j).css('opacity', 1 - (distance * 0.2));
        }
        if(j % nombre_case_ligne == 0)
        {
            break;
        }
    }

    // BOTTOM
    distance = -1;
    for (j = positionJoueur + nombre_case_ligne ; j < positionJoueur + (nombre_case_ligne * distance_vue) ; j = j + nombre_case_ligne)
    {
        distance ++;
        if(j >= nombre_case)
        {
            break;
        }
        if(Murs[j][0] == 1)
        {
            break;
        }
        if(Murs[j][0] == 0 && bottom == true)
        {
            $('#case_' + j).css('opacity', 1 - (distance * 0.2));
        }
    }

    // TOP
    distance = -1;
    for (j = positionJoueur - nombre_case_ligne ; j > positionJoueur - (nombre_case_ligne * distance_vue) ; j = j - nombre_case_ligne)
    {
        distance ++;
        if(j < 0)
        {
            break;
        }
        if(Murs[j][2] == 1)
        {
            break;
        }
        if(Murs[j][2] == 0 && top == true)
        {
            $('#case_' + j).css('opacity', 1 - (distance * 0.2));
        }
    }
}

var dixieme = 0;
var seconde = 0;
var minute = 0;

function chrono()
{
    dixieme++;
    if(dixieme > 9)
    {
        dixieme = 0;
        seconde++;
        console.log(seconde);
    }
    if(seconde > 59)
    {
        seconde = 0;
        minute ++;
    }

    compte = setTimeout('chrono()',100);
}

// chrono();

// var pourcent_life = parseInt((100 * parseInt(vie))/20) + '%';
// $('#barre_vie_joueur').css('width', pourcent_life);

var faim = 20

//var always_1 = setInterval(faim(), 20000);

function gestion_faim() {
    console.log("blob");
    faim = faim - 1;
    var pourcent_faim = parseInt((100 * parseInt(faim))/20) + '%'
    $('#barre_vie_joueur').css('width', pourcent_faim);
    if(faim == 0) 
    {
        console.log("fin")
        return;
    }
    var tic_tac = setTimeout("gestion_faim()", 8 00);
}

gestion_faim();