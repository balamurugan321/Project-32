const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var hour;

var bg = "sunrise.png";

function preload() {
    getBackgroundImg();
    
}

function setup(){
    var canvas = createCanvas(1200,620);
    engine = Engine.create();
    world = engine.world;

}

function draw(){
    if(backgroundImg)
        background(backgroundImg);

    Engine.update(engine);

    fill("black");
    textSize(30);
    //console.log(hour)
    if(hour>=12){
        text("Time : "+ hour%12 + " PM", 30,50);
    }else if(hour==0){
        text("Time : 12 AM",30,50);
    }else{
        text("Time : "+ hour + " AM", 30,50);
    }

}

async function getBackgroundImg(){

    // write code to fetch time from API
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
 
    //change the data in JSON format and store it in variable responseJSON
    var responseJSON = await response.json();

    //fetch datetime from responseJSON
    var datetime = responseJSON.datetime;
    
    // slice the datetime to extract hour
    hour = datetime.slice(11,13);

    if(hour>=5 && hour<18 ){
        bg = "sunrise.png";
    }
    else{
        bg="sunset.png"
    }
    backgroundImg = loadImage(bg);
}
