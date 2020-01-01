<template>
    <div>
        <vue-event-calendar 
            :events="events"
            :title="allEventsTitle"
            @day-changed="handleDayChange"
        >
            <template scope="props">
                <div v-for="(event, index) in props.showEvents":key="index" class="event-item">
                    <div class="event wrapper">
                        <h3 class="event__title">{{event.title}}</h3> 
                        <p class="event__address">{{event.address}}</p>
                        <div class="event__panel">
                            <div class="event__date">
                                <p class="event__day">{{localeDate(event.date)}}</p>
                                <p class="event__time">{{event.time}}</p>
                            </div> 
                            <p class="event__cost">{{event.cost}}</p> 
                            <a v-if="event.link" :href="event.link" target="_blank" class="event__link">Подробней</a>
                        </div>
                    </div>
                </div>
        </template>
        </vue-event-calendar>
        <button @click="isOpenSendForm = !isOpenSendForm" v-if="!isOpenSendForm" class="btn">Добавить мероприятие</button>
        <div class="addEvent" v-if="isOpenSendForm">
            <form class="addEvent__form">
                <div class="addEvent__item" v-for="(field, fieldKey) in form" :key="fieldKey">
                    <label :for="fieldKey" class="addEvent__label">{{field.title}}</label>
                    <input type="text" class="addEvent__input" :id="fieldKey" v-model="field.value">
                </div>
                <div class="addEvent__item">
                    <button class="btn" @click.prevent="sendForm">Добавить мероприятие</button>
                </div>
                <div class="send__message">
                    <p class="send__success" v-if="getSuccessSend == 1">{{ sendingTime }} Письмо отправлено успешно!</p>
                    <p class="send__error" v-if="getSuccessSend == 0" >{{ sendingTime }}  Письмо не отправлен, попробуйте еще раз.</p>
                </div>
            </form>            
        </div>
    </div>
</template>

<script>

//     import vueEventCalendar from './components/calendar/vue-event-calendar';
    
// Vue.use(vueEventCalendar, {locale: 'ru', color: 'rgb(142, 187, 208)'});

    export default {
        data () {
            return {
                titleDate: '',
                isOpenSendForm: false,
                sendingTime: null,
                form: {
                    title:{
                        title: 'Название',
                        value: ''
                    } ,
                    date:{
                        title: 'Дата и время проведения',
                        value: ''
                    } ,
                    address:{
                        title: 'Город и место проведения',
                        value: ''
                    } ,
                    cost:{
                        title: 'Стоимость',
                        value: ''
                    } ,
                    link:{
                        title: 'Ссылка на подробности о мероприятии',
                        value: ''
                    } ,
                }
            }
        },
        components: {
            // vueEventCalendar
        },
        mounted: function(){
            // this.$EventCalendar.toDate(new Date().toLocaleString('zh-CN', {year: 'numeric', month: 'numeric', day: 'numeric'}));
            // let today = new Date();
            // console.log(today.getFullYear() + '/' + ( today.getMonth() + 1 ) + '/' + today.getDate());
            // this.$EventCalendar.toDate(today.getFullYear() + '/' + ( today.getMonth() + 1 ) + '/' + today.getDate());
            // this.$EventCalendar.toDate(today.getFullYear() + '/' + ( today.getMonth() + 1 ) + '/15');
            this.$store.dispatch('getEvents');
        },
        computed:{
            allEventsTitle(){
                return this.titleDate ? 'События на ' + this.titleDate : 'Все события';
            },
            events() {
                return this.$store.getters.getEvents;
            },
            getSuccessSend() {
                return this.$store.getters.getSuccessSend;
            }
        },
        methods:{
            handleDayChange(date){
                this.titleDate = localeDate(date);
            },
            localeDate(date){
                let curDate = new Date(date);
                return curDate.toLocaleDateString();
            },
            sendForm(){
                let curDate = new Date();
                this.sendingTime = curDate.toLocaleDateString('ru-RU',{hour: 'numeric', minute: 'numeric', second: 'numeric'});
                let form = this.form;
                let sendMessage = {};
                for ( let field in form ){
                    sendMessage[field] = form[field].value;
                }
                this.$store.dispatch('sendForm', sendMessage);
            }
        }
    }
</script>


<style>
    body{
        font-family: Roboto;
    }
</style>

<style scoped>
    .event{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .event__title{
        line-height: normal;
        font-size: 17px;
        font-weight: normal;
    }

    .event__address{
        margin-bottom: 20px;
    }

    .event__date{
        display: flex;
        flex-direction: column;
        background-color:#8ab57b;
        color:#fff;
        text-align: center;
        padding: 5px;
        margin-top: 20px;
        border-radius: 5px;
    }
    .event__panel{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
    }

    .event__link{
        color:#000;
        text-decoration: none;
        border-bottom: 1px solid;
    }
    .addEvent{
        background-color:#8ebbd0;
        padding: 20px 80px;
    }
    .addEvent__form{
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        -webkit-box-shadow: 0 3px 11px 2px rgba(0,0,0,.1);
        box-shadow: 0 3px 11px 2px rgba(0,0,0,.1);
        border-radius: 5px;
        color:#323232;
    }

    .addEvent__item{
        width: 70%;
        display: flex;
        margin: 10px auto;
    }
    .addEvent__input, .addEvent__label{
        display: block;
        width: 50%;
    }

    .addEvent__label{
        padding: 10px;
    }

    .btn{
        padding: 10px;
        border: 2px solid #8ebbd0;
        display: block;
        margin: 10px 0 10px auto;
        cursor: pointer;
        transition: .3s;
    }
    .btn:hover{
        background-color:#8ebbd036;
    }

    .send__message{
        text-align: center;
        color: #fff;
        font-weight: bold;
    }

    .send__success{
        padding: 10px 0;
        background-color: green;
    }

    .send__error{
        padding: 10px 0;
        background-color: red;
    }

    @media screen and (max-width: 900px){
        .addEvent{
            padding: 10px;
        }

        .addEvent__item{
            width: 90%;
            flex-wrap: wrap;
        }

        .addEvent__label{
            width: 100%;
        }

        .addEvent__input{
            width: 100%;
            padding: 10px 0;
        }
    }
</style>