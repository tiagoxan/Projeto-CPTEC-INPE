function getSevenDaysWeatherForecast() {

    var informedCity = document.getElementById("cidade").value;
    var correctedCity = removeAccent(informedCity);
    var urlLocality = "http://servicos.cptec.inpe.br/XML/listaCidades?city=" + correctedCity;

    if (informedCity === "") {

        document.getElementById("city").innerHTML = "Por favor informe a cidade.";
        return;
    }

    var xmlHttpRequestLocality = new XMLHttpRequest();

    xmlHttpRequestLocality.onreadystatechange = function () {
        if (xmlHttpRequestLocality.readyState == 4 && this.status == 200) {

            var xmlLocality = xmlHttpRequestLocality.responseXML;
            var name = xmlLocality.getElementsByTagName("nome")[0].firstChild.nodeValue;
            var uf = xmlLocality.getElementsByTagName("uf")[0].firstChild.nodeValue;
            var id = xmlLocality.getElementsByTagName("id")[0].firstChild.nodeValue;

            var locality = new Locality(name, uf, id);

            document.getElementById("city").innerHTML = locality.name + " / " + locality.uf;


            var urlWeatherForecast = "http://servicos.cptec.inpe.br/XML/cidade/7dias/" + locality.id + "/previsao.xml";
            var xmlHttpRequestWeatherForecast = new XMLHttpRequest();

            xmlHttpRequestWeatherForecast.onreadystatechange = function () {
                if (xmlHttpRequestWeatherForecast.readyState == 4 && this.status == 200) {

                    var xmlWeatherForecast = xmlHttpRequestWeatherForecast.responseXML;
                    var date = xmlWeatherForecast.getElementsByTagName("dia");                    
                    var maximumTemperature = xmlWeatherForecast.getElementsByTagName("maxima");
                    var minimumTemperature = xmlWeatherForecast.getElementsByTagName("minima");
                    var update = xmlWeatherForecast.getElementsByTagName("atualizacao");
                    var description = xmlWeatherForecast.getElementsByTagName("tempo");
                    
                    var weatherForecast = new WeatherForecast(update, date, maximumTemperature, minimumTemperature,description);

                    var table = document.getElementById("tbl");

                    for (var i = 0; i < weatherForecast.date.length; i++) {

                        var line = table.insertRow(-1);
                        var collumDate = line.insertCell(0);
                        var collumMaximum = line.insertCell(1);
                        var collumMinimum = line.insertCell(2);
                        var collumDescription = line.insertCell(3);
                        var dateFormat = new Date(weatherForecast.date[i].childNodes[0].nodeValue);

                        collumDate.innerHTML = dateFormat.getDate() +1;
                        collumMaximum.innerHTML = weatherForecast.maximumTemperature[i].childNodes[0].nodeValue;
                        collumMinimum.innerHTML = weatherForecast.minimumTemperature[i].childNodes[0].nodeValue;

                        switch(weatherForecast.description[i].childNodes[0].nodeValue){
                            case "ec": collumDescription.innerHTML = "Encoberto com Chuvas Isoladas";
                            break;
                            case "ci": collumDescription.innerHTML = "Chuvas Isoladas";
                            break;
                            case "c": collumDescription.innerHTML = "Chuva";
                            break;
                            case "in": collumDescription.innerHTML = "instável";
                            break;
                            case "pp": collumDescription.innerHTML = "Poss. de Pancadas de Chuva";
                            break;
                            case "cm": collumDescription.innerHTML = "Chuva pela Manhã";
                            break;
                            case "cn": collumDescription.innerHTML = "Chuva a Noite";
                            break;
                            case "pt": collumDescription.innerHTML = "Pancadas de Chuva a Tarde";
                            break;
                            case "pm": collumDescription.innerHTML = "Pancadas de Chuva pela Manhã";
                            break;
                            case "np": collumDescription.innerHTML = "Nublado e Pancadas de Chuva";
                            break;
                            case "pc": collumDescription.innerHTML = "Pancadas de Chuva";
                            break;
                            case "pn": collumDescription.innerHTML = "Parcialmente Nublado";
                            break;
                            case "cv": collumDescription.innerHTML = "Chuvisco";
                            break;
                            case "ch": collumDescription.innerHTML = "Chuvoso";
                            break;
                            case "t": collumDescription.innerHTML = "Tempestade";
                            break;
                            case "ps": collumDescription.innerHTML = "Predomínio de Sol";
                            break;
                            case "e": collumDescription.innerHTML = "Encoberto";
                            break;
                            case "n": collumDescription.innerHTML = "Nublado";
                            break;
                            case "cl": collumDescription.innerHTML = "Céu Claro";
                            break;
                            case "nv": collumDescription.innerHTML = "Nevoeiro";
                            break;
                            case "g": collumDescription.innerHTML = "Geada";
                            break;
                            case "ne": collumDescription.innerHTML = "Neve";
                            break;
                            case "nd": collumDescription.innerHTML = "Não Definido";
                            break;
                            case "pnt": collumDescription.innerHTML = "Pancadas de Chuva a Noite";
                            break;
                            case "psc": collumDescription.innerHTML = "Possibilidade de Chuva";
                            break;
                            case "pcm": collumDescription.innerHTML = "Possibilidade de Chuva pela Manhã";
                            break;
                            case "pct": collumDescription.innerHTML = "Possibilidade de Chuva a Tarde";
                            break;
                            case "pcn": collumDescription.innerHTML = "Possibilidade de Chuva a Noite";
                            break;
                            case "npt": collumDescription.innerHTML = "Nublado com Pancadas a Tarde";
                            break;
                            case "npn": collumDescription.innerHTML = "Nublado com Pancadas a Noite";
                            break;
                            case "ncn": collumDescription.innerHTML = "	Nublado com Poss. de Chuva a Noite";
                            break;
                            case "nct": collumDescription.innerHTML = "Nublado com Poss. de Chuva a Tarde";
                            break;
                            case "ncm": collumDescription.innerHTML = "	Nubl. c/ Poss. de Chuva pela Manhã";
                            break;
                            case "npm": collumDescription.innerHTML = "Nublado com Pancadas pela Manhã";
                            break;
                            case "npp": collumDescription.innerHTML = "Nublado com Possibilidade de Chuva";
                            break;
                            case "vn": collumDescription.innerHTML = "Variação de Nebulosidade";
                            break;
                            case "ct": collumDescription.innerHTML = "Chuva a Tarde";
                            break;
                            case "ppn": collumDescription.innerHTML = "Poss. de Panc. de Chuva a Noite";
                            break;
                            case "ppt": collumDescription.innerHTML = "	Poss. de Panc. de Chuva a Tarde";
                            break;
                            case "ppm": collumDescription.innerHTML = "Poss. de Panc. de Chuva pela Manhã";
                            break;                            
                        }
                    }
                }
            }
            xmlHttpRequestWeatherForecast.open("GET", urlWeatherForecast);
            xmlHttpRequestWeatherForecast.send();

            return false;
        }
    }
    xmlHttpRequestLocality.open("POST", urlLocality);
    xmlHttpRequestLocality.send(null);

    return false;
}

function removeAccent(text) {
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
    return text;
}