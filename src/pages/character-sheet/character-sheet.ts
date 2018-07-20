import { Component } from '@angular/core';
import {AF} from './../../providers/af';
import {NavController, MenuController, ModalController, NavParams} from 'ionic-angular';
import {EQUIPMENT, InventoryPage, ITEM} from "../inventory/inventory";


@Component({
    selector: 'character-sheet',
    templateUrl: 'character-sheet.html'
})

export class CharacterSheet  {

  constructor( public modalCtrl:ModalController,public afService:AF,public navParams:NavParams,public navCtl:NavController, public menuCtl: MenuController) {


      var character = this.afService.selectedCharacter

      if(character==null){
        this.resetSheet()
        this.result = this.getResult()
      }else{
        this.loadCharacter(character)
        this.result = this.getResult()
      }
    if(this.gameIsLoaded()){
      if(this.INVENTORY.bag==undefined) {
        this.INVENTORY.bag=new Array();
        this.INVENTORY.bag.push({
          type: "Base",
          subType:"Base",
          name: "Starter Equipment",
          skillBonus: 0,
          defenseBonus: 0,
          twoHanded: false,
          description:"Generic equipment of your choosing, no bonus or anything special"
        })
      }
      if(this.INVENTORY.itemSet==undefined){
        this.INVENTORY.itemSet={helmet:0,
          gloves:0,
          pants:0,
          chest:0,
          boots:0,
          main:0,
          secondary:0,
          accessories:0}
      }if(this.INVENTORY.coins==undefined){
        this.INVENTORY.coins={gold:0,
          silver:0,
          bronze:0,
          copper:0}
      }
    }
	}

public INVENTORY:{itemSet:EQUIPMENT,
                  bag:ITEM[],
                  coins:{gold:number;
                    silver:number;
                    bronze:number;
                    copper:number;}
                    };

public CHARACTER_KEY:string ="";

public NAME:string ="";

public owner :string;

public STATS = {INT:0,AGI:0,PRE:0,CON:0,I:0,STR:0};

public PERCEPTION = {PR:0,BPR:0,RPR:0};

public HEALTH = {HP:0,BHP:0,RHP:0};

public MOVEMENT = {NA:0,BNA:0,RNA:0,
				   LE:0,BLE:0,RLE:0,
				   HL:0,BHL:0,RHL:0,
				   CM:0,BCM:0,RCM:0,
				   PL:0,BPL:0,RPL:0};

public WEAPONS = { ED:0,ED2:0,BMED:0,BIED:0,RED:0,
				   BL:0,BL2:0,BMBL:0,BIBL:0,RBL:0,
				   TH:0,TH2:0,BMTH:0,BITH:0,RTH:0,
				   THR:0,THR2:0,BMTHR:0,BITHR:0,RTHR:0,
				   PRO:0,PRO2:0,BMPRO:0,BIPRO:0,RPRO:0,
				   PO:0,PO2:0,BMPO:0,BIPO:0,RPO:0};

public GENERALS = {CL:0,CL2:0,BMCL:0,BICL:0,RCL:0,
				   RD:0,RD2:0,BMRD:0,BIRD:0,RRD:0,
				   SW:0,SW2:0,BMSW:0,BISW:0,RSW:0,
				   TR:0,TR2:0,BMTR:0,BITR:0,RTR:0};

public SUBTREFUGE = {AM:0,AM2:0,BMAM:0,BIAM:0,RAM:0,
				     SH:0,SH2:0,BMSH:0,BISH:0,RSH:0,
					 LP:0,LP2:0,BMLP:0,BILP:0,RLP:0,
					 DT:0,DT2:0,BMDT:0,BIDT:0,RDT:0};

public MAGIC ={RN:0,RN2:0,BMRN:0,BIRN:0,RRN:0,
			   UMO:0,UMO2:0,BMUMO:0,BIUMO:0,RUMO:0,
			   DS:0,DS2:0,BMDS:0,BIDS:0,RDS:0};
public DEFENSE = { DB:0,BDB:0,RDB:0};


public rolls=[{name:'hundred',value:0},
                   {name:'twenty',value:0},
                   {name:'twelve',value:0},
                   {name:'ten',value:0},
                   {name:'eigth',value:0},
                   {name:'four',value:0},
                   {name:'two',value:0}];

public coin = [{state:'-----'},
					{state:'Fail'},
					{state:'Succes'}];

public result ;

public equipedArmour = 'NA';

