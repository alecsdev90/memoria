let game = {

    LockMode: false,
    firstCard: null, 
    secondCard: null,

    figures: ['betel',
    'criacao',
    'mae',
    'aviao',
    'orar',
    'idosa',
    'pregar',
    'amigos',
    'desenho',
    'jesus'],

cards : null,

    setCard: function (id) {

        let card = this.cards.filter((card) => card.id === id)[0];

        if (card.flipped || this.LockMode) {
            return false;
        } 

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.LockMode = true;
            return true;
        }

    },

    checkMatch: function (){
        if (!this.firstCard || !this.secondCard){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.LockMode = false;
    },

    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){

        return this.cards.filter(card=>!card.flipped).length == 0;
    },

  


    createCardsFromFigures: function () {

        this.cards = [];

        this.figures.forEach((figure) => {
            this.cards.push(this.createPairFromFigure(figure));
        })
        this.cards =  this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    createPairFromFigure: function (figure) {

        return [{
            id: this.createIdWithFigure(figure),
            icon: figure,
            flipped: false,
        }, {
            id: this.createIdWithFigure(figure),
            icon: figure,
            flipped: false,
        }]

    },

    createIdWithFigure: function (figure) {
        return figure + parseInt (Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while(currentIndex !== 0) {
    
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }

    

}