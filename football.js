img = "";
objects=[];
status="";
function preload(){
  img = loadImage('soccer ball.png');
}

function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  objectDetector= ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML="status : Detecting objects";
}

function modelLoaded(){
  console.log("Model Loaded!")
  status= true
  objectDetector.detect(img,gotResult) 

}
function gotResult(error, results){
  if (error) {
    console.log(error)
  } else {
    objects=results
    console.log(objects)
  }
}
function draw() {
  image(img,0,0,640,420);
  if (status !="") {
    fill("#FF0000");
    noFill();
    stroke("#FF0000");
    for (let i = 0; i < objects.length; i++) {
      percent=floor(objects[i].confidence*100)
      text(objects[i].label +" "+percent+"%",objects[i].x,objects[i].y)
      rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      document.getElementById("status").innerHTML="status : Detected objects";

    }
 }
}