  gameIsLoaded(){
    let result =  (this.afService.currentGame!=null)&&(this.afService.currentGame!=undefined)
    return result
  }

public openInventory(){
  let modal = this.modalCtrl.create(InventoryPage,{armourType:this.equipedArmour,owner:this.owner});
  modal.onDidDismiss(inventory=>{
    if(null!=inventory){
      this.INVENTORY= inventory;
      console.log(this.INVENTORY)
      this.loadEquipmentBonus(this.getItemsfromSet());
      this.result = this.getResult();
      this.saveCharacter();
    }
  });
  modal.present();

}

  ionViewWillEnter(){
    this.owner=this.navParams.get("owner");
  }

getItemsfromSet(){
  let itemSet= {helmet:this.INVENTORY.bag[this.INVENTORY.itemSet.helmet],
    gloves:this.INVENTORY.bag[this.INVENTORY.itemSet.gloves],
    pants:this.INVENTORY.bag[this.INVENTORY.itemSet.pants],
    chest:this.INVENTORY.bag[this.INVENTORY.itemSet.chest],
    boots:this.INVENTORY.bag[this.INVENTORY.itemSet.boots],
    main:this.INVENTORY.bag[this.INVENTORY.itemSet.main],
    secondary:this.INVENTORY.bag[this.INVENTORY.itemSet.secondary],
    accessories:null};
  return itemSet
}
private loadEquipmentBonus(itemSet){
  let armourBonus=0;
  let bonusDefense =0;
  if(null!=itemSet.helmet&&undefined!=itemSet.helmet){
    armourBonus+= Number(itemSet.helmet.skillBonus);
    bonusDefense+= Number(itemSet.helmet.defenseBonus);
  }
  if(null!=itemSet.chest&&undefined!=itemSet.chest){
    armourBonus+= Number(itemSet.chest.skillBonus);
    bonusDefense+= Number(itemSet.chest.defenseBonus);
  }
  if(null!=itemSet.gloves&&undefined!=itemSet.gloves){
    armourBonus+= Number(itemSet.gloves.skillBonus);
    bonusDefense+= Number(itemSet.gloves.defenseBonus);
  }
  if(null!=itemSet.pants&&undefined!=itemSet.pants){
    armourBonus+= Number(itemSet.pants.skillBonus);
    bonusDefense+= Number(itemSet.pants.defenseBonus);
  }
  if(null!=itemSet.boots&&undefined!=itemSet.boots){
    armourBonus+= Number(itemSet.boots.skillBonus);
    bonusDefense+= Number(itemSet.boots.defenseBonus);
  }
  let secondaryBonus=0;
  if(null!=itemSet.secondary&&undefined!=itemSet.secondary){
    let secondary = itemSet.secondary;
    if(secondary.type=="WEAPON"){
      secondaryBonus= Number(secondary.skillBonus );
      bonusDefense+= Number(secondary.defenseBonus );
    }else{
      bonusDefense+= Number(secondary.defenseBonus );
    }
  }
  if(null!=itemSet.main&&undefined!=itemSet.main) {
    this.addWeaponBonus(itemSet.main, secondaryBonus);
  }
  this.setArmourBonus(armourBonus);
  this.DEFENSE.BDB=bonusDefense;
  // this.sortAccessoriesBonus(itemSet.accessories);
}

private noMovementBonus(){
  this.MOVEMENT.BNA=0;
  this.MOVEMENT.BLE=0;
  this.MOVEMENT.BHL=0;
  this.MOVEMENT.BCM=0;
  this.MOVEMENT.BPL=0;

}

private setArmourBonus(bonus){
    switch (this.equipedArmour){
      case  "NA":
        this.MOVEMENT.BNA = bonus;
        this.MOVEMENT.BLE=0;
        this.MOVEMENT.BHL=0;
        this.MOVEMENT.BCM=0;
        this.MOVEMENT.BPL=0;
        break;
      case  "LE":
        if(this.MOVEMENT.LE!=0){
          this.MOVEMENT.BLE = bonus;
          this.MOVEMENT.BNA=0;
          this.MOVEMENT.BHL=0;
          this.MOVEMENT.BCM=0;
          this.MOVEMENT.BPL=0;
        }else{
          this.noMovementBonus();
        }
        break;
      case  "HL":
        if(this.MOVEMENT.HL!=0) {
          this.MOVEMENT.BHL = bonus;
          this.MOVEMENT.BLE=0;
          this.MOVEMENT.BNA=0;
          this.MOVEMENT.BCM=0;
          this.MOVEMENT.BPL=0;
        }else{
          this.noMovementBonus()
        }
        break;
      case  "CM":
        if(this.MOVEMENT.CM!=0) {
          this.MOVEMENT.BCM = bonus;
          this.MOVEMENT.BLE=0;
          this.MOVEMENT.BHL=0;
          this.MOVEMENT.BNA=0;
          this.MOVEMENT.BPL=0;
        }else{
          this.noMovementBonus()
        }
        break;
      case  "PL":
        if(this.MOVEMENT.PL!=0) {
          this.MOVEMENT.BPL = bonus;
          this.MOVEMENT.BLE=0;
          this.MOVEMENT.BHL=0;
          this.MOVEMENT.BCM=0;
          this.MOVEMENT.BNA=0;
        }else{
          this.noMovementBonus()
        }
        break;
      default: break;
    }
  }

