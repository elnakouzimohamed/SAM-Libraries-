import { Component } from '@angular/core';
import { GENAIService } from '../genai.service';
import { response } from 'express';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommend.component.html',
  styleUrl: './recommend.component.scss'
})
export class RecommendComponent {
  // cart = ['Harry Potter','Fantastic Beasts',"Men In Black", "Alchemist","The Odyssey"]
  // recommendations: string[] = [];
  // constructor(private genaiService:GENAIService){}
  // getRecommendations(){
  //   this.genaiService.recommend(this.cart).subscribe(
  //     response =>{
  //       this.recommendations = response.recommendations;
        
  //     }
  //   )
    
  // }

}
