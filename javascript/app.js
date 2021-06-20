'use strict';

let imageContenar = document.getElementById('imageContenar');
let firstImg = document.getElementById('firstImg');
let secondImg = document.getElementById('secondImg');
let thirdImg = document.getElementById('thirdImg');

let imgArray = [
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'
  ];
  let counter = 0;

function ShowImage(name, src ){
    this.name = name;
    this.time =1;
    this.view =0;
    this.src = `./image/${src}`;
    ShowImage.all.push(this);
    
}
ShowImage.all=[];

for( let i = 0; i < imgArray.length; i++ ){
    new ShowImage( imgArray[i].split( '.' )[0], imgArray[i] );
  }
  
function render(){
   let firstIndex = randomNumber(0,imgArray.length-1)
   let secondIndex;
   let thirdIndex;
   do{
        secondIndex = randomNumber(0, imgArray.length-1);
        thirdIndex = randomNumber(0,imgArray.length-1);
   }while((firstIndex === secondIndex)||(firstIndex === thirdIndex)||(secondIndex === thirdIndex));

   
firstImg.src = ShowImage.all[firstIndex].src;
secondImg.src = ShowImage.all[secondIndex].src;
thirdImg.src = ShowImage.all[thirdIndex].src;

ShowImage.all[firstIndex].view++;
console.log(ShowImage.all[firstIndex].view++);
ShowImage.all[secondIndex].view++;
ShowImage.all[thirdIndex].view++;



}

function eventHandler(e) {
    if((e.target.id === 'firstImg' || e.target.id === 'secondImg' || e.target.id === 'thirdImg') && counter < 25){
      render();
      console.log(counter);
      counter++;
  
    }
  
  }
  
  imageContenar.addEventListener('click', eventHandler);
  
  render();

  let numClick=0;
  for(let j=0 ; j<imgArray.length; j++){
    console.log(firstImg);
    firstImg.onclick = function(b) { 
       console.log(++numClick); 
    }

  }

  setTimeout(function(){
    document.getElementById('firstImg').style.display = 'block';
    document.getElementById('secondImg').style.display = 'block';
    document.getElementById('thirdImg').style.display = 'block';
},ShowImage.time);

function randomNumber( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max - min + 1 ) + min ); //The maximum is inclusive and the minimum is inclusive
  }