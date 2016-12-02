import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TaskList } from '../pages/task-list/task-list';
import { Add } from '../pages/add/add';
import { TagDetail } from '../pages/tag-detail/tag-detail';
import { TaskDetail } from '../pages/task-detail/task-detail';
import { Tag } from '../pages/tag/tag';
import { Icon } from '../pages/icon/icon';
import { TagProvider } from '../providers/tag';
import { TaskProvider } from '../providers/task';


@NgModule({
  declarations: [
    MyApp,
    TaskList,
    Tag,
    TagDetail,
    Add,
    Icon,
    TaskDetail
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
    TaskList,
    Tag,
    TagDetail,
    Add,
    Icon,
    TaskDetail
  ],
  providers: [TagProvider, TaskProvider]
})
export class AppModule {}
