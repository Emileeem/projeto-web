const calendario = require("../../src/model/calendario")
$(document).ready(function () {
    $('#calendar').fullCalendar({
        locale: 'pt-br',
        selectable: true,
        selectHelper: true,
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        select: function (start, end) {
            $('#modal').modal('toggle');
            var titulo = $('#titulo').val();
            var inicio = start.format('YYYY-MM-DD');
            var fim = end.format('YYYY-MM-DD');

            $.ajax({
                url: '/calendarioProf/<%= DBedv.IDProfessor %>', // atualize o URL conforme necessário
                type: 'POST',
                data: {
                    Titulo: titulo,
                    DataIni: inicio,
                    DataFim: fim
                },
                success: function(response) {
                    // Ação de sucesso
                },
                error: function(xhr, status, error) {
                    // Tratar erros
                }
            });
        },
        header: {
            left: 'month,agendaWeek',
            center: 'title',
            right: 'prev,today,next'
        },
        footer: {
            left: 'prev,next'
        },
        buttonText: {
            today: 'Hoje',
            month: 'Mês',
            agendaWeek: 'Semana',
            agendaDay: 'Eventos do Dia',
            list: 'Lista'
        },
        events: [
            {
                title: 'Evento 1',
                start: '2023-07-10',
                end: '2023-07-11'
            },
            {
                title: 'Evento 2',
                start: '2023-07-15',
                end: '2023-07-16'
            },
            {
                title: 'Feriado Elianinha',
                start: '2023-11-12',
                end: '2023-11-12'
            }
            // Adicione mais eventos conforme necessário
        ]
    });
});
