import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        ToastrModule.forRoot({}),
        AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [AuthService],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
