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
  wordsToStudy!: Word[];

  currentWord!: Word;

  private speaker = new SpeechSynthesisUtterance();


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    let key = event.key;
    if (key === 'Enter') {
      this.nextWord();
    }
    
  }


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.lowerLevel = Number(this.route.snapshot.paramMap.get('lowerLevel')!);
    this.higherLevel = Number(this.route.snapshot.paramMap.get('higherLevel')!);

    var voices = window.speechSynthesis.getVoices();
    this.speaker.voice = voices[8]; 
    this.speaker.rate = 0.8; // From 0.1 to 10
    this.speaker.pitch = 1; // From 0 to 2

    this.wordsToStudy = wordsJson.filter((e:Word) => e.Level >= this.lowerLevel && e.Level <= this.higherLevel);
    this.nextWord();
  }

  nextWord(){
    this.currentWord = this.getRandomWord();

    this.say();
  }

  say(){
    this.speaker.text = this.currentWord.Word;
    window.speechSynthesis.speak(this.speaker);
  }

  private getRandomWord(){
    let item: Word = this.wordsToStudy[Math.floor(Math.random()*this.wordsToStudy.length)];
    this.wordsToStudy = this.wordsToStudy.filter(e => e != item);
    return item;
  }

}
