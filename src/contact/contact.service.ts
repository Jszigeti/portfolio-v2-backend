/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  async create(body: CreateContactDto) {
    const { firstname, lastname, email, message } = body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Formulaire de contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER,
        subject: `Nouveau message de ${firstname} ${lastname}`,
        text: `Vous avez reçu un nouveau message :\n\nNom : ${firstname} ${lastname}\nEmail : ${email}\nMessage : ${message}`,
      });

      return { success: true, message: 'Email envoyé avec succès.' };
    } catch (error: unknown) {
      throw new BadRequestException();
    }
  }
}
