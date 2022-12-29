const { createApp } = Vue;

createApp({
  data(){
    return {
      chatActive: 0,
      newMessage: '',
      search: '',
      dt: luxon.DateTime,
      contacts: [
        {
          name: 'Michele',
          avatar: '_1',
          visible: true,
          isWriting: false,
          lastAccess: '12:00',
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
          isWriting: false,
          lastAccess: '12:00',
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
          isWriting: false,
          lastAccess: '12:00',
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
          lastAccess: '12:00',
          visible: true,
          isWriting: false,
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
          isWriting: false,
          lastAccess: '12:00',
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
          isWriting: false,
          lastAccess: '12:00',
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
          isWriting: false,
          lastAccess: '12:00',
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
        isWriting: false,
        lastAccess: '12:00',
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
    
  },
  methods: {
    changeChat(i){
      this.chatActive = i;
    },
    getTime(d){
      let date = this.dt.fromFormatExplain(d, "dd/MM/yyyy hh:mm:ss");
      return date.result.hour + ":" + date.rawMatches[9];
    },
    getRealTime(){
      let date = luxon.DateTime.fromISO(this.dt.now(), {
        zone: "Europe/Rome"
      });
      return date.toLocaleString(luxon.DateTime.DATE_SHORT) + " " + date.toLocaleString(luxon.DateTime.TIME_24_WITH_SECONDS);
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
        this.contacts[this.chatActive].isWriting = true
        
        setTimeout(() => {
          const realTime = this.getRealTime();
          this.contacts[this.chatActive].messages.push(
            {
              date: realTime,
              message: 'Lo so',
              status: 'received'
            }
          )
          this.contacts[this.chatActive].isWriting = false
          this.contacts[this.chatActive].lastAccess = this.getTime(realTime);
        }, 2000);
      }
    },
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
    },
    checkLastMessage(chat){
      if(chat.messages.length > 0){
        return (chat.messages[chat.messages.length - 1].message.length > 16) ? 
            chat.messages[chat.messages.length - 1].message.slice(0,16) + "..." :
            chat.messages[chat.messages.length - 1].message
      }
      else
        return ''
    },
    deleteChat(){
      this.contacts[this.chatActive].messages.splice(0, this.contacts[this.chatActive].messages.length)
    },
    deleteContact(){
      this.contacts.splice(this.chatActive, 1)
    }
  }
}).mount('#app');