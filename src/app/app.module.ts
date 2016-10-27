import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Complete } from '../pages/complete/complete';
import { Upcoming } from '../pages/upcoming/upcoming';
import { TabsPage } from '../pages/tabs/tabs';
import { Add } from '../pages/add/add';
import { TagDetail } from '../pages/tag-detail/tag-detail';
import { Tag } from '../pages/tag/tag';
import { Icon } from '../pages/icon/icon';
import { TagProvider } from '../providers/tag';
import { TaskProvider } from '../providers/task';


@NgModule({
  declarations: [
    MyApp,
    Complete,
    Upcoming,
    TabsPage,
    Tag,
    TagDetail,
    Add,
    Icon
  ],
  imports: [
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages:"true", platforms: {
    android: {
      tabsPlacement: 'top'
    },
    ios: {
      tabsPlacement: 'bottom',
      statusbarPadding: true
    }
}
})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Complete,
    Upcoming,
    TabsPage,
    Tag,
    TagDetail,
    Add,
    Icon
  ],
  providers: [TagProvider, TaskProvider]
})
export class AppModule {}
