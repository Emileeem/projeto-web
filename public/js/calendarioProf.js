$(document).ready(function(){
        $('#calendar').fullCalendar({
            locale: 'pt-br',
            selectable: true,
            selectHelper: true,
            select: function(){
                $('#modal').modal('toggle');
            },
            header:
            {
                left:'month, agendaWeek',
                center:'title',
                right:'prev, today, next'
            },
            footer:
            {
                left:'prev, next',
            },
            buttonText:
            {
                today: 'Hoje',
                month: 'Mês',
                agendaWeek: 'Semana',
                agendaDay: 'Eventos do Dia',
                list: 'Lista',
            },
            events:{
                title: $('#titulo'),
                start: $('#inicio'),
                end: $('#final'),
            },
            
        })
    });
