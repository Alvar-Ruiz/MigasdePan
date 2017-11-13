/*jslint
  devel : true browser: true */
/*global
    chai, describe, it, trim */
var expect = chai.expect;
chai.should();

describe("Testeando la función acronimo(componenteUrl, separador)", function () {
    it("Para la cadena 'tyto-alba' con separador '-' debe retornar 'ta'.", function () {
        acronimo("tyto-alba", "-").should.be.equal("ta");
    });
    it("Para la cadena 'TYTO-ALBA' con separador '-' debe retornar 'TA'.", function () {
        acronimo("TYTO-ALBA", "-").should.be.equal("TA");
    });
    it("Para la cadena 'Agolius funereus' con separador ' ' debe retornar 'Af'.", function () {
        acronimo("Agolius funereus", " ").should.be.equal("Af");
    });
    it("Para la cadena 'Agolius funereus' con separador '-' debe retornar 'A' (no existe el separador '-' en la cadena, por lo que no la divide).", function () {
        acronimo("Agolius funereus", "-").should.be.equal("A");
    });
    it("Para la cadena 'BUBO_BUBO' con separador '_' debe retornar 'BB'.", function () {
        acronimo("BUBO_BUBO", "_").should.be.equal("BB");
    });
    it("Para la cadena 'JavaScript es un lenguaje interpretado.' con separador 'in' debe retornar 'Jt' (separa la cadena en dos mediante la sílaba 'in' de la palabra 'interpretado').", function () {
        acronimo("JavaScript es un lenguaje interpretado.", "in").should.be.equal("Jt");
    });
    it("Para la cadena 'JavaScript es un lenguaje interpretado.' con separador '_' debe retornar 'J'  (no existe el separador '-' en la cadena, por lo que no la divide).", function () {
        acronimo("JavaScript es un lenguaje interpretado.", "_").should.be.equal("J");
    });
    it("Para la cadena 'the owl lives in the forest' con separador ' ' debe retornar 'olf'  (quita las palabras no permitidas 'in' y 'the')", function () {
        acronimo("the owl lives in the forest", " ").should.be.equal("olf");
    });
    it("Para la cadena 'Decidueye is a dual-type Grass/Ghost pokémon.' con separador ' ' debe retornar 'DidGp'  (quita la palabra no permitida 'a').", function () {
        acronimo("Decidueye is a dual-type Grass/Ghost pokémon.", " ").should.be.equal("DidGp");
    });
    it("Para la cadena 'Decidueye is a dual-type Grass/Ghost pokémon.' con separador '/' debe retornar 'DG' (divide la cadena en dos mediante '/').", function () {
        acronimo("Decidueye is a dual-type Grass/Ghost pokémon.", "/").should.be.equal("DG");
    });
    it("Para la cadena 'Decidueye is a dual-type Grass/Ghost pokémon.' con separador '-' debe retornar 'Dt' (divide la caena en dos mediante '-').", function () {
        acronimo("Decidueye is a dual-type Grass/Ghost pokémon.", "-").should.be.equal("Dt");
    });
    it("Para la cadena 'the of in from by with and or for to at a' con separador ' ' debe retornar '' (cadena vacía) = filtra todas las palabras no permitidas.", function () {
        acronimo("the of in from by with and or for to at a", " ").should.be.equal("");
    });
});

