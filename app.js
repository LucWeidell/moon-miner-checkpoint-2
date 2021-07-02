//NOTE an important NOTE
//    Design Priniciple:
//    All objects in an array should have the say properties NEVER different
//SECTION
let player = {
  health: 100,
  autoRevive: 0,
  evasion: 0,
  armor: 0,
  wantedLevel: 0,
  heldWeapon: 'NAN',
  ownedWeapon: [{weapon: 'NAN', dualWield: false},] // This would be a prop field for weapons owned and dual wield status
}

let counter = {
  kill: {
    totalkills = 0,
    hightestHeldKills = 0
  },
  bossesSeen: {
    totalBossesSeen = 0,
    bossesKilled = 0
  },
  hitsTaken: {
    totalDmgTaken = 0,
    totalRevives = 0,
    totalHeals = 0
  }
}

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
    cost: [1000, 10000, 100000, 1000000]
  },
  addEvasion: {
    increase: 10,
    cost: [1000, 10000, 100000, 1000000]
  },
  addRevive: {
    increase: 10,
    cost: [100, 1000, 10000, 100000]
  },
  addArmor: {
    increase: 10,
    cost: [1000, 10000, 100000, 1000000]
  },
}

let turrets = {
  machineGun: {
    damage: 5,
    cost: [1000, 10000, 100000, 1000000]
  },
  missile: {
    damage: 100,
    cost: [1000, 10000, 100000, 1000000]
  },
  metallicDismantler: {
    damage: 1000,
    cost: [1000, 10000, 100000, 1000000]
  },
  deathRay: {
    damage: 10000,
    cost: [1000, 10000, 100000, 1000000]
  }
}

let autoHacks = {
  batteryPoweredEmp: {
    damage: 10,
    cost: 10,
    effectChance: 0.2,
    effectDmg: 3,
    descriptor: ''
  },
  selfDestruct: {
    damage: 10,
    cost: 100,
    effectChance: 0.5,
    effectDmg: 15,
    descriptor: ''
  },
  robotInsurrection: {
    damage: 1000,
    cost: [1000, 10000, 100000, 1000000],
    effectChance: 0.5,
    effectDmg: 15,
    descriptor: ''
  },
  globalLogicReprogram: {
    damage: 10000000000000, // This is a win
    cost: [1000000], // cost needs to be a condition
    effectChance: 0,
    effectDmg: 15,
    descriptor: ''
  }
}


//SECTION characters arrays vs :
let bosses = [{
  basicEnemy = {
    health: 1,
    evasion: 0,
    armor: 0,
    damage: 0,
    attackRate: 0,
    weakness: 'none',
    weaknessMod: 0,
    img: 'assets/evil_terminator.png'
  },
  mechEnemy = {
    health: 100,
    evasion: .02,
    armor: .1,
    damage: 3,
    attackRate: 0.5,
    weakness: 'handCannon',
    weaknessMod: 2.8,
    img: 'assets/evil_terminator.png'
    },
  squadBasic = {
    health: 40,
    evasion: .1,
    armor: 0,
    damage: 7,
    attackRate: 0.9,
    weakness: 'taser',
    weaknessMod: 3,
    img: 'assets/evil_terminator.png'
    },
  squadMech = {
    health: 400,
    evasion: .1,
    armor: .3,
    damage: 13,
    attackRate: 1.3,
    weakness: 'wire',
    weaknessMod: 8,
    img: 'assets/evil_terminator.png'
    },
  robotArmy = {
    health: 1000000,
    evasion: 0,
    armor: .5,
    damage: 35,
    attackRate: 15,
    weakness: 'lightSaber',
    weaknessMod: 400,
    img: 'assets/evil_terminator.png'
  },
}]

// TODO need a check for if user is activating dual wield



//Function list

function updateWantedLevel(){}

function updateCounter(){}

function updateHealth(){}

//Mod total for what?
function modTotal(name){}

//determines did the attack work
function isHit(personAttacked){}

function drawAllCounterInfo(){}

function drawAllWeaponInfo(){}

function drawRobot(){
  let template = ''
  for
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
  let template = ''
  for (let i = 0; i < player.wantedLevel; i++) {
    template +=`<i class="mdi mdi-shield-star"></i>`

  }
  return template;
}

function templateCounters(){
  return template;
}
