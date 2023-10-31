import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Module({})
export class FirebaseModule {
  constructor() {
    admin.initializeApp();
  }
}
