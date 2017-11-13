function generateBC(url, separador) 
{
    // Variables:
    const CLASS = "active";     // Constante que almacena el valor de la clase atribuida al contenedor <span> que forma la última miga.
    var urlProcesada = "";      // Contendrá la URL procesada de forma que sólo contenga los elementos que formarán la migas de pan. 
    var componentesUrl = [];    // Array que contendrá los elementos que formarán el contenido de las migas de pan.
    var migas = [];             // Array que contendrá las migas de pan ya formadas.
 
    // 1) Proceso la URL en bruto recibida como parámetro:
    urlProcesada = url.replace(/^(http(s)?:\/\/)?(www\.)?.[^\/]+(\.[a-z0-9]+)*/i, "HOME"). // Reemplazo la primera parte de la URL por "HOME".
                       replace(/(\?.*|#.*)$/, ""). // Elimino parámetros y anclas.
                       replace(/(\.[a-z0-9]+|\/index\.[a-z0-9]+)$/i, ""). // Elimino las extensiones de archivo y los archivos index.
                       replace(/\/$/, ""); /* Elimino las barras que hayan podido quedar al final de la cadena para evitar 
                       que quede un elemento vacío al generar el array de componentes. */
    
    // 2) Genero el array que contendrá los componentes de las migas de pan separando la URL procesada por la barras (/):
    componentesUrl = urlProcesada.split(/\//);
    
    
    /* 3) Creo las migas de pan a partir de los componentes. De la primera a la penúltima miga serán creadas con la función crearEnlace(), 
    mientras que la última miga se creará con la función crearUltimaMiga(): */
    
    // 3.1) Si la URL contenía más un componente, genero todas la migas excepto la última mediante un bucle for:
    if (componentesUrl.length > 1) {
        
        let ruta = "/"; // Almacena la ruta que tendrá el atributo href de cada miga.
        
        // Construyo y añado al array de migas la primera miga, que será HOME con href="/":
        migas.push(crearEnlace(ruta, componentesUrl[0]));
        
        // Añado de la segunda a la penúltima miga (siempre que haya más de dos):
        for (let i = 1; i < componentesUrl.length - 1; i++) {
            
            ruta += componentesUrl[i].concat("/");  // Añado a la ruta el componente con la barra en cada iteración.
            
            // Construyo la miga procesando el componente con la función procesarComponente(componenteUrl). Si el componente tiene más de 30 caracteres, eleboraré un acrónimo con la función acronimo(componenteUrl):
            if (componentesUrl[i].length <= 30) {
                migas.push(crearEnlace(ruta, procesarComponente(componentesUrl[i])));
            } else {
                migas.push(crearEnlace(ruta, procesarComponente(acronimo(componentesUrl[i], "-"))));
            }
        }
    }
    
    /* 3.2) Creo la última miga, o la única miga si la URL sólo contenía un único componente. Del mismo modo, 
    proceso el componenete con la función procesarComponente(componenteUrl), y si el componente tiene más de 30 caracteres, 
    elaboro un acrónimo con la función acronimo(componenteUrl): */
    if (componentesUrl[componentesUrl.length - 1].length <= 30) {
        migas.push(crearUltimaMiga(CLASS, procesarComponente(componentesUrl[componentesUrl.length - 1])));
    } else {
        migas.push(crearUltimaMiga(CLASS, procesarComponente(acronimo(componentesUrl[componentesUrl.length - 1], "-"))));
    }
    
    // 4) Una vez elaboradas todas las migas, las concateno con el separador recibido como parámetro y retorno la cadena resultante:
    return migas.join(separador);
}

    
// Funciones Auxiliares    

// Función que recibe un componente, lo pasa a mayúsculas y sustituye por espacios todos los caracteres que no sean letras ni números:
function procesarComponente(componenteUrl)
{
    return componenteUrl.toUpperCase().replace(/[^A-Z0-9]/g, " ");
}
    
// Función que elabora el acrónimo de un componente:
function acronimo(componenteUrl, separador)
{
    // Variables:
    var palabrasAcronimo = [];  // Array que contendrá las palabras de las cuales se extraerá el acrónimo.
    var letrasAcronimo = [];    // Array que contendrá las letras que formarán el acrónimo.
    var re = new RegExp(separador, "g"); /* Objeto de tipo RegExp que representa la expresión regular que recoge el separador en función del cual se separarán la palabras del componente. */
    
    /* Extraigo las palabras dividiendo el componente por los guiones (-) y filtrando las palabras no permitidas 
    ("the","of","in","from","by","with","and", "or", "for", "to", "at", "a"): */
    palabrasAcronimo = componenteUrl.split(re).filter(palabra => !/^(the|of|in|from|by|with|and|or|for|to|at|a)$/i.test(palabra));
    
    // Extraigo la primera letra de cada palabra y la paso a mayúsculas:
    letrasAcronimo = palabrasAcronimo.map(palabra => palabra.charAt(0));
    
    // Creo el acrónimo uniendo las letras y lo devuelvo:
    return letrasAcronimo.join("");
}
 
// Función que construye y devuelve de la primera a la penúltima miga, recibiendo ruta y contenido y creando el enlace:
function crearEnlace(ruta, contenido)
{
    var miga = '<a href="'.concat(ruta, '">', contenido, '</a>');
    return miga;
}
    
// Función que crea y devuelve la última miga del conjunto, formada por un contenedor span y una clase dada:
function crearUltimaMiga(class_name, contenido)
{
    var ultimaMiga = '<span class="'.concat(class_name, '">', contenido, '</span>');
    return ultimaMiga;
}