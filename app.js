//NOTE an important NOTE
// SECTION global speed of game: done in ms (1000ms = 1 sec)
let gameSettings = {
  clickSpeed: 5000,
  enemyAttack: 5000,
  cheating: false,
  currentBoss: 'basicEnemy',
  currentBossHealth: 0,
  genocide: false,
  savior: false,
  cheated: false
}

//    Design Principle:
//    All objects in an array should have the say properties NEVER different
//SECTION
let player = {
  health: 100,
  autoRevive: 0,
  evasion: 0,
  armor: 1,
  wantedLevel: 0,
  robotWallet: 0,
  heldWeapon: 'fist',
  ownedWeapon: [{weapon: 'fist', dualWield: false},] // This would be a prop field for weapons owned and dual wield status
}

let handWeapons = {
  fist: {
    damage: 5,
    cost: [1000,10000],
    quantity: 0,
    visible: false
  },
  taser: {
    damage: 100,
    cost: [1000,10000],
    quantity: 0,
    visible: false
  },
  whip: {
    damage: 1000,
    cost: [1000,10000],
    quantity: 0,
    visible: false
  },
  wire: {
    damage: 10000,
    cost: [1000,10000],
    quantity: 0,
    visible: false
  },
  handCannon: {
    damage: 10000,
    cost: [1000,10000],
    quantity: 0,
    visible: false
  },
  lightSaber: {
    damage: 10000,
    cost: [1000,10000],
    quantity: 0,
    visible: false
  }
}

let counter = {
  kill: {
    totalKills: 0,
    hightestHeldKills: 0
  },
  bossesSeen: {
    totalBossesSeen: 0,
    bossesKilled: 0
  },
  hitsTaken: {
    totalDmgTaken: 0,
    totalRevives: 0,
    totalHeals: 0
  }
}

//Doesnt really have a purpose
let wantedLevels = [
  {harderEncounter: 0},
  {harderEncounter: 1},
  {harderEncounter: 2},
  {harderEncounter: 3},
  {harderEncounter: 4},
  {harderEncounter: 5}
]


let defencePerks = {
  addHealth: {
    increase: 10,
    cost: [1000, 10000, 100000, 1000000],
    visible: false
  },
  addEvasion: {
    increase: .10,
    cost: [1000, 10000, 100000, 1000000],
    visible: false
  },
  addRevive: {
    increase: 1,
    cost: [100, 1000, 10000, 100000],
    visible: false
  },
  addArmor: {
    increase: 10,
    cost: [1000, 10000, 100000, 1000000],
    visible: false
  },
}

let turrets = {
  machineGun: {
    damage: 5,
    cost: [1000, 10000, 100000, 1000000],
    visible: false
  },
  missile: {
    damage: 100,
    cost: [1000, 10000, 100000, 1000000],
    visible: false
  },
  metallicDismantler: {
    damage: 1000,
    cost: [1000, 10000, 100000, 1000000],
    visible: false
  },
  deathRay: {
    damage: 10000,
    cost: [1000, 10000, 100000, 1000000],
    visible: false
  }
}

let autoHacks = {
  batteryPoweredEmp: {
    damage: 10,
    cost: 10,
    effectChance: 0.2,
    effectDmg: 3,
    descriptor: ''
    ,
    visible: false
  },
  selfDestruct: {
    damage: 10,
    cost: 100,
    effectChance: 0.5,
    effectDmg: 15,
    descriptor: ''
    ,
    visible: false
  },
  robotInsurrection: {
    damage: 1000,
    cost: [1000, 10000, 100000, 1000000],
    effectChance: 0.5,
    effectDmg: 15,
    descriptor: ''
    ,
    visible: false
  },
  globalLogicReprogram: {
    damage: 10000000000000, // This is a win
    cost: [1000000], // cost needs to be a condition
    effectChance: 0,
    effectDmg: 15,
    descriptor: '',
    visible: false
  }
}


