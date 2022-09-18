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
                    <p>{{player1}}</p>
                </div>
                <div class="title_section">
                    <div>
                        <input type="number" v-model="columns" :disabled="gameInPlay">
                        &nbsp;&times;&nbsp;
                        <input type="number" v-model="rows" :disabled="gameInPlay">
                    </div>
                    <div id="start_reset_buttons">
                        <button @click="startGame()">Start</button>
                        <button @click="resetGame()">Reset</button>
                    </div>
                </div>
                <div :class="{
                    'player': true,
                    'player2': true,
                    'currentTurn': currentPlayerTurn === 2 && gameInPlay
                }">
                    <p>Player 2</p>
                    <p>{{player2}}</p>
                </div>
            </div>
            <div id="bottom_section">
                <div id="board" v-if="gameInPlay">
                    <template v-for="col in (columns * 2 + 1)" :key="col">
                        <div :class="`${col % 2 == 0 ? 'square' : 'skinny'}`">
                            <template v-for="row in (rows * 2 + 1)" :key="row">
                                <div :class="`${row % 2 == 0 ? 'square' : 'skinny'} ${JSON.stringify(colouredBoxes).includes(JSON.stringify([[col, row], 1])) ? 'player1 filled' : ''} ${JSON.stringify(colouredBoxes).includes(JSON.stringify([[col, row], 2])) ? 'player2 filled' : ''}`" @click="playerTurns($event, col, row)">

                                </div>
                            </template>
                        </div>
                    </template>
                </div>
                <div>
                    <template v-if="totalScore >= columns * rows">
                        <div :class="player1 > player2 ? 'player1' : player2 > player1 ? 'player2' : ''" style="padding: 50px; font-size: 3rem;">
                            {{ player1 > player2 ? 'Player 1 wins!' : player2 > player1 ? 'Player 2 wins!' : 'It\'s a draw!' }}
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
            maxColumn: 18,
            maxRow: 8,
            colouredLines: [],
            colouredBoxes: [],
            player1: 0,
            player2: 0,
            totalScore: 0
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
                this[`player${this.currentPlayerTurn}`] += 1;
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
                this[`player${this.currentPlayerTurn}`] += 1;
                this.totalScore += 1;
            }
            if(!boxAdded){
                this.currentPlayerTurn = !(this.currentPlayerTurn - 1) ? 2 : 1;
            }
        },
        startGame(){
            this.gameInPlay = false;
            this.$nextTick(() => {
                this.gameInPlay = true;
            })
            this.player1 = 0;
            this.player2 = 0;
            this.totalScore = 0;
            this.colouredLines = [];
            this.colouredBoxes = [];
            this.currentPlayerTurn = 1;
            this.columns = Math.min(this.columns, this.maxColumn)
            this.rows = Math.min(this.rows, this.maxRow)
        },
        resetGame(){
            this.gameInPlay = false;
            this.player1 = 0;
            this.player2 = 0;
            this.totalScore = 0;
            this.colouredLines = [];
            this.colouredBoxes = [];
            this.currentPlayerTurn = 1;
        }
    }
});
</script>

<style>
#top_section{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px dashed black;
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

#bottom_section{
    width: 100%;
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#board{
    --skinny: 15px;
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
}
.square .skinny:is(.player1, .player2){
    width: calc(var(--square) + var(--skinny));
    margin: 0px calc(0px - var(--skinny) / 2) 0px calc(0px - var(--skinny) / 2);
    clip-path: polygon(0% 50%, calc(var(--skinny) / 2) 0%, calc(100% - calc(var(--skinny) / 2)) 0%, 100% 50%, calc(100% - calc(var(--skinny) / 2)) 100%, calc(var(--skinny) / 2) 100%);
}
.skinny .square{
    width: var(--skinny);
    height: var(--square);
    color: #ffffff08;
    background-color: currentColor;
}
.skinny .square:is(.player1, .player2){
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

p{
    margin: 0px;
}
input{
    width: 7ch;
    background: #3b3b3b;
}
</style>
