var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFarHarvester = require('role.farHarvester');
var roleAttacker = require('role.attacker');
var roleRemoteHarvester = require('role.remoteHarvester');
var roleHauler = require('role.hauler');
var roleRepair = require('role.repair');
var roleDefender = require('role.defender');
var roleClaimer = require('role.claimer');
var roleAllyDefender= require('role.allyDefender');
var roleNearHarvester = require('role.nearHarvester');

var roomActual = {};
var roomGoal = {};

roomGoal['W57N53'] = {HN:1,H0:2, H1:0, U0:4, U1:0, B0:2, B1:0, FH:1, DR:0, HaulerN:0, HaulerF:1, RW57N54:0, R0W56N53:3,R1W56N53:0,RW58N53:0,CL:0,CT:0,CR:0};
roomGoal['W56N53'] = {HN:0,H0:2, H1:1, U0:2, U1:0, B0:0, B1:1, FH:0, DR:0, HaulerN:0, HaulerF:0, RW57N54:0, R0W56N53:0,R1W56N53:0,RW58N53:0,CL:0,CT:0,CR:0};

module.exports.loop = function () {
//    var p = new RoomPosition(40, 27, 'E53N44').lookFor(LOOK_CREEPS)
//console.log(p.length)
//console.log((new RoomPosition(40, 27, 'E53N44').lookFor(LOOK_CREEPS)).length)



for(var i in Memory.creeps) {
    if(!Game.creeps[i]) {
        delete Memory.creeps[i];
    }
}

var tower = Game.getObjectById('57ad4390b19815e704e9c208');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        else
        {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
       //         filter: (structure) => structure.hits < structure.hitsMax
       
               filter: function(structure) {
                            return (structure.hits < structure.hitsMax && structure.structureType!=STRUCTURE_WALL)|| (structure.hits < 600000 && structure.structureType==STRUCTURE_WALL) ;
                        }
       
            });
            if(closestDamagedStructure && tower.energy > 800) {
                tower.repair(closestDamagedStructure);
            }
        }

    }
    
    var tower = Game.getObjectById('57b4bfb9a68f0bf64ba8bc72');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
   /*     else
        {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
       //         filter: (structure) => structure.hits < structure.hitsMax
       
               filter: function(structure) {
                            return (structure.hits < structure.hitsMax && structure.structureType!=STRUCTURE_WALL)|| (structure.hits < 300000 && structure.structureType==STRUCTURE_WALL) ;
                        }
       
            });
            if(closestDamagedStructure && tower.energy > 800) {
                tower.repair(closestDamagedStructure);
            }
        }
*/
    }

    for(var sID in Game.spawns)
    {
        roomActual[Game.spawns[sID].room.name] = {
            HN: _.filter(Game.creeps, (creep) => creep.memory.role == 'nearHarvester'),
            H0: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.targetIndex==0),
            H1: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.targetIndex==1),
            U0: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.targetIndex==0),
            U1: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.targetIndex==1),
            B0: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.targetIndex==0),
            B1: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.targetIndex==1),
            RW57N54: _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.targetRoom=='W57N54'),
            R0W56N53: _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.targetRoom=='W56N53' && creep.memory.targetIndex==0),
            R1W56N53: _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.targetRoom=='W56N53' && creep.memory.targetIndex==1),
            RW58N52: _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.targetRoom=='W58N52'),
            RW58N53: _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester' && creep.memory.targetRoom=='W58N53'),
            DR: _.filter(Game.creeps, (creep) => creep.memory.role == 'defender' && creep.memory.job=='ranged'),
            FH: _.filter(Game.creeps, (creep) => creep.memory.role == 'farHarvester'),
            HaulerN: _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.targetFlag=='near'),
            HaulerF: _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.memory.targetFlag=='far'),
            CL: _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.targetRoom=='W58N53'),
            CT: _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.targetRoom=='W57N54'),
            CR: _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.targetRoom=='W56N53'),
        }
    //      roomActual[rName] = {H0:4,H1:7}
    }

    for(var sID in Game.spawns)
    {
    //    console.log("r0:" + roomActual[Game.spawns[sID].room.name].RW57N54[0].name)
     /*   console.log(Game.spawns[sID].room.name + ' H0:' + roomActual[Game.spawns[sID].room.name].H0.length + 
     //   ' H1:' + roomActual[Game.spawns[sID].room.name].H1.length +
     //   ' U0:' + roomActual[Game.spawns[sID].room.name].U0.length +
        ' U1:' + roomActual[Game.spawns[sID].room.name].U1.length +
        ' B0:' + roomActual[Game.spawns[sID].room.name].B0.length +
        ' B1:' + roomActual[Game.spawns[sID].room.name].B1.length)
       */ 
 /*                   console.log(Game.spawns[sID].room.name + ' H0:' + roomActual[Game.spawns[sID].room.name].H0.length + 
        ' H1:' + roomActual[Game.spawns[sID].room.name].H1.length +
        ' U0:' + roomActual[Game.spawns[sID].room.name].U0.length +
        ' U1:' + roomActual[Game.spawns[sID].room.name].U1.length +
        ' B0:' + roomActual[Game.spawns[sID].room.name].B0.length +
        ' B1:' + roomActual[Game.spawns[sID].room.name].B1.length +
        ' FH:' + roomActual[Game.spawns[sID].room.name].FH.length +
        ' RT:' + roomActual[Game.spawns[sID].room.name].RW57N54.length +
        ' RR1:' + roomActual[Game.spawns[sID].room.name].R0W56N53.length +
        ' RR2:' + roomActual[Game.spawns[sID].room.name].R1W56N53.length +
        ' DR:' + roomActual[Game.spawns[sID].room.name].DR.length +
        ' H:' + roomActual[Game.spawns[sID].room.name].H.length +
        ' CL:' + roomActual[Game.spawns[sID].room.name].CL.length +
        ' CT:' + roomActual[Game.spawns[sID].room.name].CT.length) 
   */     
        var role='none';
        var targetIndex=0;
        var targetRoom='none';
        var creepPattern = 'none'
        var job
        var state
        var targetFlag
        
    /*    if(roomActual[Game.spawns[sID].room.name].HN.length < roomGoal[Game.spawns[sID].room.name].HN)
        {
            role = 'nearHarvester';
            targetIndex = 0;
        }
        else
        */
        if(roomActual[Game.spawns[sID].room.name].H0.length < roomGoal[Game.spawns[sID].room.name].H0)
        {
            role = 'harvester';
            targetIndex = 0;
        }
        else if(roomActual[Game.spawns[sID].room.name].H1.length < roomGoal[Game.spawns[sID].room.name].H1)
        {
            role = 'harvester';
            targetIndex = 1;
        }
        else if(roomActual[Game.spawns[sID].room.name].FH.length < roomGoal[Game.spawns[sID].room.name].FH || (Memory.farHarvesters[Game.spawns[sID].room.name].life < 150 && roomActual[Game.spawns[sID].room.name].FH.length <2) )
        {
            role = 'farHarvester';
            targetIndex = 1;
        }
        else if(roomActual[Game.spawns[sID].room.name].HaulerF.length < roomGoal[Game.spawns[sID].room.name].HaulerF && roomActual[Game.spawns[sID].room.name].HN.length==0)
        {
            role = 'hauler';
            targetFlag = 'far';
        }
        else if(roomActual[Game.spawns[sID].room.name].U0.length < roomGoal[Game.spawns[sID].room.name].U0)
        {
            role = 'upgrader';
            targetIndex = 0;
        }
        else if(roomActual[Game.spawns[sID].room.name].U1.length < roomGoal[Game.spawns[sID].room.name].U1)
        {
            role = 'upgrader';
            targetIndex = 1;
        }
        else if(roomActual[Game.spawns[sID].room.name].RW58N53.length < roomGoal[Game.spawns[sID].room.name].RW58N53)
        {
            role = 'remoteHarvester'
            targetIndex = 0
            targetRoom='W58N53'
            homeroom='W57N53'
            job='moving'
        }
        else if(roomActual[Game.spawns[sID].room.name].R0W56N53.length < roomGoal[Game.spawns[sID].room.name].R0W56N53)
        {
            role = 'remoteHarvester'
            targetIndex = 0
            targetRoom='W56N53'
            homeroom='W57N53'
            job='moving'
        }
        else if(roomActual[Game.spawns[sID].room.name].B0.length < roomGoal[Game.spawns[sID].room.name].B0)
        {
            role = 'builder';
            targetIndex = 0;
        }
        else if(roomActual[Game.spawns[sID].room.name].B1.length < roomGoal[Game.spawns[sID].room.name].B1)
        {
            role = 'builder';
            targetIndex = 1;
        }
        else if(roomActual[Game.spawns[sID].room.name].RW57N54.length < roomGoal[Game.spawns[sID].room.name].RW57N54)
        {
            role = 'remoteHarvester';
            targetIndex = 0;
            targetRoom='W57N54';
            homeroom='W57N53';
            job='moving'
        }
        else if(roomActual[Game.spawns[sID].room.name].R1W56N53.length < roomGoal[Game.spawns[sID].room.name].R1W56N53)
        {
            role = 'remoteHarvester'
            targetIndex = 1
            targetRoom='W56N53'
            homeroom='W57N53'
            job='moving'
        }
        else if(roomActual[Game.spawns[sID].room.name].RW58N53.length < roomGoal[Game.spawns[sID].room.name].RW58N52)
        {
            role = 'remoteHarvester'
            targetIndex = 0
            targetRoom='W58N52'
            homeroom='W57N53'
            job='moving'
        }
        else if(roomActual[Game.spawns[sID].room.name].CL.length < roomGoal[Game.spawns[sID].room.name].CL)
        {
            role = 'claimer';
            targetIndex = 1;
            targetRoom='W58N53'
        }
        else if(roomActual[Game.spawns[sID].room.name].CL.length < roomGoal[Game.spawns[sID].room.name].CT)
        {
            role = 'claimer';
            targetIndex = 1;
            targetRoom='W57N54'
        }
        else if(roomActual[Game.spawns[sID].room.name].CR.length < roomGoal[Game.spawns[sID].room.name].CR)
        {
            role = 'claimer';
            targetIndex = 1;
            targetRoom='W56N53'
        }
        else if(roomActual[Game.spawns[sID].room.name].DR.length < roomGoal[Game.spawns[sID].room.name].DR)
        {
            role = 'defender';
            targetIndex = 1;
        }
    //    role='none'
        if(role!='none') 
        {

   //         console.log("Room:"+Game.spawns[sID].room.name + " needs to build a "+role + " targetIndex:"+targetIndex)
            
            switch(role)
            {
            case 'nearHarvester':
                    if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE])==0){ //900
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE]
               
                } 
               
                break;
           
            case 'harvester':
            case 'upgrader':
            case 'builder':
            case 'remoteHarvester':
