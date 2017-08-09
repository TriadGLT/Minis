// **********************************************
// function fcnRegistration_Master
//
// This function adds the new player to
// the Player's List and calls other functions
// to create its complete profile
//
// **********************************************

function fcnRegistrationWG(ss, shtResponse, RowResponse){

  var shtConfig = ss.getSheetByName('Config');
  var shtPlayers = ss.getSheetByName('Players');
  var ssWeekBstrID = shtConfig.getRange(40, 2).getValue();
  
  var PlayerData = new Array(6);
  PlayerData[0] = 0 ; // Function Status
  PlayerData[1] = ''; // Number of Players
  PlayerData[2] = ''; // New Player Full Name
  PlayerData[3] = ''; // New Player First Name
  PlayerData[4] = ''; // New Player Email
  PlayerData[5] = ''; // New Player Language
  
  
  // Add Player to Player List
//  PlayerData = fcnAddPlayerWG(shtConfig, shtPlayers, shtResponse, RowResponse, PlayerData);
//  var NbPlayers  = PlayerData[1];
//  var PlayerName = PlayerData[2];
  
  // If Player was succesfully added, Generate Card DB, Generate Card Pool, Modify Match Report Form and Add Player to Weekly Booster
  if(PlayerData[0] == 1) {
    fcnGenPlayerArmyDB();
    Logger.log('Army Database Generated'); 
    fcnGenPlayerArmyList();
    Logger.log('Army List Generated');
    fcnModifyReportFormWG(ss, shtConfig, shtPlayers);
    // Send Confirmation to New Player
    fcnSendNewPlayerConf(shtConfig, PlayerData);
    Logger.log('Confirmation Email Sent');
  
    // Send Log for new Registration
    var recipient = Session.getActiveUser().getEmail();
    var subject = 'Form Log Test';
    var body = Logger.getLog();
    MailApp.sendEmail(recipient, subject, body);
  }
}