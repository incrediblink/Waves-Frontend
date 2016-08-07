import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
    draw(canvas : any) : void {
        if (canvas.getContext){
            let ctx : any = canvas.getContext('2d');

            let radius : number = canvas.width > canvas.height ? canvas.height / 2 : canvas.width / 2;
            let lineWidth : number = radius * 0.4;
            
            let grad= ctx.createLinearGradient(canvas.width / 2 - radius, canvas.height / 2 - radius, canvas.width / 2 + radius, canvas.height / 2 + radius);

            radius -= lineWidth / 2;
            
            grad.addColorStop(0, "white");
            grad.addColorStop(0.7, "rgb(91, 192, 222)");
            ctx.strokeStyle = grad;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2, true);
            ctx.stroke();
        }
    }
}