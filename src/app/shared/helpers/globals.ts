import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Igreja } from 'src/app/components/igreja/igreja.model';

@Injectable()
export class Globals {
  igrejaSelecionada$ = new BehaviorSubject<Igreja>(new Igreja());
}
