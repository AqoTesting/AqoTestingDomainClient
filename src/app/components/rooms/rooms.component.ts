import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetRoomsItem } from 'src/app/entities/room.entities';
import { Response } from 'src/app/entities/response.entities';
import { SnackService } from 'src/app/services/snack.service';
import { RoomService } from '../../services/room.service';
import { Background } from 'src/app/utils/background.utility';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  rooms: GetRoomsItem[];
  env: any = environment;

  constructor(
    private _roomService: RoomService,
    private _snackService: SnackService
  ) {
    Background.setColor('#303030');
  }

  ngOnInit(): void {
    this.updateRoomsItem();
  }

  private updateRoomsItem(): void {
    this.subscription.add(
      this._roomService
        .getUserRooms()
        .pipe(take(1))
        .subscribe((data) => {
          this.rooms = data;
        })
    );
  }

  deleteRoom(room: GetRoomsItem): void {
    if (confirm(`Вы уверены, что хотите удалить комнату ${room.name}?`)) {
      this.subscription.add(
        this._roomService
          .deleteRoomById(room.id)
          .pipe(take(1))
          .subscribe(
            () => {
              this._snackService.success(
                `Комната <b>${room.name}</b> была успешно удалена`
              );
              this.rooms = this.rooms.filter((_room) => _room.id != room.id);
              this.updateRoomsItem();
            },
            (error) => {
              if (error instanceof Response)
                this._snackService.error(error.errorMessageCode);
            }
          )
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
