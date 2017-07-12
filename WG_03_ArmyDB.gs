// **********************************************
// function fcnUpdateCardDB()
//
// This function updates the Player card database  
// with the list of cards sent in arguments
//
// **********************************************

function fcnUpdateArmyDB(shtConfig, Player, CardList, PackData, shtTest){
  
  // Config Spreadsheet
  var ssArmyDBID = shtConfig.getRange(31,2).getValue();
  
  // Player Card DB Spreadsheet
  var shtArmyDB = SpreadsheetApp.openById(ssArmyDBID).getSheetByName(Player);
  var ArmyDBCurrWeekPwrLvl = shtArmyDB.getRange(5,9);
  var ArmyDBAvailPwrLvl = shtArmyDB.getRange(5,10);
  var ArmyDBCurrWeekPoints = shtArmyDB.getRange(5,11);
  var ArmyDBAvailPoints = shtArmyDB.getRange(5,12);
  
  var cfgRatingMode = shtConfig.getRange(6,7).getValue();
  var cfgCurrWeekValue = shtConfig.getRange(10,7).getValue();

  // Gets
  
  // Gets Cells to Update according to the Army Rating Mode (Power Level or Points)
  if(cfgRatingMode == 'Power Level'){
    ArmyDBCurrWeekPwrLvl = cfgCurrWeekValue;
    //ArmyDBAvailPwrLvl = ;
  }

  if(cfgRatingMode == 'Points'){
    ArmyDBCurrWeekPoints = cfgCurrWeekValue;
    //ArmyDBAvailPoints = ;
  }
  
  
  
  // Call function to generate clean card pool from Player Card DB
  fcnUpdateArmyList(shtConfig, shtArmyDB, Player, shtTest);
  
  // Return Value
  return PackData;
}

