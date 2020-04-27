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
        html += '<div class="row">';
        for( var j = 0; j < cols; j++) {
            html += boxTemplate({});
        }
        html += '</div>';
    }
    
    boxes.append(html);

    // New refs after creating html content via template
    var box = $('.box');

 

});