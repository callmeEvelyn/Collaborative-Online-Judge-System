import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

declare var ace:any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;

  public languages: string[] = ['Java', 'C++', 'Python'];
  language: string = 'Java';  //default
  sessionId: string;

  defalutContent = {
    'Java': `public class Solution {
    public static void main(String[] args) {
      // Type your Java code here
    }
}` ,
    'C++': `#include <iostream>
using namespace std;

int main() {
  // Type your C++ code here
  return 0;
}`,
    'Python': `class Solution:
    def example():
      # Write your Python code here`
  };
  constructor(@Inject('collaboration') private collaboration,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.initEditor();
    });
    }

    initEditor() {
      this.editor = ace.edit('editor');
      this.editor.setTheme('ace/theme/eclipse');
      this.editor.getSession().setMode('ace/mode/java');
      this.editor.setValue(this.defalutContent['Java']);
      this.editor.$blockScrolling = Infinity;

      document.getElementsByTagName('textarea')[0].focus();

      this.collaboration.init(this.editor, this.sessionId);
      this.editor.lastAppliedChange = null;

      this.editor.on('change', (e) => {
        console.log('editor changes: ' + JSON.stringify(e));
        if(this.editor.lastAppliedChange != e) {
          this.collaboration.change(JSON.stringify(e));
        }
      });

      this.editor.getSession().getSelection().on("changeCursor", () => {
        let cursor = this.editor.getSession().getSelection().getCursor();
        console.log('cursor moves: ' + JSON.stringify(cursor));
        this.collaboration.cursorMove(JSON.stringify(cursor));
      });

      this.collaboration.restoreBuffer();
    }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void {
    console.log(this.language);
    if(this.language.toLocaleLowerCase()=='c++') {
      this.editor.getSession().setMode('ace/mode/c_cpp');
    }
    else{
      this.editor.getSession().setMode('ace/mode/'+this.language.toLocaleLowerCase());
    }
    this.editor.setValue(this.defalutContent[this.language]);
  }

  submit(): void {
    let userCode = this.editor.getValue();
    console.log(userCode);
  }
}
