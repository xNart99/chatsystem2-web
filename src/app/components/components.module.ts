import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MemberItemComponent } from "./member-item/member-item.component";

@NgModule({
  declarations: [
    MemberItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MemberItemComponent
  ]
})
export class ComponentsModule {
}