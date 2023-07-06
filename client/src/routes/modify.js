import fs from "fs"
const listTrue=[
   /* "Cassoneca",
    "Cabiri",
    "Bom Jesus",
    "Caculo Cahango",
    "Catete",
    "Bela vista",
    //
    "Sambizanga",
    "Rangel",
    "Maianga",
    "Ingombota",
    "Samba",
    "Neves Bendinha",
    "Ngola Kiluanje",
    /
    "Muxima",
    "Cabo Ledo",
  
    
    "Funda",
  
    "Kikolo",
    "Cacuaco",
    "Mulenvos Baixos",
    "Sequele",
    
    "Hoji-Ya-Henda",
    "Cazenga",
    "Bairro do 11 de Novembro",
    "Kima Kieza",
    "Tala Hadi",
    "Kalawenda",
  
    
    "Calumbo",
    "Estalagem",
    "Viana",
    "Kikuxi",
    "Zango I",
    "Zango II",
    "Zango III",
    "Zango IV",
    "Zango V",
    "Zango 0",
    "Vila Flor",
    
    "Barra do kwanza",
    "Quenguela",
    "Morro dos Veados",
    "Ramiros",
    "Vila verde I",
    "Vila verde II",
    "Cabolombo",
    "Cidade do Kilamba",
    
    "Golf",
    "Sapu",
    "Palanca",
    "Nova vida",
    */
    "Mussulo",
    "Benfica",
    "Futungo de belas",
    "Lar do Patriota",
    "Talatona",
    "Camama",
    "Cidade Universitária"
    ]
fs.readFile('./LuandaMarkers.geojson', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }
  
    // Converter o conteúdo em um objeto JavaScript
    const geojson = JSON.parse(data);
    console.log(geojson.features.length)
    // Modificar as propriedades desejadas
    
    const newjson=geojson.features.map((feature, index) =>{return {name:feature.properties.name,coordinates:feature.geometry.coordinates}})
    // Converter o objeto JavaScript de volta para uma string .geojson
    const modifiedGeojson = JSON.stringify(newjson, null, 2);
  
    // Gravar a string modificada de volta no arquivo .geojson
    fs.writeFile('./LuandaMarkers.geojson', modifiedGeojson, 'utf8', (err) => {
      if (err) {
        console.error('Erro ao gravar o arquivo:', err);
        return;
      }
  
      console.log('Arquivo .geojson modificado com sucesso!');
    });
  });