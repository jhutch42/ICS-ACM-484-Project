export default class DataManager {
    publisher;  
    subscriber;
    #dataTable;   // (Private) Hashes games with a unique id
    constructor(publisher, subscriber){
        this.publisher = publisher;
        this.subscriber = subscriber;
        this.subscriber.setCallbackFunction(this.messageHandler);
        this.#dataTable = new Map();
    };

    /**
     * Parses message received from other components.
     * @param {{from: string, body: object}} message 
     */
    messageHandler = message => {
        const from = message.from;
        const body = message.body;
    }
}