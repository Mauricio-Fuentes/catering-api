import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthCheckController {

  @Get()
  healthCheck() {
    return {
    status: 'success',
    message: 'Client Gateway is up and running!!'
  };
}

}
