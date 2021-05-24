import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

const SYNTAX = 'ace/mode/javascript';
const THEME = 'ace/theme/github';
const DEFAULT_CONTENT = '';
var EVENT_RESULT = '';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  private editor!: ace.Ace.Editor;
  private aceDelegate: any;
  @ViewChild('editor', {static: true}) editorElementRef!: ElementRef;
  @Input() content!: string;

  private constructOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; }
  {
    // The autocomplete property is not documented in the Ace namespace, so it must be delegated/inferred.
    var aceEditorOptions: Partial<ace.Ace.EditorOptions> = {
    highlightActiveLine: true,
    minLines: 10,
    maxLines: Infinity
    }; // =>
    var delegateOption = {
      enableBasicAutocompletion: true
    };
    var assignDelegate = Object.assign(aceEditorOptions, delegateOption);
    return assignDelegate;
  }

  private constructEditor(options: any, element: Element): ace.Ace.Editor 
  {
    var editor = ace.edit(element, options);
    editor.getSession().setMode(SYNTAX);
    editor.setTheme(THEME);
    editor.setShowFoldWidgets(true);
    return editor;
  }

  public ngOnInit(): void
  {
    ace.require('ace/ext/language_tools');
    var Options = this.constructOptions();
    var Element = this.editorElementRef.nativeElement;
    this.editor = this.constructEditor(Options, Element);
    this.ChangeContent(this.content || DEFAULT_CONTENT);
  }

  private editorStatus = () => EVENT_RESULT = this.editor? "did return a reference" : "did not return a reference";
  
  public Beautify()
  {
    // Won't set unless user requests it.
    // Invokes the ace beautify component on the delegate's required case rather than the default case.
    // Uses the current session (active_element / template id).
    // Restrict use to while needed...
    if (this.editorStatus())
    {
      this.aceDelegate = ace.require('ace/ext/beautify');
      var session = this.editor.getSession();
      this.aceDelegate.beautify(session);
      this.aceDelegate = null;
    }
    console.log("Beautify ran, and the editor: " + EVENT_RESULT);
    this.consoleLogInstructions("These are the instructions that were beautified:");
  }

  public ChangeContent(contentSet: string)
  {
    if (this.editorStatus())
    {
      this.editor.setValue(contentSet);
    }
  }

  private onChangeContent(callback: (function_: string, delta: ace.Ace.Delta) => void): void
  {
    this.editor.on('change', (delta) =>
    {
      var update = this.consoleLogInstructions();
      callback(update, delta);
    });
  }

  private checkContent()
  {
    if (this.editorStatus())
    {
      var dataArray = this.consoleLogInstructions();
      return dataArray;
    }
    return null;
  }

  private consoleLogInstructions(logString = "These are the instructions that were found:"): string
  {
    console.log(logString);
    console.log("**********");
    var instructions = this.editor.getValue();
    console.log(instructions);
    console.log("**********");
    return instructions;
  }
}