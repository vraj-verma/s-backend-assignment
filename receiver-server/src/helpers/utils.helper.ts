import { Injectable } from "@nestjs/common";
import { randomUUID } from 'crypto';

@Injectable()
export class Utility {

    generateUUID() {
        return randomUUID()
    }
}