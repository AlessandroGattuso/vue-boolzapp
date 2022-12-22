const { createApp } = Vue;

createApp({
  data(){
    return {
      chatActive: 0,
      newMessage: '',
      search: '',
      contacts: [
        {
          name: 'Michele',
          avatar: '_1',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received'
            }
          ]
       },
       
       {
          name: 'Fabio',
          avatar: '_2',
          visible: true,
          messages: [
            {
              date: '20/03/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020 16:35:00',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            }
          ]
       },

       {
          name: 'Samuele',
          avatar: '_3',
          visible: true,
          messages: [
            {
              date: '28/03/2020 10:10:40',
              message: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020 16:15:22',
              message: 'Ah scusa!',
              status: 'received'
            }
          ]
       },

       {
          name: 'Alessandro B.',
          avatar: '_4',
          visible: true,
              messages: [
                {
                  date: '10/01/2020 15:30:55',
                  message: 'Lo sai che ha aperto una nuova pizzeria?',
                  status: 'sent'
                },
                {
                  date: '10/01/2020 15:50:00',
                  message: 'Si, ma preferirei andare al cinema',
                  status: 'received'
                }
              ]
       },

       {
          name: 'Alessandro L.',
          avatar: '_5',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ricordati di chiamare la nonna',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Va bene, stasera la sento',
              status: 'received'
            }
          ]   
       },

       {
          name: 'Claudia',
          avatar: '_6',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao Claudia, hai novità?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Non ancora',
              status: 'received'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent'
            }
          ]
       },

       {
          name: 'Federico',
          avatar: '_7',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received'
            }
          ]
       },

       {
        name: 'Davide',
        avatar: '_8',
        visible: true,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            message: 'Ciao, andiamo a mangiare la pizza stasera?',
            status: 'received'
          },
          {
            date: '10/01/2020 15:50:00',
            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:51:00',
            message: 'OK!!',
            status: 'received'
          }
        ],
       },

      ]  
    }
  },
  computed: {
     filterContact(){
       if(this.search.split(" ").join("") != ''){
         this.contacts.map((e) => {
            e.visible = true
            if(!e.name.toLowerCase().match(this.search.split(" ").join("").toLowerCase())){
              e.visible = false
            }
         })
       }
       else
        this.contacts.map((e) => e.visible = true); 
     }
  },
  methods: {
    changeChat(i){
      this.chatActive = i;
    },
    getTime(d){
      d = d.split(/\D/);
      d = new Date(Date.UTC(d[0], --d[1], d[2]||1, d[3]||0, d[4]||0, d[5]||0));
      return d.getHours() + ":" + d.getMinutes()
    },
    getRealTime(){
      let date = new Date();
      
      return this.twoDigits(date.getDate()) + "/" + this.twoDigits(date.getMonth()) + "/" + this.twoDigits(date.getFullYear()) + " " + this.twoDigits(date.getHours()) + ":" + this.twoDigits(date.getMinutes()) + ":" + this.twoDigits(date.getSeconds());
    },
    twoDigits(s){
      if(s < 10){
        return "0" + s;
      }
      return s
    },
    deleteMessage(i){
        this.contacts[this.chatActive].messages.splice(i, 1);
    },
    addNewMessage(){
      if(this.newMessage.split(" ").join("") != ''){
        this.contacts[this.chatActive].messages.push(
          {
            date: this.getRealTime(),
            message: this.newMessage,
            status: 'sent'
          }
        )
        this.newMessage = '';
        
        
        setTimeout(() => {
          this.contacts[this.chatActive].messages.push(
            {
              date: this.getRealTime(),
              message: 'Lo so',
              status: 'received'
            }
          )
        }, 2000)
      }
    }
  }
}).mount('#app');