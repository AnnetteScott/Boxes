<template>
    <ion-page>    
        <ion-content :fullscreen="true" id="content">
            <div id="top_section">
                <div :class="{
                    'player': true,
                    'player1': true,
                    'currentTurn': currentPlayerTurn === 1
                }">
                    <p>Player 1</p>
                    <p>10</p>
                </div>
                <div class="title_section">
                    <div>
                        <input type="number" v-model="columns">
                        &nbsp;&times;&nbsp;
                        <input type="number" v-model="rows">
                    </div>
                    <div id="start_reset_buttons">
                        <button>Start</button>
                        <button>Reset</button>
                    </div>
                </div>
                <div :class="{
                    'player': true,
                    'player2': true,
                    'currentTurn': currentPlayerTurn === 2
                }">
                    <p>Player 2</p>
                    <p>20</p>
                </div>
            </div>
            <div id="bottom_section">
                <div id="board">
                    <template v-for="col in (columns * 2 + 1)" :key="col">
                        <div :class="`${col % 2 == 0 ? 'square' : 'skinny'}`">
                            <template v-for="row in (rows * 2 + 1)" :key="row">
                                <div :class="`${row % 2 == 0 ? 'square' : 'skinny'}`">

                                </div>
                            </template>
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
            currentPlayerTurn: 2,
            columns: 15,
            rows: 8,
            gameInPlay: false,
            maxColumn: 18,
            maxRow: 8
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
    color: #0db2f3;
}
.player2{
    color: #F7A22A;
}

#bottom_section{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#board{
    --skinny: 12px;
    --square: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}


.skinny .skinny{
    width: var(--skinny);
    height: var(--skinny);
    background-color: rgba(255, 255, 255, 0.623);
}
.square .skinny{
    width: var(--square);
    height: var(--skinny);
    background-color: white;
}
.skinny .square{
    width: var(--skinny);
    height: var(--square);
    background-color: white;
}
.square .square{
    width: var(--square);
    height: var(--square);
}

p{
    margin: 0px;
}
input{
    width: 7ch;
}
</style>
