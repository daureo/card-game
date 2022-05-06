const p1Card = document.querySelector('#player1');
const p2Card = document.querySelector('#player2');
const p1Score = document.querySelector('#p1Score');
const p2Score = document.querySelector('#p2Score');

const result = document.querySelector('h3');

const playBtn = document.querySelector('button');

let deckID = '';
let p1NewScore = '';
let p2NewScore = '';

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(        
        response => response.json()
      )
  .then(
      data => {        
        deckID = data.deck_id;        
      }
      );


function converterNum(val){
    if(val === "ACE"){
        return 14;
    } else if(val === "KING") {
        return 13;
    } else if(val === "QUEEN") {
        return 12;
    } else if(val === "JACK") {
        return 11;
    } else {
        return Number(val);
    }
}

function compareCards(c1, c2){
    
    if(converterNum(c1.value) > converterNum(c2.value)){
        result.innerHTML = "Player 1 Wins this hand!";
        p1NewScore = Number(p1Score.innerHTML);
        p1NewScore++;
        p1Score.innerHTML = p1NewScore;

    } else if (converterNum(c1.value) < converterNum(c2.value)){
        result.innerHTML = "Player 2 Wins this hand!";
        p2NewScore = Number(p2Score.innerHTML);
        p2NewScore++;
        p2Score.innerHTML = p2NewScore;
    } else {
        result.innerHTML = "Lets go to WAAAAR!";
    }
}

function drawCard(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
  .then(        
        response => response.json()
      )
  .then(
      data => {
        console.log(data)

        p1Card.src = data.cards[0].image;
        p2Card.src = data.cards[1].image;
        
        if(data.remaining > 0){
            compareCards(data.cards[0], data.cards[1]);
        } else {
            if(p1NewScore > p2NewScore){
                window.alert("Game over - Player 1 Wins!");
            } else if (p1NewScore < p2NewScore) {
                window.alert("Game over - Player 2 Wins!");
            } else {
                window.alert("Game over - Draw Game!");
            }
        }
        
      }
      );
}
playBtn.addEventListener('click', ()=> drawCard());