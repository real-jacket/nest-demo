import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './storage';
import { FileSizeValidationPipePipe } from './file-size-validation-pipe.pipe';
import { MyFileValidator } from './my-file-validator';

@Controller('upload')
export class UploadController {
  @Get()
  hello() {
    return 'hello upload';
  }

  @Post('aaa')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log('body: ', body);
    console.log('file: ', file);
  }

  @Post('bbb')
  @UseInterceptors(
    FilesInterceptor('file', 3, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body: ', body);
    console.log('file: ', files);
  }

  @Post('ccc')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'aaa',
          maxCount: 2,
        },
        {
          name: 'bbb',
          maxCount: 3,
        },
      ],
      {
        dest: 'uploads',
      },
    ),
  )
  uploadFiles2(
    @UploadedFiles()
    files: {
      aaa?: Express.Multer.File[];
      bbb?: Express.Multer.File[];
    },
    @Body() body,
  ) {
    console.log('body: ', body);
    console.log('file: ', files);
  }

  @Post('ddd')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: storage,
    }),
  )
  uploadAnyFiles(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body: ', body);
    console.log('file: ', files);
  }

  @Post('eee')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile2(
    @UploadedFile(FileSizeValidationPipePipe) file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body: ', body);
    console.log('file: ', file);
  }

  @Post('fff')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile3(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({
            fileType: 'image/jpeg',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body: ', body);
    console.log('file: ', file);
  }

  @Post('ggg')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile4(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MyFileValidator({})],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body: ', body);
    console.log('file: ', file);
  }
}
