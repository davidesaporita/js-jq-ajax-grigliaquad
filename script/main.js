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
    var id = 1;

    for (var i = 0; i < rows; i++) {
        html += '<div class="row" data-row="' + (i+1) + '">';
        for( var j = 0; j < cols; j++, id++) {
            html += boxTemplate({ id: id });
        }
        html += '</div>';
    }
    
    boxes.append(html);

    // New refs after creating html content via template
    var box = $('.box');

    // Click event on boxes
    $('#app').on('click', '.box', function() {
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
                
                if(checkCompleted()) {
                    happyEnd();
                }
                
            },
            error: function() { 
                console.log('API call error'); 
            }
        }); 

    }); // End of box.click event


    // Funzioni che funzionano
    function fireworks(ref) {
        ref.addClass('rotate');
    }

    function checkCompleted() {
        var x = 0;
        box.each(function() {
            this.classList.value.includes('play') ? x++ : x;
        });
        
        if(x === 20) return true;
        else        return false;
    }

    function happyEnd() {
        box.addClass('tremolo');
        var i = (rows*cols);
        faseOne = setInterval(function() {
            $('.box[data-id="'+ i +'"]').addClass('hinge');
            if(i <= 0) clearInterval(faseOne);
            i--;
        }, 1730);

        setTimeout(function() {
            y = (rows*cols);
            faseTwo = setInterval(function() {
                $('.box[data-id="'+ y +'"]').addClass('get-down');              
                if(y <= 0) clearInterval(faseTwo);
                y--;
            }, 1730);
        }, 2000);

        setTimeout(function() {
            $('.ajax').addClass('ease');
        }, 2730);

        setTimeout(function() {
            document.getElementById("audio").play();
        }, 1000);

        setTimeout(function() {
            $('#app').addClass('white');
            $('.box').addClass('white');
        }, 20000);

        setTimeout(function() {
            $('.text').text('PULITO E IGIENE SENZA FATICA');
            setTimeout(function() {
                $('.text').html('AJAX SI!<br>ED È GIA\' FINITA');
                setTimeout(function() {
                    $('.text').text('PULITO E IGIENE SENZA RISHAQUO');
                    setTimeout(function() {
                        $('.text').text('AJAX');
                        setTimeout(function() {
                            $('.text').html('IGIENE SI<br>FATICA NO');
                            setTimeout(function() {
                                $('.text').html('');
                            }, 2500);
                        }, 1800);
                    }, 2200);
                }, 3500);
            }, 3700);
        }, 25000);
        
    }


}); // End of document.ready