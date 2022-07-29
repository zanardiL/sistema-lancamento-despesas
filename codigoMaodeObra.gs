//https://www.youtube.com/watch?v=11VTywF6lEE&list=PLY6asSDk-MybPw_ZEtbngi29UJX1HRa9O&index=42



function formsMaoDeObra() {
  
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  

  var formsMaoDeObra = HtmlService.createTemplateFromFile("formsMaoDeObra");
  var mostrarForms = formsMaoDeObra.evaluate();

  mostrarForms.setTitle("Lançamento de notas fiscais - Mão de obra").setHeight(350).setWidth(650);

  SpreadsheetApp.getUi().showModalDialog(mostrarForms, "Lançamento de notas fiscais - Mão de Obra");
}

function salvarNFMAODEOBRA(DadosNFMaoDeObra) {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = planilha.getSheetByName("Mão de obra");


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

  guia.getRange(linha, 2).setValue([DadosNFMaoDeObra.Data]);
  guia.getRange(linha, 3).setValue([DadosNFMaoDeObra.TipoPagamento]);
  guia.getRange(linha, 4).setValue([DadosNFMaoDeObra.Local]);
  guia.getRange(linha, 5).setValue([DadosNFMaoDeObra.ValorTotal]);
  
  organizarData();
  //planilha.setActiveSheet(planilha.getSheetByName('Lançamento de despesas'), true);

  return 'Registrado com sucesso';
  
}


function organizarData() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = planilha.getSheetByName("Mão de Obra");
  
  //Organiza dados por data
  guia.getFilter().remove();
  var range = guia.getRange(4,2,guia.getLastRow(),5).activate();
  range.createFilter();
  range.getFilter().sort(2, true);

  //Add uma linha no final
  guia.appendRow([""]);
  return 0;
  



}