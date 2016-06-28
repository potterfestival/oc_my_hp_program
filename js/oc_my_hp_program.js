/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var selected_nodes = [];
var my_program_url = null;

jQuery(document).ready(function(){
    //Bind to Tags
    AddModal();
    oc_my_hp_program_bind_tags();
    bind_render_program_events();
    bind_clear_my_program();
    //Generate the display view.
    my_program_url = Drupal.settings.hp_my_program.target_url;
    var old_program = jQuery.cookie("hp_my_program");
    if(old_program != null)
    {
        selected_nodes = JSON.parse(old_program);
        update_program_cart_count();
    }
    
});
/*
 * Binds to the button tags on nodes
 * example:
 * <span lass="oc-my-hp-program-wrap">
 * <input class="hidden oc-my-hp-program-id" value="" />
 * <a class="oc-my-hp-program-button" title="Add to program"><i class="fa fa-calendar-plus-o" aria-hidden="true"></i></a>
 * </span>
 */
function oc_my_hp_program_bind_tags()
{
    jQuery('.oc-my-hp-program-button').click(function(){
        var nid = parseInt(jQuery(this.parentNode).find('.oc-my-hp-program-id').text());
        Add_to_program(nid);
        
    });
}
/*
 * Handles updating the "cart count" and saving to cookie
 * for later display.
 */
function Add_to_program(nid)
{
    if(selected_nodes.indexOf(nid) === -1)
    {
        selected_nodes.push(nid);
        jQuery.cookie("hp_my_program", JSON.stringify(selected_nodes), { expires: 7,path: '/' });
        update_program_cart_count();
    }
    else
    {
        jQuery('#my_hp_program_info').find('.modal-title').text('Desværre');
        jQuery('#my_hp_program_info').find('.modal-body').text('arrangement er allerede tilføjet.');
        jQuery('#my_hp_program_info').modal('show');
    }
}
/*
 * Updates the cart button
 *<div class="oc_my_program_cart_wrap pull-right">
 *  <a href="#" class="oc_my_program_cart_btn" title="Mit Program"><i class="fa fa-list fa-border" aria-hidden="true"></i><span class="oc_my_program_cart_btn_count badge">0</span></a>
 *</div>
 */
function update_program_cart_count()
{
    jQuery('.oc_my_program_cart_btn_count').toggleClass('green-flash');
    setTimeout(function(){
            jQuery('.oc_my_program_cart_btn_count').text(selected_nodes.length);
            jQuery('.oc_my_program_cart_btn_count').toggleClass('green-flash');
        },600);
    
}
/*
 * Calls drupals to render the needed html to display the user his program
 */
function bind_render_program_events()
{
    jQuery('.oc_my_program_cart_btn').click(function(){
       var nodes = selected_nodes.join();
       window.location = my_program_url + "/" + nodes;
    })
}
/*
 * binds clear program cart event.
 */
function bind_clear_my_program()
{
    jQuery('.clear-my-program-btn').click(function()
    {
        selected_nodes = [];
        jQuery.cookie("hp_my_program", null, { expires: 7,path: '/' });
        window.location = my_program_url
    });

}
function AddModal()
{
    var modal = jQuery('<div id="my_hp_program_info" class="modal fade" role="dialog"> <div class="modal-dialog"> <!-- Modal content--> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Hpfestival</h4> </div> <div class="modal-body"> </div> <div class="modal-footer"> </div> </div> </div> </div>');
    jQuery('body').append(modal);
}