  private noWeaponBonus(){
    this.WEAPONS.BIED = 0;
    this.WEAPONS.BIPO = 0;
    this.WEAPONS.BIPRO = 0;
    this.WEAPONS.BITH = 0;
    this.WEAPONS.BITHR = 0;
    this.WEAPONS.BIBL = 0;

  }
private addWeaponBonus(item:ITEM,secondaryBonus){
  switch (item.subType){
    case "ED":
      if(this.WEAPONS.ED!=0) {
        this.WEAPONS.BIED = (Number(item.skillBonus) + secondaryBonus);
        this.WEAPONS.BIPO = 0;
        this.WEAPONS.BIPRO = 0;
        this.WEAPONS.BITH = 0;
        this.WEAPONS.BITHR = 0;
        this.WEAPONS.BIBL = 0;
      }else {
        this.noWeaponBonus()
      }
      break;
    case "BL":
      if(this.WEAPONS.BL!=0) {
        this.WEAPONS.BIBL = (Number(item.skillBonus) + secondaryBonus);
        this.WEAPONS.BIPO = 0;
        this.WEAPONS.BIPRO = 0;
        this.WEAPONS.BITH = 0;
        this.WEAPONS.BITHR = 0;
        this.WEAPONS.BIED = 0;
      }else {
        this.noWeaponBonus()
      }
      break;
    case "TH":
      if(this.WEAPONS.TH!=0) {
      this.WEAPONS.BITH = (item.skillBonus);
      this.WEAPONS.BIPO=0;
      this.WEAPONS.BIPRO=0;
      this.WEAPONS.BIED=0;
      this.WEAPONS.BITHR=0;
      this.WEAPONS.BIBL=0;
      }else {
        this.noWeaponBonus()
      }
      break;
    case "THR":
      if(this.WEAPONS.THR!=0) {
      this.WEAPONS.BITHR = (item.skillBonus);
      this.WEAPONS.BIPO=0;
      this.WEAPONS.BIPRO=0;
      this.WEAPONS.BITH=0;
      this.WEAPONS.BIED=0;
      this.WEAPONS.BIBL=0;
      }else {
        this.noWeaponBonus()
      }
      break;
    case "PRO":
      if(this.WEAPONS.PRO!=0) {
      this.WEAPONS.BIPRO = (item.skillBonus);
      this.WEAPONS.BIPO=0;
      this.WEAPONS.BIED=0;
      this.WEAPONS.BITH=0;
      this.WEAPONS.BITHR=0;
      this.WEAPONS.BIBL=0;
      }else {
        this.noWeaponBonus()
      }
      break;
    case "PO":
      if(this.WEAPONS.PO!=0) {
      this.WEAPONS.BIPO = (item.skillBonus);
      this.WEAPONS.BIED=0;
      this.WEAPONS.BIPRO=0;
      this.WEAPONS.BITH=0;
      this.WEAPONS.BITHR=0;
      this.WEAPONS.BIBL=0;
      }else {
        this.noWeaponBonus()
      }
      break;
  }

}


public getDiceRoll(dice:number,max:number) {
    this.rolls[dice].value = Math.floor(Math.random() * max)+1 ;
	};

public  armourType(type:string) {
      return (type==this.equipedArmour);
    }

public setEquipedArmour(armour:string){
		if(!this.afService.isGameMaster()){
	  		this.equipedArmour = armour;
		}
    }

public setStats(ability5:number,ability2:number,bonusMix:number,bonusItem:number,reduction:number, response:number){
		if(response==5){
		this.result[response].ability5  = (ability5 >100 ? 100 : (ability5) );
		this.result[response].bonusMix  = (bonusMix >100 ? 100 : (bonusMix) );
		this.result[response].reduction = (reduction>100 ? 100 : (reduction) );

		}else{
		this.result[response].ability5  = (ability5 >100 ? 100 : (ability5  * 5) );
		this.result[response].ability2  = (ability2 >100 ? 100 : (ability2  * 2) );
		this.result[response].bonusMix  = (bonusMix >100 ? 100 : (bonusMix  * 5) );
		this.result[response].bonusItem = (bonusItem>100 ? 100 : (bonusItem * 5) );
		this.result[response].reduction = (reduction>100 ? 100 : (reduction * 5) );
		}
	};

public updateResutls(value:number,stat:string){
		switch (stat) {
			case "INT":
				this.result[16].stat = value;
				this.result[19].stat = value;
				this.result[21].stat = value;
				break;
			case "STR":
				this.result[3].stat = value;
				this.result[4].stat = value;
				this.result[7].stat = value;
				this.result[8].stat = value;
				this.result[9].stat = value;
				this.result[12].stat = value;
				break;
			case "CON":
				this.result[5].stat =value;
				break;
			case "AGI":
				this.result[0].stat = value;
				this.result[1].stat = value;
				this.result[2].stat = value;
				this.result[10].stat = value;
				this.result[11].stat = value;
				this.result[13].stat = value;
				this.result[15].stat = value;
				this.result[23].stat = value;
				this.result[24].stat = value;
				break;
			case "PER":
				this.result[6].stat= value;
				this.result[18].stat= value;
				break;
			case "I":
				this.result[14].stat = value;
				this.result[20].stat = value;
				this.result[22].stat = value;
				break;
			default:
				break;
		}
	};

