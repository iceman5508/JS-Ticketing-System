/**
 * Created by parker10 on 8/9/2017.
 */
var ticketService = new function () {

    this.closeTicket = function (Ticket) {
       var index = dataSet.indexOf(Ticket);
       dataSet[index][5] = 'closed';
       dataSet[index][10] = 'Isaac Parker';
       dataSet[index][6] = getDate();
    }

    this.deleteTicket = function (Ticket) {
        var index = dataSet.indexOf(Ticket);
        dataSet.splice(index, 1);
    }

    this.addNote = function (Ticket,data) {
        var index = dataSet.indexOf(Ticket);
        dataSet[index][11].unshift(data);
        dataSet[index][6] = getDate();
    }

    this.assignAgent = function (Ticket,department, agent) {
        var index = dataSet.indexOf(Ticket);
        dataSet[index][4] = department;
        dataSet[index][12] = agent;
        dataSet[index][6] = getDate();
    }

    this.createTicket = function(title,content){
        dataSet.push(
            [ dataSet.length+1, getDate(), "Isaac", title, "Blazertech", "open", getDate() , content,
                'new ticket', 'isaac@email.com','', [], '']);
    }
}