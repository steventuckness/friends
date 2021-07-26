import { FriendsEffects } from './store/friends.effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendComponent } from './friend/friend.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationComponent } from './navigation/navigation.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromFriends from './store/friends.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BarComponent } from './bar/bar.component';
import { GraphComponent } from './graph/graph.component';
import { FriendsToFriendNodesPipe } from './pipes/friends-to-friend-nodes.pipe';
import { FriendsToFriendLinksPipe } from './pipes/friends-to-friend-links.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FriendsComponent,
    FriendComponent,
    NavigationComponent,
    VisualizerComponent,
    BarComponent,
    GraphComponent,
    FriendsToFriendNodesPipe,
    FriendsToFriendLinksPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    StoreModule.forRoot({ friends: fromFriends.friendReducer }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([FriendsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