//SECTION characters arrays vs :
let bosses = [{
   basicEnemy: {
    health: 1,
    evasion: 0,
    armor: 0,
    damage: 0,
    attackRate: 0,
    weakness: 'none',
    weaknessMod: 0,
    winBonus: 0,
    img: 'assets/img/evil_terminator.png'
  }},
  { mechEnemy: {
    health: 1000,
    evasion: .02,
    armor: .1,
    damage: 3,
    attackRate: 0.5,
    weakness: 'handCannon',
    weaknessMod: 2.8,
    winBonus: 1800,
    img: 'assets/img/mech.png'
    }},
  { squadBasic: {
    health: 4000,
    evasion: .1,
    armor: 0,
    damage: 7,
    attackRate: 0.9,
    weakness: 'taser',
    weaknessMod: 3,
    winBonus: 4500,
    img: 'assets/img/robot_squad.png'
    }},
  {squadMech: {
    health: 15000,
    evasion: .1,
    armor: .3,
    damage: 13,
    attackRate: 1.3,
    weakness: 'wire',
    weaknessMod: 8,
    winBonus: 19000,
    img: 'assets/img/mech_squad.png'
  }},
  { robotArmy: {
    health: 10000000,
    evasion: 0,
    armor: .5,
    damage: 35,
    attackRate: 15,
    weakness: 'lightSaber',
    weaknessMod: 400,
    winBonus: 1000000,
    img: 'assets/img/robot_army.png'
  }},
]


// TODO need a check for if user is activating dual wield
function ourConstantTimer(){
  let interval = setInterval(() => {
    let i = 1;
    if(finishChecker()){
      clearInterval(interval)
    }

    attackAuto()
    updateAllVisibility()
    drawAllStats()
    if(i % 300 == 0){
      bossAttack(gameSettings.currentBoss)
    }
  },
  300)
}

function returnToBasic(){
  if (!(gameSettings.currentBoss > 0 && gameSettings.currentBoss == 'basicEnemy')){
    drawRobot(basicEnemy)
  }
}

//NOTE this is the major all in one function
function attackClick(){
  let currentBoss = bosses.find(element => Object.keys(element)[0] == gameSettings.curr)
  if(isHit(enemy)){
    let damage = totalDam(currentBoss)
    damage = totalDmgTaken(enemy, damage)
    updateBossHealth(damage)
  }
}

function attackAuto(){
  let autoDam = totalBaseAutoDmg()
  let finalDam = totalDmgTaken(gameSettings.currentBoss, autoDam)
  updateBossHealth(finalDam)
}

function totalBaseAutoDmg(){
  totalBaseDamage(autoHacks)
  totalBaseDamage(turrets)
}

//Returns the total base damage for any directory
function totalBaseDamage(dictionary){
  let total = 0
  for (let keys in dictionary){
    let element = dictionary[keys]
    if(dictionary == autoHacks){
      let effectChance = Math.rand();
      while(effectChance <= element.effectChance){
        total += element.effectDmg + element.damage
        effectChance = Math.rand();
      }
      }
    else {
      total += element.damage * quantity
    }
    }
    return total
}


function bossAttack(){
  if(isHit('player')){
    let currentBoss = bosses.find(element => Object.keys(element)[0] == gameSettings.currentBoss)
    let damage = totalDam(currentBoss)
    damage = totalDmgTaken('player', damage)
    updatePlayerHealth(damage)
  }
}

function clearWanted(){
  let cost = Math.max(
    player.wantedLevel * (counter.hightestHeldKills) / 40,
    robotWallet / 6)

  //If you cant afford nothing happens
  if(player.robotWallet >= cost){
    player.robotWallet -= cost;
    player.wantedLevel = 0;
    newBoss(0)
  }
  updateCounter()
}

//Wanted Level has increased odds of increasing if clicking
function wantedLevelChange(fightingMod = 0){
  let change= 0
  odds = Math.random()+fightingMod
  if(odds < .2){
    change = -1;
 if (odds >= .85){
   change = 1;
 }
 if(player.wantedLevel == 4)
  if (odds > .95){
    player.wantedLevel += change
  } else {
    change = 0;
  }
  player.wantedLevelChange +=change;
}
}

//Function list

//Aggregate call to update all values: simple inside other functions
function updateAllStats(){
  wantedLevelChange()
  updateHealth()
}


function updateCounter(){}
// TODO dameg calculator
function totalDmgTaken(enemy = 'player', damage){

}

function updatePlayerHealth(howMuch){
  player.health-=howMuch;
}
function updateBossHealth(howMuch){
  gameSettings.currentBossHealth = Math.max((gameSetting.currentBossHealth - howMuch), 0);
  if(gameSetting.currentBossHealth==0 && gameSettings.currentBoss != 'basicEnemy'){
    counter[kill].bossesKilled += 1;
  } else {
    counter[kill].totalKills += howMuch;

  }
}

//All new items become visible when have attained half the cost
function updateAllVisibility(){
  updateVisible(autoHacks)
  updateVisible(turrets)
  updateVisible(defencePerks)
  updateVisible(handWeapons)
}

