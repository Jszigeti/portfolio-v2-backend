import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { pdfFileValidationPipe } from './pipes/pdf-file-validation';

@Controller()
export class FilesController {
  @Post('upload-cv')
  @UseInterceptors(FileInterceptor('file'))
  uploadCV(@UploadedFile(pdfFileValidationPipe) file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException();
    }
    return {
      succes: true,
      message: 'Le CV a été uploadé avec succès.',
    };
  }
}
