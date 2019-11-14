import {NGXLoggerMonitor, NGXLogInterface} from 'ngx-logger';
 
export class MyLoggerMonitor implements NGXLoggerMonitor {
  onLog(log: NGXLogInterface) {
    console.log('myCustomLoggerMonitor', log);
  }
}