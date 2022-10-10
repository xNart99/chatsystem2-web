import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationInfoComponent } from './conversation-info/conversation-info.component';
import { GroupBarComponent } from './side-bar/group-bar/group-bar.component';
import { ChatToolbarComponent } from './side-bar/chat-toolbar/chat-toolbar.component';
import { CreateGroupComponent } from './side-bar/create-group/create-group.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MembersManagerComponent } from './members-manager/members-manager.component';
import { MembersManagerInfoComponent } from './members-manager-info/members-manager-info.component';
import { FormsModule } from '@angular/forms';
import { SafePipe } from 'src/app/pipe/safe.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    SideBarComponent,
    ConversationComponent,
    ConversationInfoComponent,
    GroupBarComponent,
    ChatToolbarComponent,
    CreateGroupComponent,
    MembersManagerComponent,
    MembersManagerInfoComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
    FormsModule,
  ]
})
export class HomeModule { }
