import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistsListComponent } from './artists-list/artists-list.component';
import { SongsListComponent } from './songs-list/songs-list.component';
import { VersionsComponent } from './versions/versions.component';
import { SongsComponent } from './songs/songs.component';

const routes: Routes = [
    { 
        path: '', 
        component: ArtistsComponent,
        children: [
            {
                path: '',
                component: ArtistsListComponent
            },
            {
                path: ':hrefArtist',
                component: SongsComponent,
                children: [
                    {
                        path: '',
                        component: SongsListComponent,
                    },
                    {
                        path: ':nameSong',
                        component: VersionsComponent,
                    }
                ]
            }
            
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
