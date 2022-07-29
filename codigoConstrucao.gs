//https://www.youtube.com/watch?v=11VTywF6lEE&list=PLY6asSDk-MybPw_ZEtbngi29UJX1HRa9O&index=42



function formConstrucao() {
  
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = planilha.getSheetByName("Base de dados");

 //Lista de segmento
  var listA = guia.getRange(2,1,guia.getRange("A2")
                  .getDataRegion()
                  .getLastRow(),1)
                  .getValues(); 
  
  var fA = HtmlService.createTemplateFromFile("formsConstrucao");
  fA.listA = listA.map(function(r){
    return r[0];
  });
 
  var mostrarForms = fA.evaluate();

  mostrarForms.setTitle("Lançamento de notas fiscais - Construção").setHeight(715).setWidth(750);

  SpreadsheetApp.getUi().showModalDialog(mostrarForms, "Lançamento de notas fiscais - Construção");
}

function salvarNFCONSTRUCAO(DadosNFConstrucao) {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = planilha.getSheetByName("Planilha Geral");
  var linha = guia.getRange('B4:Q').getLastRow()+1


  guia.getRange(linha, 2).setValue([DadosNFConstrucao.Data]);
  guia.getRange(linha, 3).setValue([DadosNFConstrucao.NF]);
  guia.getRange(linha, 4).setValue([DadosNFConstrucao.Fornecedor]);
  guia.getRange(linha, 5).setValue([DadosNFConstrucao.Segmento]);
  guia.getRange(linha, 6).setValue([DadosNFConstrucao.ClasseCusto]);
  guia.getRange(linha, 7).setValue([DadosNFConstrucao.Origem]);
  guia.getRange(linha, 8).setValue([DadosNFConstrucao.Obra]);
  guia.getRange(linha, 10).setValue([DadosNFConstrucao.Valor]);
  guia.getRange(linha, 11).setValue([DadosNFConstrucao.Faturamento]);
  guia.getRange(linha, 17).setValue([DadosNFConstrucao.Descricao]);
  guia.getRange(linha, 18).setValue([DadosNFConstrucao.Etapa]);

  lancarFaturamento();
  organizarData();


  return 'Registrado com sucesso';
}


Array.prototype.Pesquisa = function(Procura) {
  if(Procura == "") return false;
  
  for(var Linha = 0; Linha<this.length; Linha++)
  if(this[Linha ]== Procura) return Linha;
  return -1;
}

function verificarNF(NF) {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = planilha.getSheetByName("Planilha Geral");

  var pesquisaLocal = guia.getRange(4,3, guia.getLastRow()).getValues();
  var resultado = pesquisaLocal.Pesquisa(NF);
  if(resultado !=-1) {
    return ''
  }
}

function organizarData() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = planilha.getSheetByName("Planilha Geral");
  
  //Organiza dados por data
  guia.getFilter().remove();
  var range = guia.getRange(4,2,guia.getLastRow(),18).activate();
  range.createFilter();
  range.getFilter().sort(2, true);


  //Add uma linha no final
  guia.appendRow([""]);
  return 0;

}

