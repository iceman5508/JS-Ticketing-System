/**
 * Created by parker10 on 8/8/2017.
 */
$(document).ready(function() {

   dt = $('#example').DataTable( {
       dom: 'Bfrtip',
       buttons: [
           {
               text: 'New Ticket',
               className: 'posButt',
               action: function ( e, dt, node, config ) {
                   createView.dialog( "open" );
               }
           }
       ],
        data: dataSet,
        columns: [
            { title: "id"  },
            { title: "created date"},
            { title: "author" },
            { title: "title" },
            { title: "department" },
            { title: "status"} ,
            { title: "last modified" }
        ],
        "iDisplayLength" : 8,
        "scrollY":        "200px",
        "scrollCollapse": true,
        "paging":         true,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": true,
        "bAutoWidth": false,
        select: true,
       "order": [[ 0, "desc" ]]
    } );

    dt.on( 'click', 'tr', function () {
        if(tag.trim().length>0) {changeToNormal();}
        rIndex = dt.row( this ).index();
        row = dt.row( this ).data();
        setTicket();
        $('#dialog-form').dialog('option', 'title',Ticket.title);
        dialog.dialog( "open" );
    } );

    notes_dt =  $('#example2').DataTable({
        data: [],
        columns: [
            { title: "date created" },
            { title: "author" },
            { title: "content" }
        ],
        "iDisplayLength" : 3,
        "scrollY":        "200px",
        "scrollCollapse": true,
        "paging":         true,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        select: true,
        "order": [[ 0, "desc" ]]
    });

    dpt_dt =  $('#depts').DataTable({
        data: [],
        columns: [{ title: "Department Name" }],
        "iDisplayLength" : 4,
        "scrollY":        "200px",
        "scrollCollapse": true,
        "paging":         true,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        select: true});
        dpt_dt.on( 'click', 'tr', function () {
            hideDataTable('depts');
            showDataTable('agns');
            agen_dt.clear();
            assignedDepartment = dpt_dt.row( this ).data();
            var agentsList = agents[departments.indexOf(dpt_dt.row( this ).data())];
            dpt_dt.clear();
            for (var i = 0; i < agentsList.length; i++) {
                agen_dt.row.add([agentsList[i]]);
            }
            agen_dt.columns.adjust().draw();
        });
    agen_dt =  $('#agns').DataTable({
        data: [],
        columns: [{ title: "Agent Name" }],
        "iDisplayLength" : 4,
        "scrollY":        "200px",
        "scrollCollapse": true,
        "paging":         true,
        "bPaginate": false,
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        "bAutoWidth": false,
        select: true
    });

    agen_dt.on( 'click', 'tr', function () {
       assignedAgent = agen_dt.row( this ).data();
    });


    $('.dataTables_filter').addClass('search-css');

} );