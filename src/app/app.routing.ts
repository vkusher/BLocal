﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { LinksComponent } from './links/index';
import { PropertyComponent } from './property/index';
import { CategoryComponent } from './category/index';
import { AroundComponent } from './around/index';


import { AuthGuard } from './_guards/auth.guard'
import { from } from 'rxjs/observable/from';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'links', component: LinksComponent , canActivate: [AuthGuard]},    
    { path: 'around', component: AroundComponent , canActivate: [AuthGuard]},    
    { path: 'property/:propertyid', component: PropertyComponent , canActivate: [AuthGuard]},
    { path: 'category/:categoryid', component: CategoryComponent , canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);