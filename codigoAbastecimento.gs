//https://www.youtube.com/watch?v=11VTywF6lEE&list=PLY6asSDk-MybPw_ZEtbngi29UJX1HRa9O&index=42



function formsAbastecimento() {
  
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = planilha.getSheetByName("Base de dados");

 //Lista de segmento
  var listMaquinas = guia.getRange(2,5,guia.getRange("E2")
                  .getDataRegion()
                  .getLastRow(),1)
                  .getValues(); 
  
  var formsAbastecimento = HtmlService.createTemplateFromFile("formsAbastecimento");
  formsAbastecimento.listMaquinas = listMaquinas.map(function(r){
    return r[0];
  });
 
  var mostrarForms = formsAbastecimento.evaluate();

  mostrarForms.setTitle("Lançamento de notas fiscais - Abastecimento").setHeight(675).setWidth(850);

  SpreadsheetApp.getUi().showModalDialog(mostrarForms, "Lançamento de notas fiscais - Abastecimento");
}

function salvarNFABASTECIMENTO(DadosNFAbastecimento) {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = planilha.getSheetByName("Planilha Geral");

//Verificação se a NF já foi lançada
 
 var pesquisaLocal = guia.getRange(4,3, guia.getLastRow()).getValues();
  var resultado = pesquisaLocal.Pesquisa(DadosNFAbastecimento.NF);

  if(resultado !=-1) {
    return 'NF já cadastrada!';
  } else {

  guia.getActiveCell();
  //Ativa primeira célula da tabela
  guia.getRange('B4')
      .activate();

  //Ctrl + seta para baixo
  guia.getCurrentCell()
      .getNextDataCell(SpreadsheetApp.Direction.DOWN)
      .activate();

  //Offset de uma linha - próxima linha vazia
  guia.getActiveCell()
      .offset(1,0)
      .activate();

  //Linha vazia para inserção de dados
  var linha = guia.getCurrentCell().getRow();

  guia.getRange(linha, 2).setValue([DadosNFAbastecimento.Data]);
  guia.getRange(linha, 3).setValue([DadosNFAbastecimento.NF]);
  guia.getRange(linha, 4).setValue([DadosNFAbastecimento.Fornecedor]);
  guia.getRange(linha, 5).setValue("Locação");
  guia.getRange(linha, 6).setValue("Combustível");
  
  guia.getRange(linha, 9).setValue([DadosNFAbastecimento.Maquinas1 + ", " + DadosNFAbastecimento.Maquinas2]);
  guia.getRange(linha, 10).setValue([DadosNFAbastecimento.ValorTotal]);
  guia.getRange(linha, 11).setValue([DadosNFAbastecimento.Faturamento]);
  guia.getRange(linha, 17).setValue([DadosNFAbastecimento.Maquinas1 + ": R$" + DadosNFAbastecimento.Valor1 + " | " + DadosNFAbastecimento.Maquinas2 + ": R$" + DadosNFAbastecimento.Valor2]);
  
  organizarData();
  //guia.setActiveSheet(planilha.getSheetByName('Lançamento de despesas'), true);

  return 'Registrado com sucesso';
}
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
}

function organizarData() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = planilha.getSheetByName("Planilha Geral");
  
  //Organiza dados por data
  guia.getFilter().remove();
  var range = guia.getRange(4,2,guia.getLastRow(),18).activate();
  range.createFilter();
  range.getFilter().sort(2, true);

  //Formatação de dados
  guia.getRange(guia.getLastRow()-2,18).copyTo(guia.getRange(guia.getLastRow()-1,18),SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);

  //Add uma linha no final
  guia.appendRow([""]);


}