// We're going to store the temperature
let temperature = 0;
// We're going to store text about the weather
let weather = "";

let json;

let video;

var nurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=top%20news&sort=newest&api-key=caRb3acLD6Q1qAbV36E6D05F95juekJy';

//button
var button;

//sound
var song;

function preload() {
  // The URL for the JSON data for weather (replace "imperial" with "metric" for celsius)
  let url = "https://api.openweathermap.org/data/2.5/weather?q=Lubbock&units=imperial&APPID=e812164ca05ed9e0344b89ebe273c141";
  json = loadJSON(url);
}

function setup() {
  createCanvas(650, 490);
  song = loadSound('song.mp3', loaded);
  button= createButton("Play");
  button.position(300, 420);
  button.size(50,50,10);
  button.mousePressed(togglePlaying);
  loadJSON(nurl, gotData);
  // Get the temperature
  temperature = json.main.temp;

  // Grab the description, look how we can "chain" calls.
  weather = json.weather[0].description;
  
   // create a video capture (aka webcam input)
  video = createCapture(VIDEO);
  
  // specify the resolution of the webcam input
  // (too high and you may notice performance
  // issues, especially if you're extracting info
  // from it or adding filters)
  video.size(680, 520);

  // in some browsers, you may notice
  // that a second video appears onscreen!
  // that's because p5js actually creates
  // a <video> html element, which then is
  // piped into the canvas – this command
  // ensures we don't see it :)
  video.hide();
}

function draw() {
  background(0);
  fill(0);
  push();
  translate(width,0);
  scale(-1, 1);
  image(video, 5,5); 
  pop();
  
  //display weather
  fill(255);
  rect(5, 5, 205, 60, 10);
  fill(0);
  text("City: Lubbock", 10, 20);
  text("Current temperature: "+temperature+"° F", 10, 40);
  text("Forecast: "+weather, 10, 60);
  
  // Get the current second, minute and hours, day, month, year
  // and assign them to res variables
  var sec = second();
  var min = minute();
  var h = hour();
  var d = day();
  var m = month();
  var y = year();
  // Check for AM or PM based on the
  // hours and store it in a variable
  var mer = h < 12 ? "AM":"PM";
    
  // Format the time so that leading
  // 0's are added when needed
  sec = formatting(sec);
  min = formatting(min);
  h = formatting(h % 12);
    
  // Set the font size 
  textSize(15);
    
  // Set the text alignment in center
  // and display the result
  //textAlign(CENTER, CENTER);
  
  // Display the time
  fill(255);
  rect(555, 5, 90, 45, 10);
  fill(0);
  text(m+"/"+d+"/"+y,560,20);
  text(h + ":" + min + ":" + sec +" " + mer, 560, 40);
  
  //display health
  fill(255);
  rect(5, 420, 110, 65, 10);
  fill(0);
  text("Health",40,435);
  text("Sleep: 8hrs",10,450);
  text("Weight: 140 lbs",10,465);
  text("Steps: 5000",10,480);
  
  //display calander
  fill(255);
  rect(495, 420, 150, 65, 10);
  fill(0);
  text("Today's Schedule",525,435);
  text("0600-0700 Workout",500,450);
  text("1000-1050 Database",500,465);
  text("1200-2200 Work",500, 480)
  
  /*//music button
  if (mouseIsPressed){
    if(mouseX>300 && mouseX<300+rw && mouseY>420 && mouseY<420+rh){
      fill(0);
    }
  }
  else{
    fill(255);
  }
  //button=rect(300, 420, rw, rh, 10);*/
}

function loaded(){
  console.log("loaded");
}

function togglePlaying(){
  if(!song.isPlaying()){
    song.play();
    song.setVolume(0.3);
    button.html('Pause');
  }
  else{
   song.pause();
    button.html('Play');
  }
}

function gotData(data) {
  var articles = data.response.docs;
  for(var i = 0; i < 3; i++){
    createElement('h4', articles[i].headline.main);
    createP(articles[i].snippet);
  }
}
// This function pads the time
// so that 0's are shown 
// eg. 06,08,05 etc.
function formatting(num){
    
  // Convert to int and check 
  // if less than 10
  if(int(num) < 10) {
      
    // Return the padded number
    return "0" + num;
  }
    
  // Return the original number if
  // padding is not required
  return num;
}
/*
{
  "coord":{
    "lon":-74.01,
    "lat":40.71
  },
  "sys":{
    "message":0.2012,
    "country":"US",
    "sunrise":1406540974,
    "sunset":1406592927
  },
  "weather":[
    {
      "id":801,
      "main":"Clouds",
      "description":"few clouds",
      "icon":"02d"
    }
  ],
  "base":"cmc stations",
  "main":{
    "temp":73.45,
    "humidity":83,
    "pressure":999,
    "temp_min":70,
    "temp_max":75.99
  },
  "wind":{
    "speed":4.45,
    "gust":3.6,
    "deg":259
  },
  "rain":{
    "3h":0
  },
  "clouds":{
    "all":24
  },
  "dt":1406559145,
  "id":5128581,
  "name":"New York",
  "cod":200
}
*/