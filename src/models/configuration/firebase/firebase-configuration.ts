import { assert } from "console";
import { injectable } from "inversify";
import { IFirebaseConfiguration } from "./firebase-configuration-interface";

@injectable()
export class FirebaseConfiguration implements IFirebaseConfiguration {
    readonly apiKey: string;
    readonly authDomain: string;
    readonly projectId: string;
    readonly storageBucket: string;
    readonly messagingSenderId: string;
    readonly appId: string;
    readonly measurementId: string;

    constructor() {
        this.apiKey = process.env.FIREBASE_API_KEY || process.env.FirebaseApiKey;
        this.authDomain = process.env.FIREBASE_AUTH_DOMAIN || process.env.FirebaseAuthDomain;
        this.projectId = process.env.FIREBASE_PROJECT_ID || process.env.FirebaseProjectId;
        this.storageBucket = process.env.FIREBASE_STORAGE_BUCKET || process.env.FirebaseStorageBucket;
        this.messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.FirebaseMessagingSenderId;
        this.appId = process.env.FIREBASE_APP_ID || process.env.FirebaseAppId;
        this.measurementId = process.env.FIREBASE_MEASUREMENT_ID || process.env.FirebaseMeasurementId;

        assert(!!this.apiKey, "apiKey was undefined");
        assert(!!this.authDomain, "authDomain was undefined");
        assert(!!this.projectId, "projectId was undefined");
        assert(!!this.storageBucket, "storageBucket was undefined");
        assert(!!this.messagingSenderId, "messagingSenderId was undefined");
        assert(!!this.appId, "appId was undefined");
        assert(!!this.measurementId, "measurementId was undefined");
    }
}