//generic updater for visibility on all items
//pass the target dictionary
function updateVisible(dictionary){
  for (let keys in dictionary){
    let aElement = dictionary[keys];
    if(aElement.visible){
      continue;
    }
    aElement.visible = isVisible(aElement.cost[0])
}
}

//Helper for all visible function
function isVisible(cost){
  return (counter[kills].hightestHeldKills > (cost / 2))
}


//determines did the attack work
function isHit(attacked){
  let evasion = 0;
  if(attacked == 'player'){
    evasion = player.evasion

  } else if(attacked = basicEnemy){
    return true;
  }
  else {
    let enemy = bosses.find(element => Object.keys(element)[0] == attacked)
    evasion = enemy[attacked].evasion
  }
  let result = (Math.random() > evasion)
  return result
}

function drawPage(){
  drawAllCounterInfo()
  drawPlayerBuffs()
  drawRobot(gameSettings.currentBoss)
  drawAllWeaponInfo()
}




function drawAllCounterInfo(){
  let template= `<div class="row">`
  template += templateWantedLevel();
  template += templateCounters();
  template += `<div>`

  document.getElementById('all-Counter-info').innerHTML = template;
}

function drawAllWeaponInfo(){}

function drawRobot(key){
  let template = ''
  let object = bosses.find(element => Object.keys(element)[0] == key)
  template += `<h4> Robot Wallet = ${player.robotWallet} </h4>`
  template += `<img src=${object[key].img} alt="Evil Robot" class="circular" onClick('isTooFast()', attack(${key}))>`
  document.getElementById('robot').innerHTML = template;
}

function templateAutoHacker(){

  return template;
}

function templateTurrets(){

  return template;
}

function templateBetterWeapons(){
  return template;
}

function templateWantedLevel(){
  let template = '`<div class="col-md-6" id="wanted-level">`'
  for (let i = 0; i < player.wantedLevel; i++) {
    template +=`<i class="mdi mdi-shield-star"></i>`

  }
  return template += `</div>`;
}

function templatePlayerBuffs(){}
function drawPlayerBuffs(){}

function templateCounters(){
  template = `<div class="col-md-6" id="counters">`
  for (let keys in counter){
    switch(keys){
      case 'kill':
        template += `<h5>Total Kills: ${counter[keys].totalKills}</h5>
        <h5>Max Kills Held: ${counter[keys].hightestHeldKills}</h5><br>`
        break;
      case 'bossesSeen':
        template += `<h5>Bosses Killed: ${counter[keys].bossesKilled}</h5>
        <h5>Bosses Seen: ${counter[keys].totalBossesSeen}</h5><br>`
        break;
      case 'hitsTaken':
        template += `<h5>Damage Received: ${counter[keys].totalDmgTaken}</h5>
        <h5>Revives Used: ${counter[keys].totalRevives}</h5>
        <h5>Heals Used: ${counter[keys].totalHeals}</h5>`
        break;
    }
  }
  return template += `</div>`;
}

function isTooFast(){
  console.log(gameSettings.cheating)
  if(gameSettings.cheating){
    player.health = 0;
    alert(`You have betrayed humanity and become a machine. Failure! (auto-revives dont work on robots)`)
    cheated= true;
  }
  gameSettings.cheating = true;
  setTimeout(() => {
    gameSettings.cheating = false;
  }, gameSettings.clickSpeed)
}

//Checks for end of game using flags
function finishChecker(){
  if(gameSettings.genocide){
    winGeno()
    return true
  }
  if(gameSettings.savior){
    winSaviour()
    return true
  }
  if(gameSettings.cheated){
    loseCheat()
    return true
  }
  return false
}

function isNewBoss(){
  new newBossChance = Math.rand()
  if (gameSettings.currentBossHealth == 0 && gameSettings.currentBoss == 'basicEnemy'){
    if(player.wantedLevel <= 2 && newBossChance > .95){
      newBoss(Math.round(Math.rand() + .5))
    } else if (player.wantedLevel <=4 && newBossChance > .65){
      newBoss(Math.floor(Math.rand() + 2.5))
    } else {
      if(newBossChance > .50) {
        newBoss(4)
      }
    }
  }
}

function newBoss(indexOfBoss){
  let incomingBoss = bosses[indexOfBoss];
  gameSettings.currentBossHealth = incomingBoss.health
  gameSettings.currentBoss = Object.keys(incomingBoss)[0]
  drawRobot(gameSettings.currentBoss)
  counter['bossesSeen'].totalBossesSeen += 1
}

function winGeno(){}

function winSaviour(){}

function loseCheat(){}


//invoke start
drawRobot('basicEnemy')
drawAllCounterInfo()
ourConstantTimer()