	saveCharacter(){
		// if(!this.afService.isGameMaster()){

			this.CHARACTER_KEY = this.afService.saveCharacter(this.CHARACTER_KEY,this.STATS,this.PERCEPTION,
			this.HEALTH,this.MOVEMENT,this.WEAPONS,this.GENERALS,
			this.SUBTREFUGE,this.MAGIC,this.DEFENSE,this.NAME,this.equipedArmour, this.INVENTORY)
		// }
	}

	loadCharacter(char){

			console.log(char);
			this.CHARACTER_KEY = char.$key;
			this.STATS =char.stats;
			this.PERCEPTION = char.perception;
			this.HEALTH = char.health;
			this.MOVEMENT = char.movement;
			this.WEAPONS = char.weapons;
			this.GENERALS =char.generals;
			this.SUBTREFUGE =char.subtrefuge;
			this.MAGIC =char.magic;
			this.DEFENSE = char.defense;
			this.NAME = char.name;
			this.equipedArmour = char.armourType;
			this.INVENTORY=char.inventory;

		}

	resetSheet(){
		if(!this.afService.isGameMaster()){
		this.CHARACTER_KEY="";
		this.NAME ="";
		this.STATS = {INT:0,AGI:0,PRE:0,CON:0,I:0,STR:0};
		this.PERCEPTION = {PR:0,BPR:0,RPR:0};
		this.HEALTH = {HP:0,BHP:0,RHP:0};
		this.MOVEMENT = {NA:0,BNA:0,RNA:0,
						LE:0,BLE:0,RLE:0,
						HL:0,BHL:0,RHL:0,
						CM:0,BCM:0,RCM:0,
						PL:0,BPL:0,RPL:0};
		this.WEAPONS = { ED:0,ED2:0,BMED:0,BIED:0,RED:0,
						BL:0,BL2:0,BMBL:0,BIBL:0,RBL:0,
						TH:0,TH2:0,BMTH:0,BITH:0,RTH:0,
						THR:0,THR2:0,BMTHR:0,BITHR:0,RTHR:0,
						PRO:0,PRO2:0,BMPRO:0,BIPRO:0,RPRO:0,
						PO:0,PO2:0,BMPO:0,BIPO:0,RPO:0};
		this.GENERALS = {CL:0,CL2:0,BMCL:0,BICL:0,RCL:0,
						RD:0,RD2:0,BMRD:0,BIRD:0,RRD:0,
						SW:0,SW2:0,BMSW:0,BISW:0,RSW:0,
						TR:0,TR2:0,BMTR:0,BITR:0,RTR:0};
		this.SUBTREFUGE = {AM:0,AM2:0,BMAM:0,BIAM:0,RAM:0,
							SH:0,SH2:0,BMSH:0,BISH:0,RSH:0,
							LP:0,LP2:0,BMLP:0,BILP:0,RLP:0,
							DT:0,DT2:0,BMDT:0,BIDT:0,RDT:0};
		this.MAGIC ={RN:0,RN2:0,BMRN:0,BIRN:0,RRN:0,
					UMO:0,UMO2:0,BMUMO:0,BIUMO:0,RUMO:0,
					DS:0,DS2:0,BMDS:0,BIDS:0,RDS:0};
		this.DEFENSE = { DB:0,BDB:0,RDB:0};

		this.result = this.getResult()
		}
	}


