<template>
    <ion-page>    
        <ion-content :fullscreen="true" id="content">
            <div id="top_section">
                <div :class="{
                    'player': true,
                    'player1': true,
                    'currentTurn': currentPlayerTurn === 1 && gameInPlay
                }">
                    <p>Player 1</p>
                    <p>{{player1Score}}</p>
                </div>
                <div :class="{
                    'player': true,
                    'player2': true,
                    'currentTurn': currentPlayerTurn === 2 && gameInPlay
                }">
                    <p>Player 2</p>
                    <p>{{player2Score}}</p>
                </div>
                <div class="title_section">
                    <div>
                        <input type="number" v-model="columns" :disabled="gameInPlay">
                        &nbsp;&times;&nbsp;
                        <input type="number" v-model="rows" :disabled="gameInPlay">
                    </div>
                    <div id="start_reset_buttons">
                        <button @click="startGame()" v-if="!showReset">Start</button>
                        <button @click="resetGame()" v-if="showReset">Reset</button>
                    </div>
                </div>
                <div @click="gameInPlay || (totalPlayers >= 3 ? totalPlayers = 2 : totalPlayers = 3)" :class="{
                    'player': true,
                    'player3': true,
                    'not_active': totalPlayers < 3,
                    'currentTurn': currentPlayerTurn === 3 && gameInPlay
                }">
                    <p>Player 3</p>
                    <p>{{player3Score}}</p>
                </div>
                <div @click="gameInPlay || (totalPlayers >= 4 ? totalPlayers = 3 : totalPlayers = 4)" :class="{
                    'player': true,
                    'player4': true,
                    'not_active': totalPlayers < 4,
                    'currentTurn': currentPlayerTurn === 4 && gameInPlay
                }">
                    <p>Player 4</p>
                    <p>{{player4Score}}</p>
                </div>
            </div>
            <div id="bottom_section">
                <div id="board" v-if="gameInPlay">
                    <template v-for="col in (columns * 2 + 1)" :key="col">
                        <div :class="`${col % 2 == 0 ? 'square' : 'skinny'}`">
                            <template v-for="row in (rows * 2 + 1)" :key="row">
                                <div :class="`
                                ${row % 2 == 0 ? 'square' : 'skinny'} 
                                ${JSON.stringify(colouredBoxes).includes(JSON.stringify([[col, row], 1])) ? 'player1 filled' : ''} 
                                ${JSON.stringify(colouredBoxes).includes(JSON.stringify([[col, row], 2])) ? 'player2 filled' : ''}
                                ${JSON.stringify(colouredBoxes).includes(JSON.stringify([[col, row], 3])) ? 'player3 filled' : ''}
                                ${JSON.stringify(colouredBoxes).includes(JSON.stringify([[col, row], 4])) ? 'player4 filled' : ''}
                                `" 
                                @click="playerTurns($event, col, row)">

                                </div>
                            </template>
                        </div>
                    </template>
                </div>
                <div id="winner_annoucement">
                    <template v-if="totalScore >= columns * rows && columns * rows != 0 ">
                        <div style="font-size: 3rem;text-align: center;">
                            <p v-if="highestPlayerScore == ''">It's a draw!</p>
                            <p v-else :class="`player${highestPlayerScore}`">Player {{highestPlayerScore }} wins!</p>
                        </div>
                    </template>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomePage',
    components: {
        IonContent,
        IonPage,
    },
    data() {
        return {
            currentPlayerTurn: 1,
            columns: 4,
            rows: 4,
            gameInPlay: false,
            showReset: false,
            maxColumn: 18,
            maxRow: 8,
            colouredLines: [],
            colouredBoxes: [],
            player1Score: 0,
            player2Score: 0,
            player3Score: 0,
            player4Score: 0,
            totalPlayers: 2,
            totalScore: 0,
            highestPlayerScore: ''
        }
    },
    methods: {
        playerTurns(event, col, row){
            if(!this.gameInPlay){
                return
            }
            if(JSON.stringify(this.colouredLines).includes(JSON.stringify([col, row]))){
                return;
            }
            event.target.classList.add(`player${this.currentPlayerTurn}`);
            this.colouredLines.push([col, row])
            // For every box next to the currently placed line.
            let box1 = [0, 0];
            let box2 = [0, 0];
            if (Array.from(event.target.classList).includes('skinny')) {
                box1 = [col, row - 1];
                box2 = [col, row + 1];
            }
            if (Array.from(event.target.classList).includes('square')) {
                box1 = [col - 1, row];
                box2 = [col + 1, row];
            }
            
            

            let stringArray = JSON.stringify(this.colouredLines)
            //For box 1
            let x = box1[0]//col
            let y = box1[1]//row
            let boxAdded = false;
            if(
                stringArray.includes(`[${[x, y + 1]}]`) && 
                stringArray.includes(`[${[x, y - 1]}]`) && 
                stringArray.includes(`[${[x + 1, y]}]`) && 
                stringArray.includes(`[${[x - 1, y]}]`)
            ){
                this.colouredBoxes.push([box1, this.currentPlayerTurn]);
                boxAdded = true;
                this[`player${this.currentPlayerTurn}Score`] += 1;
                this.totalScore += 1;
            }
            //For box 2
            x = box2[0]//col
            y = box2[1]//row
            if(
                stringArray.includes(`[${[x, y + 1]}]`) && // Bottom Line
                stringArray.includes(`[${[x, y - 1]}]`) && // Top Line
                stringArray.includes(`[${[x + 1, y]}]`) && // Right Line
                stringArray.includes(`[${[x - 1, y]}]`) // Left Line
            ){
                this.colouredBoxes.push([box2, this.currentPlayerTurn]);
                boxAdded = true;
                this[`player${this.currentPlayerTurn}Score`] += 1;
                this.totalScore += 1;
            }
            if(!boxAdded){
                this.currentPlayerTurn += 1;
                if(this.currentPlayerTurn > this.totalPlayers){
                    this.currentPlayerTurn = 1
                }
            }
        },
        startGame(){
            this.clearGame()
            this.columns = Math.min(this.columns, this.maxColumn)
            this.columns = Math.max(this.columns, 1)
            this.rows = Math.min(this.rows, this.maxRow)
            this.rows = Math.max(this.rows, 1)
            this.$nextTick(() => {
                this.gameInPlay = true;
            })
        },
        resetGame(){
            this.clearGame()
        },
        clearGame(){
            this.gameInPlay = false;
            this.player1Score = 0;
            this.player2Score = 0;
            this.player3Score = 0;
            this.player4Score = 0;
            this.totalScore = 0;
            this.colouredLines = [];
            this.colouredBoxes = [];
            this.currentPlayerTurn = 1;
        }
    },
    watch: {
        gameInPlay(newValue){
            if(newValue){
                this.showReset = true
                
            }
            else {
                this.showReset = false

            }
        },
        totalScore(){
            const scoreArray = [this.player1Score, this.player2Score, this.player3Score, this.player4Score].sort((a, b) => a - b).reverse()
            console.log(scoreArray)
            if(scoreArray[0] == scoreArray[1]){
                this.highestPlayerScore = ''
            }
            else {
                const max = Math.max(this.player1Score, this.player2Score, this.player3Score, this.player4Score);
                this.highestPlayerScore = [this.player1Score, this.player2Score, this.player3Score, this.player4Score].indexOf(max) + 1;
            }
        }
    }
});
</script>

<style>
#winner_annoucement{
    position: absolute;
    top: 85px;
    left: calc(50% - 160px);
}

#winner_annoucement > div > p{
    background: #fffffff5;
    padding: 3px;
    border-radius: 3px;
    color: black
}

#top_section{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px dashed black;
    padding-top: 6px;
}

.title_section{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

#start_reset_buttons{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 5px;
}

#start_reset_buttons button{
    font-size: 1.2rem;
    border-radius: 4px;
    min-width: 7ch;
    padding: 3px 0px;
}

.player{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 7px;
    user-select: none;
    cursor: pointer;
}
.player.currentTurn{
    border: 3px solid currentColor;
}

.player p:nth-child(1){
    border-bottom: 1px solid white;
}
.player p:nth-child(2){
    color: white;
}

.player1{
    color: #0db2f3 !important;
}
.player2{
    color: #2af734 !important;
}
.player3{
    color: #a03aff !important;
}
.player4{
    color: #f7862a !important;
}

#bottom_section{
    width: 100%;
    padding: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#board{
    --skinny: 17px;
    --square: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}


.skinny .skinny{
    width: var(--skinny);
    height: var(--skinny);
    background-color: #ffffff08;
    pointer-events: none;
}
.square .skinny{
    width: var(--square);
    height: var(--skinny);
    color: #ffffff08;
    background-color: currentColor;
    cursor: pointer;
}
.square .skinny:is(.player1, .player2, .player3, .player4){
    width: calc(var(--square) + var(--skinny));
    margin: 0px calc(0px - var(--skinny) / 2) 0px calc(0px - var(--skinny) / 2);
    clip-path: polygon(0% 50%, calc(var(--skinny) / 2) 0%, calc(100% - calc(var(--skinny) / 2)) 0%, 100% 50%, calc(100% - calc(var(--skinny) / 2)) 100%, calc(var(--skinny) / 2) 100%);
}
.skinny .square{
    width: var(--skinny);
    height: var(--square);
    color: #ffffff08;
    background-color: currentColor;
    cursor: pointer;
}
.skinny .square:is(.player1, .player2, .player3, .player4){
    height: calc(var(--square) + var(--skinny));
    margin: calc(0px - var(--skinny) / 2) 0px calc(0px - var(--skinny) / 2) 0px;
    clip-path: polygon(50% 0%, 100% calc(var(--skinny) / 2), 100% calc(100% - calc(var(--skinny) / 2)), 50% 100%, 0% calc(100% - calc(var(--skinny) / 2)), 0% calc(var(--skinny) / 2));
}
.square .square{
    width: var(--square);
    height: var(--square);
    pointer-events: none;
    color: transparent;
    background-color: currentColor;
}
.square .square.filled{
    border: 1px solid #0008;
}

.not_active{
    color: grey !important;
}

p{
    margin: 0px;
}
input{
    width: 7ch;
    background: #3b3b3b;
}
</style>
