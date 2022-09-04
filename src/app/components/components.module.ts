import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MemberItemComponent } from "./member-item/member-item.component";
import { CreateAddMemberComponent } from './create-add-member/create-add-member.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    MemberItemComponent,
    CreateAddMemberComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    MemberItemComponent
  ]
})
export class ComponentsModule {
}