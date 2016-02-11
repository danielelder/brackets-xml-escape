/*jslint vars: true, plusplus: true */
/*global define, brackets */

/** Extension to escape and unescape xml 
*/
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus");

    // Escape XML elements in document
    function handleXMLEscape() {
        var editor = EditorManager.getFocusedEditor();
        if (editor && editor.hasSelection()) {
            var allText = editor.document.getText();
            var selectedText = editor.getSelectedText();
            var escapedText = selectedText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&'/g, "apos;").replace(/&"/g, "quot;");
            editor.document.setText(allText.replace(selectedText, escapedText));
        }
    }

    // Unescape XML elements in document
    function handleXMLUnescape() {
        var editor = EditorManager.getFocusedEditor();
        if (editor) {
            var allText = editor.document.getText();
            var unescapedText = allText.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
            editor.document.setText(unescapedText);
        }
    }
    
    // Register escape/unescape commands
    var ESCAPE_ID = "sl.xml-escape-escape";
    CommandManager.register("XML Escape", ESCAPE_ID, handleXMLEscape);

    var UNESCAPE_ID = "sl.xml-escape-unescape";
    CommandManager.register("XML Unescape", UNESCAPE_ID, handleXMLUnescape);
    
    // Create menu items
    Menus.getMenu(Menus.AppMenuBar.EDIT_MENU).addMenuDivider();

    var menu_escape = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu_escape.addMenuItem(ESCAPE_ID);
    
    var menu_unescape = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu_unescape.addMenuItem(UNESCAPE_ID);
});
