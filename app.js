/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application



function app(people){

  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      displayPerson(searchByName(people));
      break;

    case 'no':
      mainMenu(searchByTrait(people),people);
      break;

    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
        displayPerson(person)
      break;

    case "family":


      displayPeople(displayFamily(person, people),people)


      break;

    case "descendants":
      displayPeople(displayDescendants(person, people),people)

      break;

    case "restart":
      app(people); // restart
      break;

    case "quit":
      return; // stop execution

    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
   var firstName = promptFor("What is the person's first name?", chars);
   var lastName = promptFor("What is the person's last name?", chars);

   let filteredPeople = people.filter(function(el) {if(el.firstName === firstName && el.lastName === lastName) {return el;}});
  return filteredPeople[0];
}

function searchByTrait(people){
  let gender = promptFor("What is the person's gender? \n If not known enter unknown.", chars);
  let dob = promptFor("What is the person's date of birth? \n If not known enter unknown.", chars);
  let height = promptFor("What is the person's height? \n If not known enter unknown.", chars); // + in front of prompt turns result into number
  let weight = promptFor("What is the person's weight? \n If not known enter unknown.", chars);
  let eyeColor = promptFor("What is the person's eye color? \n If not known enter unknown.", chars);

  let filteredPeople = people;
    
  filteredPeople = filteredPeople.filter(function(el) {if(gender == "unknown"){return el} else if (el.gender == gender) {return el;}});
  filteredPeople = filteredPeople.filter(function(el) {if(dob == "unknown"){return el} else if (el.dob == dob) {return el;}});
  filteredPeople = filteredPeople.filter(function(el) {if(height == "unknown"){return el} else if (el.height == height) {return el;}});
  filteredPeople = filteredPeople.filter(function(el) {if(weight == "unknown"){return el} else if (el.weight == weight) {return el;}});
  filteredPeople = filteredPeople.filter(function(el) {if(eyeColor == "unknown"){return el} else if (el.eyeColor == eyeColor) {return el;}});

 return filteredPeople[0];
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){return person.firstName + " " + person.lastName;}).join("\n"));
}

function displayPerson(person){
  personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "D.O.B.: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
}

function displayFamily(person, people){
  
  let familyInfo = people;  

  familyInfo = people.filter(function(el){
    if(el.currentSpouse === person.id){
      return true;}
      else{
        return false;
      }});
      return familyInfo;
  }

function displayDescendants(person, people){

let familyDescendants = [];

  familyDescendants = people.filter(function(el){
  if(el.parents.length === 0){
    return false;}
    else if(el.parents[0] === person.id || el.parents[1] === person.id){
      return true

    }});
    return familyDescendants;
}
      

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}