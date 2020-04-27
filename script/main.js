/**
 * 
 * Quadratini AJAX
 * * Realizzare una Griglia 6x6 (36 boxes), ad ogni click parte una richiesta AJAX che prende un numero random da 1 a 9 (scegliere API opportuna).
 * * Se è <= 5 il quadrato diventa giallo, se è > di 5 il quadrato diventa verde.
 * * Il numero ottenuto appare al centro del quadrato
 * 
 */

$(document).ready(function() {

    // Vars
    var randIntApi = 'https://flynn.boolean.careers/exercises/api/random/int';
    var rows = 6;
    var cols = 6;

    // Refs
    var boxes = $('.boxes');

    // Html boxes population with a bit of Handlebars
    var boxTemplate = Handlebars.compile($('#box-template').html());
    var html = '';

    for (var i = 0; i < rows; i++) {
        html += '<div class="row" data-row="' + (i+1) + '">';
        for( var j = 0; j < cols; j++) {
            html += boxTemplate({ col: j+1 });
        }
        html += '</div>';
    }
    
    boxes.append(html);

    // New refs after creating html content via template
    var box = $('.box');

    // Click event on boxes
    box.click(function() {
        var self = $(this); // Assegnazione valore this a variabile "self", per riutilizzarla nella chiamata API
        fireworks(self); 

        // API call to get random int from 1 to 9 
        $.ajax({
            url: randIntApi,
            method: 'GET',
            success: function(data) {
                self.removeClass('yellow green');
                self.children().text(data.response);
                if(data.response <= 5) {
                    self.addClass('yellow play');
                } else {
                    self.addClass('green play');
                }                  
                setTimeout(function() { 
                    self.removeClass('rotate'); 
                }, 800);
            },
            error: function() { 
                console.log('API call error'); 
            }
        }); 

    }); // End of box.click event


    // Functions
    function fireworks(ref) {
        ref.addClass('rotate');
    }

}); // End of document.ready