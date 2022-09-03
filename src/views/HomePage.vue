<template>
    <ion-page>    
        <ion-content :fullscreen="true">

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
    }
});
</script>

<style>

</style>
