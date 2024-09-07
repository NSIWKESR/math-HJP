const shapes = ['▲', '◯', '◻', '◼', '◇', '⭐'];
let cards = [...shapes, ...shapes];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCardElement(shape) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.shape = shape;
    card.textContent = shape;
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function initializeGame() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    shuffledCards = [];
    shuffle(cards);
    cards.forEach(shape => {
        shuffledCards.push(createCardElement(shape));
    });
    shuffledCards.forEach(card => gridContainer.appendChild(card));
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.shape === secondCard.dataset.shape) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === shapes.length) {
            setTimeout(() => alert('Congratulations! You matched all pairs!'), 100);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1000);
    }
    flippedCards = [];
}

document.getElementById('restart').addEventListener('click', () => {
    matchedPairs = 0;
    initializeGame();
});

initializeGame();