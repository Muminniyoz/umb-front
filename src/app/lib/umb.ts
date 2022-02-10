
import { Subject } from "rxjs";

export class UMB{
    private static subject$: Subject<{type: string, data: any}>=new Subject<any>();
    static allWork = 0;

    
    public static start(data: any[]){
        this.allWork+= 10;

        return this.subject$;
    }
    private static seperate(){
        this.allWork += 10;

        
        this.subject$.next({
            type: 'progress',
            data: 10
        });
    }
}