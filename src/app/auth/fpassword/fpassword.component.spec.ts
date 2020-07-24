import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpasswordComponent } from './fpassword.component';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

describe('FpasswordComponent', () => {
  let component: FpasswordComponent;
  let fixture: ComponentFixture<FpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FpasswordComponent],
      imports: [
        RouterModule.forRoot([]),
        ToastrModule.forRoot({}),
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [AuthService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
