const prompt = require('prompt-sync')({sigint: true});

//global variables
const hat = '^';
const hole = 'O';
const fieldCharacter = ('░');
const pathCharacter = '*';

//Class to cotain functions to genrate two fields, print them and move pathCharacter
class Field {
  constructor(blankField, hatAndHoles) {
    this._blankField = blankField;
    this._hatAndHoles = hatAndHoles
  }
  //getters for fields
  get blankField() {
    return this._blankField 
  }
  get hatAndHoles() {
    return this._hatAndHoles
  }
  
  //play method to creat loop 
  play() {
    this.print(blankField);
    let y = 0;
    let x = 0;
    while ( hatAndHoles[y][x] === pathCharacter || hatAndHoles[y][x] ===  fieldCharacter) {
      let dir = prompt("Which direction? Choose from u = up, d = down, r = right, l = left \n");
      switch (dir.toLowerCase()) {
        case "u": {
                  if ( y === 0) {
                   console.log("Cant go up. You will go outside of field!!!")
                    } else y -= 1
                  };
                  break;
        case "d": {
                  if ( y === hatAndHoles.length -1) {
                    console.log("Cant go down. You will go outside of field!!!");
                    break;
                  } else y += 1
                  };
                  break;
        case "r": {
                  if ( x === hatAndHoles.length - 1) {
                    console.log("Cant go right. You will go outside of field!!!");
                    break;
                  } else x += 1;
                  };
                  break;
        case "l": {
                  if ( x === 0) {
                    console.log("Cant go left. You will go outside of field!!!")
                  } else x -= 1
                  };
                  break;
        default: console.log("invalid key! Use u, d, r, l.")
      }
      if (hatAndHoles[y][x] === hole) {
        this.print(hatAndHoles);
        return console.log("Its a hole! You loose!!!")
      } 
      else if (hatAndHoles[y][x] === hat) {
        this.print(hatAndHoles);
        return console.log("You found hat! You win!")
      } else {
        blankField[y][x] = pathCharacter;
        hatAndHoles[y][x] = pathCharacter;
      }
      this.print(blankField);
    }
  }
  //print method 
  print(array) {
    for (let arr of array)
    console.log(arr.join(" "))
  }
  
  static genBlankField(size) {
    let newField = [];
    for (let i = 0; i <= size; i++) {
      newField.push([]);
      for ( let j = 0; j <= size ; j++) {
        newField[i].push(fieldCharacter)
      }
    }
    newField[0][0] = pathCharacter;
    return newField
  }

  static genHatAndHoles(size, holes) {
    let newField = [];
    for (let i = 0; i <= size; i++) {
      newField.push([]);
      for ( let j = 0; j <= size ; j++) {
        newField[i].push(fieldCharacter)
      }
    }
    let hatY = Math.floor(Math.random() * size );
    let hatX = Math.floor(Math.random() * size );
    for ( let h = 0 ; h <= holes ; h++) {
      let holeY = hatY;
      let holeX = hatX;
      while (holeY === hatY) {
        holeY = Math.ceil(Math.random() * size );
      }
      while (holeX === hatX) {
        holeX = Math.ceil(Math.random() * size );
      }
      newField[holeY][holeX] = hole;
    }
    newField[hatY][hatX] = hat;
    newField[0][0] = pathCharacter;
    return newField
  }
}

const blankField = Field.genBlankField(7);
const hatAndHoles = Field.genHatAndHoles(7, 7);
const myField = new Field(blankField, hatAndHoles);
myField.play();



