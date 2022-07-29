import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHomeOneComponent } from './pages/page-home-one/page-home-one.component';
import { RootComponent } from './components/root/root.component';
import { ChatComponent } from './pages/chat/chat.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
    // START / ONLY_FOR_DEMO_YOU_CAN_DELETE_IT

    // END / ONLY_FOR_DEMO_YOU_CAN_DELETE_IT
    {
        path: '',
        component: RootComponent,
        data: {
            // Header layout. Choose one of ['classic', 'compact'].
            headerLayout: 'classic',
            // Dropcart type. Choose one of ['dropdown', 'offcanvas'].
            dropcartType: 'dropdown'
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: PageHomeOneComponent, 
            },
            {
                path: 'chat',
                pathMatch: 'full',
                component: ChatComponent, canActivate:[AuthGuard]
            },
            {
                path: 'shop',
                loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)
            },
            {
                path: 'blog',
                loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule), canActivate:[AuthGuard]
            },
            {
                path: 'account',
                loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) ,canActivate:[AuthGuard]
            },
            {
                path: 'site',
                loadChildren: () => import('./modules/site/site.module').then(m => m.SiteModule)
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