/*             console.log(Game.spawns[sID].room.name + ' H0:' + roomActual[Game.spawns[sID].room.name].H0.length + 
        ' H1:' + roomActual[Game.spawns[sID].room.name].H1.length +
        ' U0:' + roomActual[Game.spawns[sID].room.name].U0.length +
        ' U1:' + roomActual[Game.spawns[sID].room.name].U1.length +
        ' B0:' + roomActual[Game.spawns[sID].room.name].B0.length +
        ' B1:' + roomActual[Game.spawns[sID].room.name].B1.length +
        ' FH:' + roomActual[Game.spawns[sID].room.name].FH.length +
        ' RT:' + roomActual[Game.spawns[sID].room.name].RW57N54.length +
        ' RR1:' + roomActual[Game.spawns[sID].room.name].R0W56N53.length +
        ' RR2:' + roomActual[Game.spawns[sID].room.name].R1W56N53.length +
        ' DR:' + roomActual[Game.spawns[sID].room.name].DR.length +
        ' H:' + roomActual[Game.spawns[sID].room.name].H.length) 
*/
                if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //900
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                    console.log("3")
                } 

                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //900
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                    console.log("3")
                } 

                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //900
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                    console.log("3")
                } 
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //900
                    console.log("2")
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //900
                    console.log("1")
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //900
              console.log("4")
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //900
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
                }  
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //900
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
                }  
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE])==0){ //900
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
                }  
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //850
                console.log("hey")
                    creepPattern=[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
                }  
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //800
                       console.log("he222y")
                    creepPattern=[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
                }  
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE])==0){ //750
                        console.log("hey2213232331")
                    creepPattern=[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
                    console.log("750")
                }  
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE])==0){ //700
                    creepPattern=[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
                    console.log("700")
                }  
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE])==0){ //650
                    creepPattern=[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
                    console.log("650")
                }  
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE])==0 && Object.keys(Game.creeps).length<=0){ //600
                    creepPattern=[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]
                    console.log("600")
                }   
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE])==0 && Object.keys(Game.creeps).length<=0){ //550
                    creepPattern=[WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
                    console.log("550")
                }   
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE])==0 && Object.keys(Game.creeps).length<=3){ //500
                    creepPattern=[WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]
                    console.log("500")
                }            
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE])==0 && Object.keys(Game.creeps).length<=3){ //450
                    creepPattern=[WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]
                    console.log("450")
                }
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE])==0 && Object.keys(Game.creeps).length<=3){ //400
                    creepPattern=[WORK,WORK,CARRY,CARRY,MOVE,MOVE]
                    role ='harvester'
                }
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,CARRY,MOVE,MOVE])==0 && Object.keys(Game.creeps).length<=3){ //350
                    creepPattern=[WORK,WORK,CARRY,MOVE,MOVE]
                    role = 'harvester'
                } else if(Game.spawns[sID].canCreateCreep([WORK,CARRY,CARRY,MOVE,MOVE])==0 && Object.keys(Game.creeps).length<=3){ //300
                    
                    creepPattern=[WORK,WORK,CARRY,MOVE,MOVE]
                    role = 'harvester'
                }
                break;
                
            case 'defender':
                if(Game.spawns[sID].canCreateCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE])==0){ //650
                    creepPattern=[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE] 
                    job='ranged'
                }
                else if(Game.spawns[sID].canCreateCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE])==0){ //550
                    creepPattern=[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE], 
                    job='ranged'
                }
                break;
        
            case 'farHarvester':
                      if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE])==0){ //800
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE]
                }

                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE])==0){ //800
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]
                }

                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE])==0){ //800
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]
                }
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE])==0){ //800
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]
                }
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE])==0){ //800
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]
                }
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE])==0){ //750
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]
                }
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE])==0){ //650
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]
                }
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE])==0 && Object.keys(Game.creeps).length<=3){ //600
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]
                }
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE])==0 && Object.keys(Game.creeps).length<=3){ //550
                    creepPattern=[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE]
                }
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,WORK,CARRY,MOVE])==0 && Object.keys(Game.creeps).length<=3){ //450
                    creepPattern=[WORK,WORK,WORK,WORK,CARRY,MOVE]
                }
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,WORK,CARRY,MOVE])==0 && Object.keys(Game.creeps).length<=3){ //400
                    creepPattern=[WORK,WORK,WORK,CARRY,MOVE]
                }
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,CARRY,MOVE,MOVE])==0 && Object.keys(Game.creeps).length<=3){ //350
                    creepPattern=[WORK,WORK,CARRY,MOVE,MOVE]
                }
                else if(Game.spawns[sID].canCreateCreep([WORK,WORK,CARRY,MOVE])==0 && Object.keys(Game.creeps).length<=3){ //300
                    creepPattern=[WORK,WORK,CARRY,MOVE]
                }
                break;
                
            case 'hauler':
                state='loading'

                if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //400
                    creepPattern=[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //400
                    creepPattern=[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //400
                    creepPattern=[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 

                else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //400
                    creepPattern=[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //400
                    creepPattern=[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //400
                    creepPattern=[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //400
                    creepPattern=[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //400
                    creepPattern=[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //400
                    creepPattern=[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
          /*      else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //400
                    creepPattern=[CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //400
                    creepPattern=[CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //400
                    creepPattern=[CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //400
                    creepPattern=[CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //350
                    creepPattern=[CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
                }                
                else if(Game.spawns[sID].canCreateCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE])==0){ //300
                    creepPattern=[CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
                }                
                */
                break;
            case 'claimer':
                if (Game.spawns[sID].canCreateCreep([CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE])==0){ //700
                    creepPattern=[CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE]
                } 
                break;
            }
           
            
      //      console.log("patten length=" + creepPattern)
            if(creepPattern != 'none')
            {

                result = Game.spawns[sID].createCreep(creepPattern, 
                     {role:role,
                     targetIndex:targetIndex,
                     targetRoom:targetRoom,
                     job:job,
                     state:state,
                     homeRoom:Game.spawns[sID].room.name,
                //        homeRoom:'W56N53',
                     targetFlag:targetFlag
                    });
                   
                console.log('Creating '+role+ ' size:'+creepPattern.length+' :'+creepPattern+ ' :' +result + " :" + Game.rooms[Game.spawns[sID].room.name].energyAvailable);
            
            }
            
            
        }
        
        
        
    //    console.log(roomActual[Game.spawns[sID].room.name].H0.length + " : " + roomGoal[Game.spawns[sID].room.name].H0)
        
      //  var result = Game.spawns[sID].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], {role: 'builder',targetIndex:1});
   //     for(var i in roomGoal[Game.spawns[sID].room.name])
     //   {
    //        console.log(roomGoal[Game.spawns[sID].room.name].H0)
    //    }

        
    }
    
    

 //   if(harvesters.length < 3 && Game.spawns['Spawn1'].canCreateCreep([WORK,CARRY,MOVE])==0) console.log("hry:"+harvesters.length )
//   var numE57S59 = 0;
//    var numE56S58 = 0;
 /*   for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.targetRoom=='E57S59'&&creep.memory.role=='remoteHarvester') numE57S59++;
        if(creep.memory.targetRoom=='E56S58'&&creep.memory.role=='remoteHarvester') numE56S58++;
    }
    if(harvesters.length >= 1)
    {
        if(numE57S59<3){
            result = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], {role: 'remoteHarvester',targetRoom:'E57S59'});
            console.log('Creating remote for: E57S59:'+result);
        }
        if(numE56S58<8){
            result = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], {role: 'remoteHarvester',targetRoom:'E56S58'});
            console.log('Creating remote for: E56S58:'+result);
        }
    }
   */ 
 //   console.log('H:' + harvesters.length + " U:" + upgraders.length + " B:" + builders.length + " F:" + farHarvesters.length + " rDown:" + numE57S59 + " rLeft:"+numE56S58 + " R:"+repairs.length + " h:"+haulers.length + " def:"+defenders.length);

  /*  if(farHarvesters.length == 0)
    { 
        Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE], {role: 'farHarvester'});
        Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,MOVE], {role: 'farHarvester'});
        Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], {role: 'farHarvester'});
        Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], {role: 'farHarvester'});
        Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], {role: 'farHarvester'});
        Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], {role: 'farHarvester'});
  //      Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,MOVE], {role: 'farHarvester'});
 //       Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE], {role: 'farHarvester'});
  //      Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], {role: 'farHarvester'});
    }
    */
    var result;

    var i = 0;
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
    //    creep.memory.role='harvester'

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
                
        if(creep.memory.role == 'farHarvester') {
            roleFarHarvester.run(creep);
     //       console.log("FH:" + Memory.farHarvesters[creep.room.name].life)
        }
        if(creep.memory.role == 'nearHarvester') {
            roleNearHarvester.run(creep);
        }
        
        if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep,'E56S59');
              //roleAttacker.run(creep,'E57S57');
        }
        
                
        if(creep.memory.role == 'defender') {
            roleDefender.run(creep);
          //  creep.say("defend")
        }
        
        if(creep.memory.role == 'remoteHarvester') {
            roleRemoteHarvester.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
        if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'allyDefender') {
            roleAllyDefender.run(creep);
        }
        
    }
  //     console.log('H:' + G_Harvesters + " U:" + G_Upgraders + " B:" + G_Builders);




}
