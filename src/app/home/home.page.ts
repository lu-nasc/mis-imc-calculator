import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  classifyIMC(imc: number): string {
    if (imc < 18.5) return "magreza"
    if (imc >= 18.5 && imc <= 24.9) return "regular"
    if (imc >= 25.0 && imc <= 29.9) return "sobrepeso"
    if (imc >= 30.0 && imc <= 39.9) return "obesidade"
    if (imc > 40.0) return "obesidade grave"
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    this.showMessage(`IMC: ${this.classifyIMC(imc)} - ${imc.toFixed(2)}`);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'light',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