describe("Testeando la función generateBC(url, separador)", function () {
    it("Para la URL 'https://github.com/alvar-ruiz/MigasdePan' con separador ' > ' debe retornar '<a href=\"/\">HOME</a> > <a href=\"/alvar-ruiz/\">ALVAR RUIZ</a> > <span class=\"active\">MIGASDEPAN</span>'.", function () {
        generateBC("https://github.com/alvar-ruiz/MigasdePan", " > ").should.be.equal('<a href="/">HOME</a> > <a href="/alvar-ruiz/">ALVAR RUIZ</a> > <span class="active">MIGASDEPAN</span>');
    });
    it("Para la URL 'https://github.com/alvar-ruiz/Escaparate' con separador ' - ' debe retornar '<a href=\"/\">HOME</a> - <a href=\"/alvar-ruiz/\">ALVAR RUIZ</a> - <span class=\"active\">ESCAPARATE</span>'.", function () {
        generateBC("https://github.com/alvar-ruiz/Escaparate", " - ").should.be.equal('<a href="/">HOME</a> - <a href="/alvar-ruiz/">ALVAR RUIZ</a> - <span class="active">ESCAPARATE</span>');
    });
    it("Para la URL 'https://www.linkedin.com/in/alvarruiztavira/detail/skills/' con separador ' >> ' debe retornar '<a href=\"/\">HOME</a> >> <a href=\"/in/\">IN</a> >> <a href=\"/in/alvarruiztavira/\">ALVARRUIZTAVIRA</a> >> <a href=\"/in/alvarruiztavira/detail/\">DETAIL</a> >> <span class=\"active\">SKILLS</span>' (quita la barra '/' final).", function () {
        generateBC("https://www.linkedin.com/in/alvarruiztavira/detail/skills/", " >> ").should.be.equal('<a href="/">HOME</a> >> <a href="/in/">IN</a> >> <a href="/in/alvarruiztavira/">ALVARRUIZTAVIRA</a> >> <a href="/in/alvarruiztavira/detail/">DETAIL</a> >> <span class="active">SKILLS</span>');
    });
    it("Para la URL 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/Arrow_functions' con separador ' >> ' debe retornar '<a href=\"/\">HOME</a> >> <a href=\"/es/\">ES</a> >> <a href=\"/es/docs/\">DOCS</a> >> <a href=\"/es/docs/Web/\">WEB</a> >> <a href=\"/es/docs/Web/JavaScript/\">JAVASCRIPT</a> >> <a href=\"/es/docs/Web/JavaScript/Referencia/\">REFERENCIA</a> >> <a href=\"/es/docs/Web/JavaScript/Referencia/Funciones/\">FUNCIONES</a> >> <span class=\"active\">ARROW FUNCTIONS</span>'.", function () {
        generateBC("https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/Arrow_functions", " >> ").should.be.equal('<a href="/">HOME</a> >> <a href="/es/">ES</a> >> <a href="/es/docs/">DOCS</a> >> <a href="/es/docs/Web/">WEB</a> >> <a href="/es/docs/Web/JavaScript/">JAVASCRIPT</a> >> <a href="/es/docs/Web/JavaScript/Referencia/">REFERENCIA</a> >> <a href="/es/docs/Web/JavaScript/Referencia/Funciones/">FUNCIONES</a> >> <span class="active">ARROW FUNCTIONS</span>');
    });
    it("Para la URL 'https://www.w3schools.com/css/css_rwd_viewport.asp' con separador ' -> ' debe retornar '<a href=\"/\">HOME</a> -> <a href=\"/css/\">CSS</a> -> <span class=\"active\">CSS RWD VIEWPORT</span>' (quita la extensión '.asp').", function () {
        generateBC("https://www.w3schools.com/css/css_rwd_viewport.asp", " -> ").should.be.equal('<a href="/">HOME</a> -> <a href="/css/">CSS</a> -> <span class="active">CSS RWD VIEWPORT</span>');
    });
    it("Para la URL 'https://www.w3schools.com/css/css3_flexbox.asp#justify-content' con separador ' ->> ' debe retornar '<a href=\"/\">HOME</a> ->> <a href=\"/css/\">CSS</a> ->> <span class=\"active\">CSS3 FLEXBOX</span>' (quita el ancla y la extensión '.asp').", function () {
        generateBC("https://www.w3schools.com/css/css3_flexbox.asp#justify-content", " ->> ").should.be.equal('<a href="/">HOME</a> ->> <a href="/css/">CSS</a> ->> <span class="active">CSS3 FLEXBOX</span>');
    });
    it("Para la URL 'https://aulavirtual32.educa.madrid.org/ies.lapaz.alcobendas/course/view.php?id=124&section=3' con separador ' => ' debe retornar '<a href=\"/\">HOME</a> => <a href=\"/ies.lapaz.alcobendas/\">IES LAPAZ ALCOBENDAS</a> => <a href=\"/ies.lapaz.alcobendas/course/\">COURSE</a> => <span class=\"active\">VIEW</span>' (quita el parámetro y la extensión '.php').", function () {
        generateBC("https://aulavirtual32.educa.madrid.org/ies.lapaz.alcobendas/course/view.php?id=124&section=3https://aulavirtual32.educa.madrid.org/ies.lapaz.alcobendas/course/view.php?id=124&section=3", " => ").should.be.equal('<a href="/">HOME</a> => <a href="/ies.lapaz.alcobendas/">IES LAPAZ ALCOBENDAS</a> => <a href="/ies.lapaz.alcobendas/course/">COURSE</a> => <span class="active">VIEW</span>');
    });
    it("Para la URL 'http://brinzal.org/la-liberacion-de-individuos-recuperados/' con separador ' ->> ' debe retornar '<a href=\"/\">HOME</a> ->> <span class=\"active\">LLDIR</span>' (quita la barra '/' final y convierte en acrónimo el elemento de más de 30 caracteres).", function () {
        generateBC("http://brinzal.org/la-liberacion-de-individuos-recuperados/", " ->> ").should.be.equal('<a href="/">HOME</a> ->> <span class="active">LLDIR</span>');
    });
    it("Para la URL 'https://www.altran.com/es/es/case_study/hyperloop-creando-el-tren-del-futuro/' con separador ' >-> ' debe retornar '<a href=\"/\">HOME</a> >-> <a href=\"/es/\">ES</a> >-> <a href=\"/es/es/\">ES</a> >-> <a href=\"/es/es/case_study/\">CASE STUDY</a> >-> <span class=\"active\">HCETDF</span>' (quita la barra '/' final y convierte en acrónimo el elemento de más de 30 caracteres).", function () {
        generateBC("https://www.altran.com/es/es/case_study/hyperloop-creando-el-tren-del-futuro/", " >-> ").should.be.equal('<a href="/">HOME</a> >-> <a href="/es/">ES</a> >-> <a href="/es/es/">ES</a> >-> <a href="/es/es/case_study/">CASE STUDY</a> >-> <span class="active">HCETDF</span>');
    });
    it("Para la URL 'https://www.indracompany.com/es/indra/responsabilidad-social-corporativa' con separador ' - ' debe retornar '<a href=\"/\">HOME</a> - <a href=\"/es/\">ES</a> - <a href=\"/es/indra/\">INDRA</a> - <span class=\"active\">RSC</span>' (convierte en acrónimo el elemento de más de 30 caracteres).", function () {
        generateBC("https://www.indracompany.com/es/indra/responsabilidad-social-corporativa", " - ").should.be.equal('<a href="/">HOME</a> - <a href="/es/">ES</a> - <a href="/es/indra/">INDRA</a> - <span class="active">RSC</span>');
    });
    it("Para la URL 'https://www.worldofcats/most-downloaded/cute-cats-playing-with-boxes?yellowgreen-hat' con separador ' ; ' debe retornar '<a href=\"/\">HOME</a> ; <a href=\"/most-downloaded/\">MOST DOWNLOADED</a> ; <span class=\"active\">CUTE CATS PLAYING WITH BOXES</span>' (quita el ancla y no convierte en acrónimo el elemento 'cute-cats-playing-with-boxes' porque tiene exactamente 30 caracteres.).", function () {
        generateBC("https://www.worldofcats/most-downloaded/cute-cats-playing-with-boxes#top", " ; ").should.be.equal('<a href="/">HOME</a> ; <a href="/most-downloaded/">MOST DOWNLOADED</a> ; <span class="active">CUTE CATS PLAYING WITH BOXES</span>');
    });
    it("Para la URL 'https://www.worldofcats/most-downloaded/two-cats-playing-with-a-balloon?yellowgreen-balloon' con separador ' ; ' debe retornar '<a href=\"/\">HOME</a> ; <a href=\"/most-downloaded/\">MOST DOWNLOADED</a> ; <span class=\"active\">TCPB</span>' (quita el parámetro y convierte en acrónimo el elemento 'two-cats-playing-with-a-balloon' porque tiene exactamente 31 caracteres, quitando las palabras no permitidas 'with' y 'a'.).", function () {
        generateBC("https://www.worldofcats/most-downloaded/two-cats-playing-with-a-balloon?yellowgreen-balloon", " ; ").should.be.equal('<a href="/">HOME</a> ; <a href="/most-downloaded/">MOST DOWNLOADED</a> ; <span class="active">TCPB</span>');
    });
});
