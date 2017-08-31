/**
 * Created by parker10 on 8/9/2017.
 * The http service for adding new tables to database
 */
var ticketService = new function () {

    /**
     * close ticket
     * @param Ticket - the ticket to be closed
     */
    this.closeTicket = function (Ticket) {
       var index = dataSet.indexOf(Ticket);
       dataSet[index][5] = 'closed';
       dataSet[index][10] = flags.name;
       dataSet[index][13].push([getDate()+' - Closed by '+flags.name]);
       dataSet[index][6] = getDate();
    }

    /**
     * reopens a closed ticket
     * @param Ticket
     */
    this.reOpenTicket = function (Ticket) {
        var index = dataSet.indexOf(Ticket);
        dataSet[index][5] = 'open';
        dataSet[index][13].push([getDate()+' - Reopened by '+flags.name]);
        dataSet[index][6] = getDate();
    }

    /**
     * delete ticket
     * @param Ticket - the ticket to be deleted
     */
    this.deleteTicket = function (Ticket) {
        var index = dataSet.indexOf(Ticket);
        dataSet.splice(index, 1);
    }

    /**
     * Add a new note to a specific ticket
     * @param Ticket - the ticket the note will be added to
     * @param data - the data that will be passed
     */
    this.addNote = function (Ticket,data) {
        var index = dataSet.indexOf(Ticket);
        dataSet[index][11].push(data);
        dataSet[index][6] = getDate();
    }

    /**
     * Assign an agent or department to a open ticket
     * @param Ticket- the ticket to assign agent to
     * @param department - the department to add
     * @param agent - the agent to add
     */
    this.assignAgent = function (Ticket,department, agent) {
        var index = dataSet.indexOf(Ticket);
        dataSet[index][4] = department;
        dataSet[index][12] = agent;
        dataSet[index][6] = getDate();
        if(agent !== 'unassigned') {
            dataSet[index][13].push([getDate()+' - Assigned To '+agent]);
        }else {
            dataSet[index][13].push([getDate()+' - Assigned To '+department]);
        }
    }

    this.selfAssign = function (Ticket, agent) {
        var index = dataSet.indexOf(Ticket);
        dataSet[index][12] = agent;
        dataSet[index][13].push([getDate()+' - Assigned To '+flags.name]);
    }

    /**
     * create a ticket
     * @param title the title of the ticket
     * @param content - the content of the ticket
     */
    this.createTicket = function(title,email,content,closed,category,department,assigned){

        var id =  dataSet[dataSet.length-1][0]+1;
        var data =  [ id, getDate(), flags.name, title, department, "open", getDate(),
           content, category, email,'', [], '', [ [getDate()+' - Ticket Created by '+flags.name] ],
           slaGroup( getDate())];
        dataSet.push(data);
        if(assigned){
            this.selfAssign(data, flags.name);
        }
        if(closed){
            this.closeTicket(data);
        }
    }

}