function lancarFaturamento() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = planilha.getSheetByName("Planilha Geral");
  var linha = guia.getLastRow();

  //Dados inputados no forms
  var dadosLancados = [];
  
  dadosLancados = guia.getRange(linha, 3, guia.getLastRow(), 11).getValues().flat().filter(r=>r!="");
 
  console.log(dadosLancados);
  //Dados do faturamento
  var faturamento = guia.getRange(linha, 11).getValues().flat().filter(r=>r!="");
  
  guia.getRange(linha,19).setValue(faturamento).splitTextToColumns(SpreadsheetApp.TextToColumnsDelimiter.COMMA);

  var datasFaturamento = guia.getRange(linha, 19, linha, 30).getValues().flat().filter(r=>r!="");
  console.log(dadosLancados.length);
  let mes;
  let guiaMes; 
  let rangeInput;
  let dataInput;
  let proxlinha;
  var numParcelas = faturamento.length();

  let valorParcelas;
 
 //MÊS DE AGOSTO
  for(i = 0; i<datasFaturamento.length; i++) {
      mes = new Date('2022, 8, 1');
      guiaMes = planilha.getSheetByName("Agosto 2022");
      proxlinha = guiaMes.getRange('B4:Q').getLastRow()+1;

    for(j = 0; j<dadosLancados.length; j++) {
      if(new Date(datasFaturamento[i]).getMonth() == mes.getMonth()) {
         guiaMes.getRange(proxlinha, 2).setValue(datasFaturamento[i]);
        
        if(j == 5){
          guiaMes.getRange(proxlinha, j+3).setValue("");

          guiaMes.getRange(proxlinha, j+4).setValue("");

          guiaMes.getRange(proxlinha, j+5).setValue(dadosLancados[j]);

        } if(j == 6)
          guiaMes.getRange(proxlinha, j+5).setValue(dadosLancados[j]);

        else
        guiaMes.getRange(proxlinha,j+3).setValue(dadosLancados[j]);
      }
     }

          
    //MÊS DE SETEMBRO
    for(i = 0; i<datasFaturamento.length; i++) {
      mes = new Date('2022, 9, 1');
      guiaMes = planilha.getSheetByName("Setembro 2022");
      proxlinha = guiaMes.getRange('B4:Q').getLastRow()+1;

    for(j = 0; j<dadosLancados.length; j++) {
      if(new Date(datasFaturamento[i]).getMonth() == mes.getMonth()) {
           guiaMes.getRange(proxlinha, 2).setValue(datasFaturamento[i]);

        if(j === 5){
          guiaMes.getRange(proxlinha, j+3).setValue("");

          guiaMes.getRange(proxlinha, j+4).setValue("");

          guiaMes.getRange(proxlinha, j+5).setValue(dadosLancados[j]);

        } if(j === 6)
          guiaMes.getRange(proxlinha, j+5).setValue(dadosLancados[j]);

        else
        guiaMes.getRange(proxlinha,j+3).setValue(dadosLancados[j]);
      }
    }
 
  }
  //MÊS DE OUTUBRO
    for(i = 0; i<datasFaturamento.length; i++) {
      mes = new Date('2022, 10, 1');
      guiaMes = planilha.getSheetByName("Outubro 2022");
      proxlinha = guiaMes.getRange('B4:Q').getLastRow()+1;

    for(j = 0; j<dadosLancados.length; j++) {
      if(new Date(datasFaturamento[i]).getMonth() == mes.getMonth()) {
            guiaMes.getRange(proxlinha, 2).setValue(datasFaturamento[i]);
        if(j === 5){
          guiaMes.getRange(proxlinha, j+3).setValue("");

          guiaMes.getRange(proxlinha, j+4).setValue("");

          guiaMes.getRange(proxlinha, j+5).setValue(dadosLancados[j]);

        } if(j === 6)
          guiaMes.getRange(proxlinha, j+5).setValue(dadosLancados[j]);

        else
        guiaMes.getRange(proxlinha,j+3).setValue(dadosLancados[j]);
      }
    }


  }
  //MÊS DE NOVEMBRO
    for(i = 0; i<datasFaturamento.length; i++) {
      mes = new Date('2022, 11, 1');
      guiaMes = planilha.getSheetByName("Novembro 2022");
      proxlinha = guiaMes.getRange('B4:Q').getLastRow()+1;

    for(j = 0; j<dadosLancados.length; j++) {
      if(new Date(datasFaturamento[i]).getMonth() == mes.getMonth()) {
            guiaMes.getRange(proxlinha, 2).setValue(datasFaturamento[i]);
        if(j === 5){
          guiaMes.getRange(proxlinha, j+3).setValue("");

          guiaMes.getRange(proxlinha, j+4).setValue("");

          guiaMes.getRange(proxlinha, j+5).setValue(dadosLancados[j]);

        } if(j === 6)
          guiaMes.getRange(proxlinha, j+5).setValue(dadosLancados[j]);

        else
        guiaMes.getRange(proxlinha,j+3).setValue(dadosLancados[j]);
      }
    }


  }
  //MÊS DE DEZEMBRO
    for(i = 0; i<datasFaturamento.length; i++) {
      mes = new Date('2022, 12, 1');
      guiaMes = planilha.getSheetByName("Dezembro 2022");
      proxlinha = guiaMes.getRange('B4:Q').getLastRow()+1;

    for(j = 0; j<dadosLancados.length; j++) {
      if(new Date(datasFaturamento[i]).getMonth() == mes.getMonth()) {
            guiaMes.getRange(proxlinha, 2).setValue(datasFaturamento[i]);
        if(j === 5){
          guiaMes.getRange(proxlinha, j+3).setValue("");

          guiaMes.getRange(proxlinha, j+4).setValue("");

          guiaMes.getRange(proxlinha, j+5).setValue(dadosLancados[j]);

        } if(j === 6)
          guiaMes.getRange(proxlinha, j+5).setValue(dadosLancados[j]);

        else
        guiaMes.getRange(proxlinha,j+3).setValue(dadosLancados[j]);
      }
    }


    }
  }
}