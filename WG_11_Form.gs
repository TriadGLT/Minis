/**
 * Creates a Google Form that allows respondents to enter their game 
 *
 * @param {Spreadsheet} ss The spreadsheet that contains the conference data.
 * @param {String[][]} values Cell values for the spreadsheet range.
 */
function fcnSetUpForm() {
  
  var ss = SpreadsheetApp.getActive();
  var shtConfig = ss.getSheetByName('Config');
  
  var NbDetachMax = shtConfig.getRange(12, 7).getValue();
  var NbUnitDetach1 = shtConfig.getRange(13, 7).getValue();
  var NbUnitDetach2 = shtConfig.getRange(14, 7).getValue();
  var NbUnitDetach3 = shtConfig.getRange(15, 7).getValue();
  var NbUnitMax;
  var ChUnit;
  var ChDetach;
  var ChEnd;
  var DetachType;
  var UnitPage = new Array(325);
  var Title;
  var Index;
  var UnitRole;
  var TestCol = 1;
  
  // Sets the P

  Logger.clear();
  
  var FormName = "Wargaming League Subscription";
  var form = FormApp.create(FormName).setTitle("Wargaming League Subscription");
  //var form = FormApp.openById("1VF-2McIUPJPk2zqM7ruSRmNsjOmvDnaMbCTJKjVjcVQ");

//  var formItems = form.getItems();
//  //Logger.log(formItems.length)
//  for(var items = 0; items < formItems.length; items++){
//    form.deleteItem(formItems[items]);
//  }
  
  form.setDescription("Please fill up the following to submit your Army List");
  form.setCollectEmail(true);
  // Sets Results Destination - NOT USED
  //form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  
  // Player name
  form.addTextItem()
      .setTitle("Full Name")
      .setRequired(true);

  // Faction Keyword 1
  form.addTextItem()
      .setTitle("Faction Keyword 1")
      .setRequired(true);  

  // Faction Keyword 2
  form.addTextItem()
      .setTitle("Faction Keyword 2")
      .setRequired(true);
  
  // Warlord name
  form.addTextItem()
      .setTitle("Warlord Name")
      .setRequired(true); 

  // Army name
  form.addTextItem()
      .setTitle("Army Name")
      .setRequired(false); 

  Logger.log('Detachment:%s',NbDetachMax)
  Logger.log('Units:%s',NbUnitMax)
  
  // Creates the Detachment 1 Section
  var Detach1 = form.addPageBreakItem().setTitle("Detachment 1");
  // Detachment Name
  form.addTextItem()
      .setTitle("Detachment 1 Name")
      .setRequired(true);
  // Detachment Type
  DetachType = form.addListItem();
  DetachType.setTitle("Detachment 1 Type")
  DetachType.setRequired(true)
  DetachType.setChoices([DetachType.createChoice("Patrol"),
                         DetachType.createChoice("Battalion"),
                         DetachType.createChoice("Brigade"),
                         DetachType.createChoice("Vanguard"),
                         DetachType.createChoice("Spearhead"),
                         DetachType.createChoice("Outrider"),
                         DetachType.createChoice("Supreme Command"),
                         DetachType.createChoice("Super-Heavy"),
                         DetachType.createChoice("Air Wing"),
                         DetachType.createChoice("Super-Heavy Auxiliary"),
                         DetachType.createChoice("Fortification Network"),
                         DetachType.createChoice("Auxiliary Support")]);
  
  // Creates the Detachment 2 Section
  if(NbDetachMax >= 2){
    var Detach2 = form.addPageBreakItem().setTitle("Detachment 2");
    // Detachment Name
    form.addTextItem()
    .setTitle("Detachment 2 Name")
    .setRequired(true);
    // Detachment Type
    DetachType = form.addListItem();
    DetachType.setTitle("Detachment 2 Type")
    DetachType.setRequired(true)
    DetachType.setChoices([DetachType.createChoice("Patrol"),
                           DetachType.createChoice("Battalion"),
                           DetachType.createChoice("Brigade"),
                           DetachType.createChoice("Vanguard"),
                           DetachType.createChoice("Spearhead"),
                           DetachType.createChoice("Outrider"),
                           DetachType.createChoice("Supreme Command"),
                           DetachType.createChoice("Super-Heavy"),
                           DetachType.createChoice("Air Wing"),
                           DetachType.createChoice("Super-Heavy Auxiliary"),
                           DetachType.createChoice("Fortification Network"),
                           DetachType.createChoice("Auxiliary Support")]);  
  }
  
  // Creates the Detachment 3 Section
  if(NbDetachMax >= 3){
    var Detach3 = form.addPageBreakItem().setTitle("Detachment 3");
    // Detachment Name
    form.addTextItem()
    .setTitle("Detachment 3 Name")
    .setRequired(true);
    // Detachment Type
    DetachType = form.addListItem();
    DetachType.setTitle("Detachment 3 Type")
    DetachType.setRequired(true)
    DetachType.setChoices([DetachType.createChoice("Patrol"),
                           DetachType.createChoice("Battalion"),
                           DetachType.createChoice("Brigade"),
                           DetachType.createChoice("Vanguard"),
                           DetachType.createChoice("Spearhead"),
                           DetachType.createChoice("Outrider"),
                           DetachType.createChoice("Supreme Command"),
                           DetachType.createChoice("Super-Heavy"),
                           DetachType.createChoice("Air Wing"),
                           DetachType.createChoice("Super-Heavy Auxiliary"),
                           DetachType.createChoice("Fortification Network"),
                           DetachType.createChoice("Auxiliary Support")]);
  }
  
  // Loop through each potential unit of each detachment
  
  for(var DetachNb = 1; DetachNb <= NbDetachMax; DetachNb++){
    // Selects the number of Units allowed in each Detachment
    if(DetachNb == 1) NbUnitMax = NbUnitDetach1;
    if(DetachNb == 2) NbUnitMax = NbUnitDetach2;
    if(DetachNb == 3) NbUnitMax = NbUnitDetach3;
    
    for(var UnitNb = 1; UnitNb <= NbUnitMax; UnitNb++){
      
      // Creates the Unit Section
      Index = (DetachNb*100) + UnitNb;
      Title = "Detachment " + DetachNb + " - Unit " + UnitNb;
      UnitPage[Index] = form.addPageBreakItem().setTitle(Title);
      Logger.log(Index);
      // Unit Title
      form.addTextItem()
          .setTitle("Detachment " + DetachNb + " - Unit " + UnitNb + " - Unit Title")
          .setRequired(true);
     
      // Unit Role
      UnitRole = form.addListItem();
      UnitRole.setTitle("Detachment " + DetachNb + " - Unit " + UnitNb + " - Unit Role")
      UnitRole.setRequired(true)
      UnitRole.setChoices([UnitRole.createChoice("HQ"),
                           UnitRole.createChoice("Elite"),
                           UnitRole.createChoice("Troops"),
                           UnitRole.createChoice("Fast Attack"),
                           UnitRole.createChoice("Heavy"),
                           UnitRole.createChoice("Transport"),
                           UnitRole.createChoice("Flyer"),
                           UnitRole.createChoice("Lord of War"),
                           UnitRole.createChoice("Fortifications")]);
  
      // Number of Models in Unit
      var ModelValidation = FormApp.createTextValidation()
                                  .setHelpText("Enter a number between 1 and 100.")
                                  .requireNumberBetween(1, 100)
                                  .build();
      form.addTextItem()
          .setTitle("Detachment " + DetachNb + " - Unit " + UnitNb + " - Number of Models in Unit")
          .setRequired(true)
          .setValidation(ModelValidation);

      // Power Level of Unit
      var LevelValidation = FormApp.createTextValidation()
                                   .setHelpText("Enter a number between 1 and 100.")
                                   .requireNumberBetween(1, 100)
                                   .build();
      form.addTextItem()
          .setTitle("Detachment " + DetachNb + " - Unit " + UnitNb + " - Unit Power Level")
          .setRequired(true)
          .setValidation(LevelValidation);
      
      // Add Unit or Detachment 
      var AddUnit = form.addMultipleChoiceItem();
      AddUnit.setTitle("Add Another Unit or Another Detachment");
      AddUnit.setRequired(true);
      
      // Create the different choices
      ChUnit = AddUnit.createChoice("Add Another Unit",FormApp.PageNavigationType.CONTINUE);
      ChEnd = AddUnit.createChoice("My Army List is Complete",FormApp.PageNavigationType.SUBMIT);
      
      // If Unit is First Detachment
      if(DetachNb == 1 && NbDetachMax > 1) ChDetach = AddUnit.createChoice("Add Another Detachment",Detach2);
      
      // If Unit is Second Detachment and there are 3 Detachments
      if(DetachNb == 2 && NbDetachMax > 2) ChDetach = AddUnit.createChoice("Add Another Detachment",Detach3);
      
      // Sets the Choices depending on the Unit and Detachment
      if(DetachNb < NbDetachMax){
        if(UnitNb < NbUnitMax) AddUnit.setChoices([ChUnit, ChDetach, ChEnd]);
        if(UnitNb == NbUnitMax) AddUnit.setChoices([ChDetach, ChEnd]);
      }
      
      if(DetachNb == NbDetachMax){
        if(UnitNb < NbUnitMax) AddUnit.setChoices([ChUnit, ChEnd]);
        if(UnitNb == NbUnitMax) AddUnit.setChoices([ChEnd]);
      }
    
      if (DetachNb == NbDetachMax && UnitNb == NbUnitMax) UnitNb = NbUnitMax + 1; 
    
    }
  }
  // Sets Go To Unit Page
  if(NbDetachMax == 2){
    Detach2.setGoToPage(UnitPage[101]);
    UnitPage[101].setGoToPage(UnitPage[201]);
  }
   
  if(NbDetachMax == 3){
    Detach2.setGoToPage(UnitPage[101]);
    Detach3.setGoToPage(UnitPage[201]);
    UnitPage[101].setGoToPage(UnitPage[301]);
  }
}