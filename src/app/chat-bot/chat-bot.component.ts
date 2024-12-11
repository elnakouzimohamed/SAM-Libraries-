import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { GENAIService } from '../genai.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn:'root',
})
@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {
  generatedText!: Observable<string>;
  prompt:string = "";
  loading!: boolean;
  constructor(private genaiService: GENAIService){}
  generateText(){
    this.genaiService.generate_text(this.prompt).subscribe(
      (response)=>{
        this.generatedText = of(response.generatedText);
      }
      // (error)=>{
      //   console.error('Error while generating text:',error);
      // }

    )

  }
  startLoading(){
    this.loading=true;
  }



}
