import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cluster from 'cluster';
import * as os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

const numCPUs = os.cpus().length;
console.log(numCPUs)
// if ((cluster as any).isMaster) {
//   console.log(`Master process is running with PID ${process.pid}`);
//   for (let i = 0; i < numCPUs; i += 1) {
//     (cluster as any).fork();
//   }
//   (cluster as any).on('exit', (worker, code, signal) => {
//     console.log(
//       `Worker process ${worker.process.pid} exited with code ${code} and signal ${signal}`,
//     );
//   });
// } else {
//   bootstrap();
// }

bootstrap();
