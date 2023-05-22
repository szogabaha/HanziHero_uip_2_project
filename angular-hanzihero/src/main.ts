import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MockDataBase } from './app/services/mock_database';
import { AppModule } from './app/app.module';

if(!sessionStorage.getItem(MockDataBase.USERS_STORAGE_KEY)) {
  new MockDataBase();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
