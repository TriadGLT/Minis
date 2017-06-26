/**
 * Creates a Google Form that allows respondents to enter their game 
 *
 * @param {Spreadsheet} ss The spreadsheet that contains the conference data.
 * @param {String[][]} values Cell values for the spreadsheet range.
 */
function setUpForm() {
  
  var ss = SpreadsheetApp.getActive();
  var TestSht = ss.getSheetByName("Test");
  
  // FormData Sheet variables
  var FormDataSht = ss.getSheetByName("FormData8");
  var FormDataMaxCol = FormDataSht.getMaxColumns();
  var FormDataRng = FormDataSht.getRange("A1:L1");
  var FormDataCat = FormDataRng.getValues();
  
  // Config Sheet variables
  var ConfigSht = ss.getSheetByName("Config");
  var ConfigTeamRng = ConfigSht.getRange(16, 3, 6, 8);
  var ConfigTeamVal = ConfigTeamRng.getValues();
  var TableName;
  var TeamID;
  var TeamNameA;
  var TeamNameB;
  var TeamNb;
  var ctTeamA = "A";
  var ctTeamB = "B";

  // Loops to get Categories in FormDataCat[0][0-11]
  //  0 = Round
  //  1 = Numéro de Table
  //  2 = Équipe A
  //  3 = Joueur A
  //  4 = Équipe B
  //  5 = Joueur B
  //  6 = Joueur A - Points Détruits
  //  7 = Joueur A - Points Perdus
  //  8 = Joueur B - Points Détruits
  //  9 = Joueur B - Points Perdus
  // 10 = Joueur A - Sportsmanship
  // 11 = Joueur B - Sportsmanship
  
  for (var j = 0; j<= 11; j++) {
    TestSht.getRange(j+1, 1).setValue(FormDataCat[0][j]);
  }
  
  
  // Team Names and Players in ConfigTeamVal[0-5][0-7] [i][j]
  // Team #       = j+1
  // Team # Value = ConfigTeamVal[0][j+1]
  // Team Names   = ConfigTeamVal[1][j+1]
  // Players 1..4 = ConfigTeamVal[2-5][j+1]  
  
  for (var j = 0; j <= 7; j++) {
    for (var i = 0; i <= 5; i++){
      TestSht.getRange(i+2, j+2).setValue(ConfigTeamVal[i][j]);
    }
  }
  
  // All Forms will need Categories 0-9
  // Team A + Cat 11
  // Team B + Cat 10
  
  // Players Names (Cat 3,5) will be populated according to Team # (Cat 2,4)
  
  //  // Create the form according to the Round and Table
 var TestCol = 1;
  
  for(var Round = 1; Round <= 4; Round ++) {
    for (var Table = 1; Table <= 4; Table ++){
      for (var Team = 1; Team<=2; Team ++){
     
        // Team Name Selection for iteration
        if(Team == 1) TeamID = "A";
        if(Team == 2) TeamID = "B";
        
        // Table Number Selection for iteration
        if(Table == 1) TableName = "A";
        if(Table == 2) TableName = "B";
        if(Table == 3) TableName = "C";
        if(Table == 4) TableName = "D";
        
        var FormName = "Résultats Crève Mon Sale X-Wing 2017 - R" + Round + TableName + " - Équipe " + TeamID;
        var form = FormApp.create(FormName).setTitle("Crève Mon Sale X-Wing 2017");
        form.setDescription("Résultats Round " + Round + " - Table " + TableName + " - Équipe " + TeamID)
        // Sets Results Destination - NOT USED
        //form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
        
        // Sets Round Number
        var FormRound = form.addMultipleChoiceItem().setTitle("Round")
        FormRound.setRequired(true);
        FormRound.setChoices([FormRound.createChoice("Round "+Round)])

        
        // Sets Table Number
        var FormTable = form.addMultipleChoiceItem().setTitle("Numéro de Table")
        FormTable.setRequired(true);
        FormTable.setChoices([FormTable.createChoice(TableName+"1"),
                              FormTable.createChoice(TableName+"2"),
                              FormTable.createChoice(TableName+"3"),
                              FormTable.createChoice(TableName+"4")]);
        
        
        // Creates Team A Section
        form.addPageBreakItem().setTitle("Équipes et Joueurs");
        var FormTeamA = form.addMultipleChoiceItem().setTitle("Nom de l'Équipe A");
        FormTeamA.setRequired(true);        
        
        // Gets the Team Number from the FormData8 Spreadsheet
        // Finds Team Number according to Round, Table and Team ID
        var TeamNbA = fcnFindTeamNb(FormDataSht,Round,TableName,ctTeamA);
        TeamNameA = ConfigTeamVal[1][TeamNbA-1];
        FormTeamA.setChoices([FormTeamA.createChoice(TeamNameA)]);
                
        // Creates Players Team A Section
        var FormPlayersA = form.addMultipleChoiceItem().setTitle("Joueurs de l'équipe " + TeamNameA);
        FormPlayersA.setRequired(true);
        FormPlayersA.setHelpText("Sélectionnez le joueur de l'équipe " + TeamNameA);
        // Gets Team A Players Names
        FormPlayersA.setChoices([FormPlayersA.createChoice(ConfigTeamVal[2][TeamNbA-1]),
                                 FormPlayersA.createChoice(ConfigTeamVal[3][TeamNbA-1]),
                                 FormPlayersA.createChoice(ConfigTeamVal[4][TeamNbA-1]),
                                 FormPlayersA.createChoice(ConfigTeamVal[5][TeamNbA-1])]);

        
        //        TestCol ++;
        //        TestSht.getRange(21,TestCol).setValue(Round);
        //        TestSht.getRange(22,TestCol).setValue(TableName);
        //        TestSht.getRange(23,TestCol).setValue(TeamID);
        //        TestSht.getRange(24,TestCol).setValue(TeamNbA);
        //        TestSht.getRange(25,TestCol).setValue(TeamNameA);
                
        
        
        // Creates Team B Section
        //form.addPageBreakItem().setTitle("Équipe B");
        //form.addSectionHeaderItem().setTitle("Équipe B")
        var FormTeamB = form.addMultipleChoiceItem().setTitle("Nom de l'Équipe B");
        FormTeamB.setRequired(true);        
        
        // Gets the Team Number from the FormData8 Spreadsheet
        // Finds Team Number according to Round, Table and Team ID
        var TeamNbB = fcnFindTeamNb(FormDataSht,Round,TableName,ctTeamB);
        TeamNameB = ConfigTeamVal[1][TeamNbB-1];
        FormTeamB.setChoices([FormTeamB.createChoice(TeamNameB)]);

        // Creates Players Team B Section
        var FormPlayersB = form.addMultipleChoiceItem().setTitle("Joueurs de l'équipe " + TeamNameB);
        FormPlayersB.setRequired(true);
        FormPlayersB.setHelpText("Sélectionnez le joueur de l'équipe " + TeamNameB);
        // Gets Team B Players Names
        FormPlayersB.setChoices([FormPlayersB.createChoice(ConfigTeamVal[2][TeamNbB-1]),
                                 FormPlayersB.createChoice(ConfigTeamVal[3][TeamNbB-1]),
                                 FormPlayersB.createChoice(ConfigTeamVal[4][TeamNbB-1]),
                                 FormPlayersB.createChoice(ConfigTeamVal[5][TeamNbB-1])]);

        
        // Creates Player A - Points Détruits / Perdus Section
        form.addPageBreakItem().setTitle("Joueur A - Points Détruits / Perdus");
        //form.addSectionHeaderItem().setTitle("Joueur A - Points Détruits / Perdus")
        var FormPtsDestA = form.addTextItem().setTitle("Joueur A - Points Détruits");
        FormPtsDestA.setRequired(true);
        var FormPtsLostA =form.addTextItem().setTitle("Joueur A - Points Perdus");
        FormPtsLostA.setRequired(true);
        
        // Creates Player B - Points Détruits / Perdus Section
        form.addPageBreakItem().setTitle("Joueur B - Points Détruits / Perdus");
        
        //form.addSectionHeaderItem().setTitle("Joueur B - Points Détruits / Perdus")
        var FormPtsDestB = form.addTextItem().setTitle("Joueur B - Points Détruits");
        FormPtsDestB.setRequired(true);
        var FormPtsLostB =form.addTextItem().setTitle("Joueur B - Points Perdus");
        FormPtsLostB.setRequired(true);

        
        // Creates Player A Sportsmanship Section for Player B
        if(TeamID == "B"){
          form.addPageBreakItem().setTitle("Sportsmanship Joueur A");
          var FormSpshipPlayerA = form.addMultipleChoiceItem().setTitle("Sportsmanship Joueur A"); 
          FormSpshipPlayerA.setHelpText("Donnez l'appréciation du sportsmanship de votre adversaire.");
          FormSpshipPlayerA.setRequired(true);
          FormSpshipPlayerA.setChoices([FormSpshipPlayerA.createChoice("Faible"),
                                        FormSpshipPlayerA.createChoice("Bon"),
                                        FormSpshipPlayerA.createChoice("Très Bon"),
                                        FormSpshipPlayerA.createChoice("Exceptionnel")]);
        }
        
        // Creates Player B Sportsmanship Section for Player A
        if(TeamID == "A"){
          form.addPageBreakItem().setTitle("Sportsmanship Joueur B");
          var FormSpshipPlayerB = form.addMultipleChoiceItem().setTitle("Sportsmanship Joueur B");  
          FormSpshipPlayerB.setHelpText("Donnez l'appréciation du sportsmanship de votre adversaire.");
          FormSpshipPlayerB.setRequired(true);
          FormSpshipPlayerB.setChoices([FormSpshipPlayerB.createChoice("Faible"),
                                        FormSpshipPlayerB.createChoice("Bon"),
                                        FormSpshipPlayerB.createChoice("Très Bon"),
                                        FormSpshipPlayerB.createChoice("Exceptionnel")]);
        }
      }
    }
  }
}