import { MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { ParseFilePipe } from '@nestjs/common/pipes';

export const pdfFileValidationPipe = new ParseFilePipe({
  fileIsRequired: true,
  validators: [
    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
    new FileTypeValidator({ fileType: /application\/pdf/ }),
  ],
});
