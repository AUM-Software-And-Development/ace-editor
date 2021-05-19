import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ace from 'ace-builds';
// Allows enumeration through different modes.
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

const THEME = 'ace/theme/github';
const MODE = 'ace/mode/javascript';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  private editor!: ace.Ace.Editor;
  // Assertion justification: Assigned on init.
  private aceDelegate: any;
  @ViewChild('editor', {static: true}) editorElementRef!: ElementRef;
  // Assertion justification: Assigned on init.

  constructor() {} // Constructor not in use. Construction occurs on init.

    private constructOptions = (): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } => 
    {
      const aceEditorOptions: Partial<ace.Ace.EditorOptions> = {
      // The autocomplete property is not documented in the Ace namespace, so it must be delegated/inferred.
      highlightActiveLine: true,
      minLines: 10,
      maxLines: Infinity
    }; // =>
    const delegateOption = {
      enableBasicAutocompletion: true
    }; //_
    const assignDelegate = Object.assign(aceEditorOptions, delegateOption);
    return assignDelegate;
  }

  public ngOnInit(): void
  {
    ace.require('ace/ext/language_tools');
    const Element = this.editorElementRef.nativeElement;
    const Options = this.constructOptions();
    // Initializes the editing component to use the syntax helper.
    this.editor = ace.edit(Element, Options);
    this.editor.setTheme(THEME);
    this.editor.getSession().setMode(MODE);
    this.editor.setShowFoldWidgets(true);
  }

  public Beautify = () =>
  {
    this.aceDelegate = ace.require('ace/ext/beautify');
    // Won't set unless user requests it.
    if (this.editor && this.aceDelegate)
    // Check that the handlers are valid...
    {
      const session = this.editor.getSession();
      this.aceDelegate.beautify(session);
      // Invokes the ace beautify component on the delegates required case rather than the default case.
      // Uses the current session (active_element / template id).
      this.aceDelegate = null;
      // Restrict use to while needed...
    }
  }

  private consoleLogInstructions = () =>
  {
    const instructions = this.editor.getValue();
    console.log(instructions);
  }
}
