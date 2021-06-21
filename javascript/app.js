'use strict';

let imageContenar = document.getElementById('imageContenar');
let firstImg = document.getElementById('firstImg');
let secondImg = document.getElementById('secondImg');
let thirdImg = document.getElementById('thirdImg');
let viewInfo = document.getElementById('viewInfo');
let buttonResults = document.getElementById('buttonResults');

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
  let round=25;
  let firstIndex ;
  let secondIndex;
  let thirdIndex;

function ShowImage(name, src ){
    this.name = name;
    
    this.view =0;
    this.clicks=0;
    this.imgsrc = `./image/${src}`;
    ShowImage.all.push(this);
    
}
ShowImage.all=[];

for( let i = 0; i < imgArray.length; i++ ){
    new ShowImage( imgArray[i].split( '.' )[0], imgArray[i] );
  }
  
function render(){
  let replacFirstIndex,replacSeconIndex,replacThirdIndex;
  replacFirstIndex = randomNumber(0, imgArray.length-1);
    if(replacFirstIndex == firstIndex)
    {
      replacFirstIndex = randomNumber(0, imgArray.length-1)
    }
    
   do{
    replacSeconIndex = randomNumber(0, imgArray.length-1);
    if(replacSeconIndex == secondIndex)
    {
      replacSeconIndex = randomNumber(0, imgArray.length-1)
    }
    replacThirdIndex = randomNumber(0, imgArray.length-1);
    if(replacThirdIndex == thirdIndex)
    {
      replacThirdIndex = randomNumber(0, imgArray.length-1)
    }
   }while((replacFirstIndex === replacSeconIndex)||(replacFirstIndex === replacThirdIndex)||(replacSeconIndex === replacThirdIndex));

   
  firstImg.src = ShowImage.all[replacThirdIndex].imgsrc;
  secondImg.src = ShowImage.all[replacSeconIndex].imgsrc;
  thirdImg.src = ShowImage.all[replacFirstIndex].imgsrc;

  ShowImage.all[replacThirdIndex].view++;

  ShowImage.all[replacSeconIndex].view++;
  ShowImage.all[replacFirstIndex].view++;

  firstIndex=replacFirstIndex;
  secondIndex=replacSeconIndex;
  thirdIndex=replacThirdIndex;
}


function eventHandler(e) {
    if((e.target.id === 'firstImg' || e.target.id === 'secondImg' || e.target.id === 'thirdImg') && counter < round){
      if(e.target.id === 'firstImg' ){
        ShowImage.all[firstIndex].clicks++;
      }
      if(e.target.id === 'secondImg' ){
        ShowImage.all[secondIndex].clicks++;
      }
      if(e.target.id === 'thirdImg' ){
        ShowImage.all[thirdIndex].clicks++;
       }
      counter++;
     
      render();
    }
  
}


function showData(e){
    let ul = document.createElement('ul');
    viewInfo.appendChild(ul);
    for(let i=0 ; i<imgArray.length; i++){
      let li =document.createElement('li');
      ul.appendChild(li);
      li.textContent=`${ShowImage.all[i].name}  had ${ShowImage.all[i].clicks} votes, and was seen ${ShowImage.all[i].view} times`
    }
    buttonResults.removeEventListener('click',showData);
    drawChart();
  }
imageContenar.addEventListener('click', eventHandler);
buttonResults.addEventListener('click', showData);
render();

function randomNumber( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max - min + 1 ) + min ); //The maximum is inclusive and the minimum is inclusive
  }

function drawChart() {

    let name = [];
    let view = [];
    let click=[];
    
  
    for(let i = 0; i < ShowImage.all.length; i++) {
      name.push(ShowImage.all[i].name);
      view.push(ShowImage.all[i].view);
      click.push(ShowImage.all[i].clicks);
    }
  
    let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  
    new Chart( ctx, {
      type: 'bar',
      data: {
        labels: name,
        datasets: [{
          label: '# of Views',
          data: view, 
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          
          
        },
      {
        label: '# of clicks',
          data: click, 
          backgroundColor: 'rgba(255, 206, 86, 1)',
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)']
      }
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    } );
  }