	roundTo5(num:number){

	var resto = (num / 10 )% 0.5, bool = resto >= 0.25;

	return num - resto + (bool ? 0.5 : 0);

	}

	goBack(){
		this.navCtl.pop();
		this.menuCtl.close();
	}

	isRoot(){
		var component = this.navCtl.getType();
		return 	component == 'portal' ;
	}

	getResult(){
			return [{attr:'noArmour',ability5: 5 *this.MOVEMENT.NA,ability2: 2 *0,reduction: 5 *this.MOVEMENT.RNA,bonusItem: 5 *0,bonusMix: 5 *this.MOVEMENT.BNA,stat:this.STATS.AGI},
					{attr:'leather',ability5: 5 *this.MOVEMENT.LE,ability2: 2 *0,reduction: 5 *this.MOVEMENT.RLE,bonusItem: 5 *0,bonusMix: 5 *this.MOVEMENT.BLE,stat:this.STATS.AGI},
					{attr:'hardenLeather',ability5: 5 *this.MOVEMENT.HL,ability2: 2 *0,reduction: 5 *this.MOVEMENT.RHL,bonusItem: 5 *0,bonusMix: 5 *this.MOVEMENT.BHL,stat:this.STATS.AGI},
					{attr:'chainMail',ability5: 5 *this.MOVEMENT.CM,ability2: 2 *0,reduction: 5 *this.MOVEMENT.RCM,bonusItem: 5 *0,bonusMix: 5 *this.MOVEMENT.BCM,stat:this.STATS.STR,},
					{attr:'plate',ability5: 5 *this.MOVEMENT.PL,ability2: 2 *0,reduction: 5 *this.MOVEMENT.RPL,bonusItem: 5 *0,bonusMix: 5 *this.MOVEMENT.BPL,stat:this.STATS.STR},
					{attr:'health',ability5: this.HEALTH.HP ,ability2: 0,reduction: this.HEALTH.RHP,bonusItem: 0,bonusMix: this.HEALTH.BHP,stat:this.STATS.CON},
					{attr:'perception',ability5: 5 *this.PERCEPTION.PR,ability2: 2 *0,reduction: 5 *this.PERCEPTION.RPR,bonusItem: 5 *0,bonusMix: 5 *this.PERCEPTION.BPR,stat:0},
					{attr:'edge',ability5: 5 *this.WEAPONS.ED,ability2: 2 *this.WEAPONS.ED2,reduction: 5 *this.WEAPONS.RED,bonusItem: 5 *this.WEAPONS.BIED,bonusMix: 5 *this.WEAPONS.BMED,stat:this.STATS.STR},
					{attr:'blunt',ability5: 5 *this.WEAPONS.BL,ability2: 2 *this.WEAPONS.BL2,reduction: 5 *this.WEAPONS.RBL,bonusItem: 5 *this.WEAPONS.BIBL,bonusMix: 5 *this.WEAPONS.BMBL,stat:this.STATS.STR},
					{attr:'twoHanded',ability5: 5 *this.WEAPONS.TH,ability2: 2 *this.WEAPONS.TH2,reduction: 5 *this.WEAPONS.RTH,bonusItem: 5 *this.WEAPONS.BITH,bonusMix: 5 *this.WEAPONS.BMTH,stat:this.STATS.STR},
					{attr:'throw',ability5: 5 *this.WEAPONS.THR,ability2: 2 *this.WEAPONS.THR2,reduction: 5 *this.WEAPONS.RTHR,bonusItem: 5 *this.WEAPONS.BITHR,bonusMix: 5 *this.WEAPONS.BMTHR,stat:this.STATS.AGI},
					{attr:'projectile',ability5: 5 *this.WEAPONS.PRO,ability2: 2 *this.WEAPONS.PRO2,reduction: 5 *this.WEAPONS.RPRO,bonusItem: 5 *this.WEAPONS.BIPRO,bonusMix: 5 *this.WEAPONS.BMPRO,stat:this.STATS.AGI},
					{attr:'pole',ability5: 5 *this.WEAPONS.PO,ability2: 2 *this.WEAPONS.PO2,reduction: 5 *this.WEAPONS.RPO,bonusItem: 5 *this.WEAPONS.BIPO,bonusMix: 5 *this.WEAPONS.BMPO,stat:this.STATS.STR},
					{attr:'climbing',ability5: 5 *this.GENERALS.CL,ability2: 2 *this.GENERALS.CL2,reduction: 5 *this.GENERALS.RCL,bonusItem: 5 *this.GENERALS.BICL,bonusMix: 5 *this.GENERALS.BMCL,stat:this.STATS.AGI},
					{attr:'riding',ability5: 5 *this.GENERALS.RD,ability2: 2 *this.GENERALS.RD2,reduction: 5 *this.GENERALS.RRD,bonusItem: 5 *this.GENERALS.BIRD,bonusMix: 5 *this.GENERALS.BMRD,stat:this.STATS.I},
					{attr:'swiming',ability5: 5 *this.GENERALS.SW,ability2: 2 *this.GENERALS.SW2,reduction: 5 *this.GENERALS.RSW,bonusItem: 5 *this.GENERALS.BISW,bonusMix: 5 *this.GENERALS.BMSW,stat:this.STATS.AGI},
					{attr:'tracking',ability5: 5 *this.GENERALS.TR,ability2: 2 *this.GENERALS.TR2,reduction: 5 *this.GENERALS.RTR,bonusItem: 5 *this.GENERALS.BITR,bonusMix: 5 *this.GENERALS.BMTR,stat:this.STATS.INT},
					{attr:'ambush',ability5: 5 *this.SUBTREFUGE.AM,ability2: 2 *this.SUBTREFUGE.AM2,reduction: 5 *this.SUBTREFUGE.RAM,bonusItem: 5 *this.SUBTREFUGE.BIAM,bonusMix: 5 *this.SUBTREFUGE.BMAM,stat:0},
					{attr:'stalk',ability5: 5 *this.SUBTREFUGE.SH,ability2: 2 *this.SUBTREFUGE.SH2,reduction: 5 *this.SUBTREFUGE.RSH,bonusItem: 5 *this.SUBTREFUGE.BISH,bonusMix: 5 *this.SUBTREFUGE.BMSH,stat:this.STATS.PRE},
					{attr:'lockpicking',ability5: 5 *this.SUBTREFUGE.LP,ability2: 2 *this.SUBTREFUGE.LP2,reduction: 5 *this.SUBTREFUGE.RLP,bonusItem: 5 *this.SUBTREFUGE.BILP,bonusMix: 5 *this.SUBTREFUGE.BMLP,stat:this.STATS.INT},
					{attr:'disarmTraps',ability5: 5 *this.SUBTREFUGE.DT,ability2: 2 *this.SUBTREFUGE.DT2,reduction: 5 *this.SUBTREFUGE.RDT,bonusItem: 5 *this.SUBTREFUGE.BIDT,bonusMix: 5 *this.SUBTREFUGE.BMDT,stat:this.STATS.I},
					{attr:'runes',ability5: 5 *this.MAGIC.RN,ability2: 2 *this.MAGIC.RN2,reduction: 5 *this.MAGIC.RRN,bonusItem: 5 *this.MAGIC.BIRN,bonusMix: 5 *this.MAGIC.BMRN,stat:this.STATS.INT},
					{attr:'useObject',ability5: 5 *this.MAGIC.UMO,ability2: 2 *this.MAGIC.UMO2,reduction: 5 *this.MAGIC.RUMO,bonusItem: 5 *this.MAGIC.BIUMO,bonusMix: 5 *this.MAGIC.BMUMO,stat:this.STATS.I},
					{attr:'directedSpell',ability5: 5 *this.MAGIC.DS,ability2: 2 *this.MAGIC.DS2,reduction: 5 *this.MAGIC.RDS,bonusItem: 5 *this.MAGIC.BIDS,bonusMix: 5 *this.MAGIC.BMDS,stat:this.STATS.AGI},
					{attr:'defense',ability5: 5 *this.DEFENSE.DB,ability2: 2 *0,reduction: 5 *this.DEFENSE.RDB,bonusItem: 5 *0,bonusMix: 5 *this.DEFENSE.BDB,stat:this.STATS.AGI}];
	}

}
