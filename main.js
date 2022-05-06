const p1Card = document.querySelector('#player1');
const p2Card = document.querySelector('#player2');

const result = document.querySelector('h3');

const playBtn = document.querySelector('button');

let deckID = '';

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(        
        response => response.json()
      )
  .then(
      data => {
        console.log(data)
        deckID = data.deck_id;        
      }
      );

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
      }
      );
}

playBtn.addEventListener('click', ()=> drawCard());