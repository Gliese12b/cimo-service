import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  private static readonly SERVICE = 'Gliese12b Api Service';

  public static setup(app: INestApplication) {
    // TODO: Move this into config file
    const config = new DocumentBuilder()
      .setTitle(`${this.SERVICE}`)
      .setDescription(`The ${this.SERVICE}`)
      .setVersion('1.0')
      .addTag(`${this.SERVICE}`)
      .addBearerAuth()
      .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'X-API-KEY')
      .build();

    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey, methodKey) => {
        return controllerKey;
      },
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api-svc/swagger', app, document);
  }
}
