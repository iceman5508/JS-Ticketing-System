/**
 * Created by parker10 on 8/8/2017.
 */

/***************************************View Ticket************************************/
var dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    minHeight: "auto",
    width: environment.width/2,
    autoResize:true,
    modal: true,
    resizable:false,
    title: '',
    buttons: {
        'Assign Ticket' : toAssign,
        'Notes' : toNotes,
        'Delete Ticket' : deleteTicket,
        'Close Ticket' : closeTicket,
        'Close View': function() {
            if(tag.trim().length > 0){changeToNormal();}
            dialog.dialog( "close" );
        }
    }
});

function closeTicket(){
   ticketService.closeTicket(row);
   dt.row(rIndex).data(dataSet[dataSet.indexOf(row)]).draw();
   Ticket.status = 'closed';
   Ticket.closedDate = dataSet[dataSet.indexOf(row)][6];
   Ticket.closedBy = dataSet[dataSet.indexOf(row)][10];
   document.getElementById('tk-status').innerHTML = Ticket.status+" ("+Ticket.closedDate+") " +
        "<br>ClosedBy"+" ("+Ticket.closedBy+") ";
   if(tag.trim().length === 0){
       changeToSuccessColor('tk-status', 'green', 'white');
   }else {
       changeToNormal();
       changeToSuccessColor('tk-status', 'green', 'white');
   }
}

function deleteTicket() {
    if(tag.trim().length > 0){changeToNormal();}
    ticketService.deleteTicket(row);
    dt.row(rIndex).remove().draw();
    dialog.dialog( "close" );
}

function toNotes() {
    if(tag.trim().length > 0){changeToNormal();}
    dialog.dialog( "close" );
    $('#notes').dialog('option', 'title',Ticket.title+" Notes");
    noteView.dialog("open");
    notes_dt.clear();
    notes_dt.rows.add(Ticket.notes);
    notes_dt.columns.adjust().draw();
}

function toAssign() {
    if(assignedDepartment.length>0){
        resetAssign();

    }
    if(tag.trim().length > 0){changeToNormal();}
    dialog.dialog( "close" );
    $('#assign').dialog('option', 'title',Ticket.title+" Assignment");
    assignView.dialog("open");
    dpt_dt.clear();
    dpt_dt.rows.add(departments);
    dpt_dt.columns.adjust().draw();
    hideDataTable('agns');
}
/***************************************View Ticket************************************/
/****************notes view***********************************************************/
var noteView = $( "#notes" ).dialog({
    autoOpen: false,
    minHeight: "auto",
    width: environment.width/2,
    autoResize:true,
    modal: true,
    resizable:false,
    title: '',
    buttons: {
        'Add Note' : addNote,
        'To Ticket': function() {
            if(noteAdded){
                dt.row(rIndex).data(dataSet[dataSet.indexOf(row)]).draw();
                noteAdded = false;
            }
            noteView.dialog( "close" );
            dialog.dialog( "open" );

        }
    }
});

function addNote() {
    var preProcessData = document.getElementById("note-body").value;
    if(preProcessData.trim().length>0){
        var data = [getDate(), 'Isaac', preProcessData];
        ticketService.addNote(row, data);
        Ticket.notes = dataSet[dataSet.indexOf(row)][11];
        notes_dt.row.add(Ticket.notes[0]);
        notes_dt.columns.adjust().draw();
        notes_dt.page('last').draw(false);
        document.getElementById("note-body").value="";
        if (!noteAdded){ noteAdded = true;}

    }
}
/****************notes view***********************************************************/
/**********************Assign view***************************************************/
var assignView = $( "#assign" ).dialog({
    autoOpen: false,
    minHeight: "auto",
    width: environment.width/2,
    autoResize:true,
    modal: true,
    resizable:false,
    title: '',
    buttons: {
        'reset' : resetAssign,
        'Assign' : assignAgent,
        'To Ticket': function() {
            if(tag.trim().length > 0){changeToNormal();}
            resetAssign();
            assignView.dialog( "close" );
            dialog.dialog( "open" );
        }
    }
});

function assignAgent() {
    if(assignedAgent.length>0 && assignedDepartment.length>0 && Ticket.status === 'open') {
        ticketService.assignAgent(row,assignedDepartment,assignedAgent);
        Ticket.department = dataSet[dataSet.indexOf(row)][4];
        Ticket.assigenedTo = dataSet[dataSet.indexOf(row)][12];
        document.getElementById('tk-dept').innerHTML = Ticket.department+" - ("+Ticket.assigenedTo+")";
        dt.row(rIndex).data(dataSet[dataSet.indexOf(row)]).draw();
        if(tag.trim().length === 0){
            changeToSuccessColor('tk-dept', 'green', 'white');
        }else {
            changeToNormal();
            changeToSuccessColor('tk-dept', 'green', 'white');
        }
        resetAssign();
        assignView.dialog( "close" );
        dialog.dialog( "open" );
    }


}

function resetAssign() {
    hideDataTable('agns');
    agen_dt.clear();
    showDataTable('depts');
    dpt_dt.clear();
    dpt_dt.rows.add(departments);
    dpt_dt.columns.adjust().draw();
    assignedDepartment = '';
    assignedAgent='unassigned';

}
/**********************Assign view***************************************************/
/**********************Creating new Ticket*******************************************/
var createView = $( "#createTicket" ).dialog({
    autoOpen: false,
    minHeight: "auto",
    width: environment.width/2,
    autoResize:true,
    modal: true,
    resizable:false,
    title: 'New Ticket',
    buttons: {
        'Reset' : resetMake,
        'Create' : makeTicket,
        'Close View': function() {
            createView.dialog( "close" );
        }
    }
});

function resetMake() {
    document.getElementById('make-title').value = '';
    document.getElementById('make-body').value='';

}

function makeTicket() {
   var title = document.getElementById('make-title').value;
   var body =  document.getElementById('make-body').value;
   if(body.trim().length>0 && title.trim().length>0){
       createView.dialog( "close" );
        resetMake();
        ticketService.createTicket(title,body);
        dt.row.add(dataSet[dataSet.length-1]);
       dt.columns.adjust().draw();




   }

}


/***********************creating new Ticket****************************************/