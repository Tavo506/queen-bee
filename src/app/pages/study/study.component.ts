import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Word } from 'src/app/models/Word.model';
import {words as wordsJson} from '../../../assets/data'
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {

  words: Word[] = wordsJson;
  lowerLevel: number = 1;
  higherLevel: number = 15;
  order: number = 1;

  showWord: boolean = false;
  showTranslation: boolean = false;
  showDefinition: boolean = false;
  showExample: boolean = false;

  showLabels: boolean = false;

  finished: boolean = false;

  wordsToStudy!: Word[];

  currentWord!: Word;

  getNextWord: Function = () => {};

  private speaker = new SpeechSynthesisUtterance();


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.finished){
      return;
    }

    let key = event.key;

    if (key === 'n') {
      this.nextWord();
    }
    else if (key === 's') {
      this.sayWord();
    }
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.lowerLevel = Number(this.route.snapshot.paramMap.get('lowerLevel')!);
    this.higherLevel = Number(this.route.snapshot.paramMap.get('higherLevel')!);
    this.order = Number(this.route.snapshot.paramMap.get('order')!);

    this.getNextWord = this.order == 1 ? this.getSequentialWord : this.getRandomWord;

    this.speaker.rate = 0.65; // From 0.1 to 10
    this.speaker.pitch = 1; // From 0 to 2
    this.speaker.lang = "en";

    this.wordsToStudy = wordsJson.filter((e:Word) => e.Level >= this.lowerLevel && e.Level <= this.higherLevel);
    this.nextWord();
  }

  triggerShowLabels(){
    this.showLabels = !this.showLabels;

    this.showWord = this.showLabels;
    this.showTranslation = this.showLabels;
    this.showDefinition = this.showLabels;
    this.showExample = this.showLabels;
  }

  nextWord(){
    this.showWord = this.showLabels;
    this.showTranslation = this.showLabels;
    this.showDefinition = this.showLabels;
    this.showExample = this.showLabels;

    this.currentWord = this.getNextWord();

    if (this.currentWord == null){
      this.finished = true;
      return;
    }

    this.sayWord();
  }

  sayWord(){
    window.speechSynthesis.cancel();
    this.speaker.text = this.currentWord.Word.replace("*", "");
    window.speechSynthesis.speak(this.speaker);
  }

  saySlow(){
    window.speechSynthesis.cancel();
    this.speaker.rate = 0.35; // From 0 to 2
    this.speaker.text = this.currentWord.Word.replace("*", "");
    window.speechSynthesis.speak(this.speaker);
    this.speaker.rate = 0.65; // From 0 to 2
  }

  sayDef(){
    window.speechSynthesis.cancel();
    this.speaker.text = this.currentWord.Definition;
    window.speechSynthesis.speak(this.speaker);
  }

  sayExample(){
    window.speechSynthesis.cancel();
    this.speaker.text = this.currentWord.Example_Sentence;
    window.speechSynthesis.speak(this.speaker);
  }

  private getRandomWord(){
    if (this.wordsToStudy.length == 0){
      return null;
    }
    let item: Word = this.wordsToStudy[Math.floor(Math.random()*this.wordsToStudy.length)];
    this.wordsToStudy = this.wordsToStudy.filter(e => e != item);
    return item;
  }

  private getSequentialWord(){
    if (this.wordsToStudy.length == 0) {
      return null;
    }
    let item: Word = this.wordsToStudy[0];
    this.wordsToStudy = this.wordsToStudy.slice(1);
    return item;
  }

}
