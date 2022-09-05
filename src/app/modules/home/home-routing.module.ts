import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationComponent } from './conversation/conversation.component';
import { HomeComponent } from './home.component';
import { MembersManagerComponent } from './members-manager/members-manager.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ConversationComponent
      },
      {
        path: 'conversation/:group/:id',
        component: ConversationComponent
      },
      {
        path: 'members-manager',
        component: MembersManagerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
