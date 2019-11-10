/*------------------------------------------------------------------------------
 * Author       Stefan Dobre
 * Created      01.06.2019
 *
 * Description  Dynamic Action plug-in to change the default APEX spinner,
 *              by providing custom HTML and CSS.
 *
 * License      MIT 
 *------------------------------------------------------------------------------
 * Modification History
 *
 * 10.11.2019   v1.2 fixed spinnerClass + help text
 * 18.06.2019   v1.1 fixed issue on modal page
 * 01.06.2019   v1.0 initial release
 */-----------------------------------------------------------------------------

function render
    ( p_dynamic_action in apex_plugin.t_dynamic_action
    , p_plugin         in apex_plugin.t_plugin
    )
return apex_plugin.t_dynamic_action_render_result
as
    l_result apex_plugin.t_dynamic_action_render_result;
begin

    apex_javascript.add_library
        ( p_name       => 'script#MIN#'
        , p_directory  => nvl(:G_APEX_UTILS_APEX_NITRO_IMAGES, p_plugin.file_prefix) || 'js/'
        );

    l_result.javascript_function := 'apexUtils.changeSpinner';
    
    l_result.attribute_01 := p_dynamic_action.attribute_01; --html
    l_result.attribute_02 := p_dynamic_action.attribute_02; --css

    return l_result;
end;