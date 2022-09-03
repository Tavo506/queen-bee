import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudyComponent } from './pages/study/study.component';

const routes: Routes = [
  {path: "", component: HomeComponent, data: {title: "Queen Bee - Spelling Bee Helper"}},
  {path: "study", component: StudyComponent, data: {title: "Queen Bee - Spelling Bee Helper"}},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
