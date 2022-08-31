import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationInfoComponent } from './conversation-info/conversation-info.component';
import { GroupBarComponent } from './side-bar/group-bar/group-bar.component';


@NgModule({
  declarations: [
    HomeComponent,
    SideBarComponent,
    ConversationComponent,
    ConversationInfoComponent,
    GroupBarComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
