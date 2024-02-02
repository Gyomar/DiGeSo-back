import { Controller, Post, Body, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Controller()
export class AppController {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  @Post('/send-email')
  async sendEmail(@Body() body: any): Promise<string> {
    const { name, email, message } = body;

    const mailOptions = {
      from: this.configService.sendEmailUSer,
      to: this.configService.sendEmailUSer,
      subject: 'Formulario Contactenos',
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
    };

    try {
      await this.mailerService.sendMail(mailOptions);
      return 'Correo enviado con éxito';
    } catch (error) {
      throw new Error('Error al enviar el correo');
    }
  }
}
