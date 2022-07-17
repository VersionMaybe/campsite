import { CampsiteDataProvider } from "../definitions/CampsiteDataProvider";
import { ICampsiteRoute } from "../definitions/CampsiteRoute";
import { initializeApp, FirebaseOptions, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, getDoc, doc, setDoc, collection, getDocs, deleteDoc, query, where, FieldValue, increment, arrayUnion, serverTimestamp } from "firebase/firestore";
import { getAuth, Auth, User, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getStorage, FirebaseStorage, ref, uploadBytes, getDownloadURL, } from "firebase/storage";
import { ICampsiteEntry } from "../definitions/CampsiteEntry";
import { CampsiteUserPermission, ICampsiteUser } from "../definitions/CampsiteUser";


export class FirebaseDataProvider extends CampsiteDataProvider {

    private app: FirebaseApp;
    private firestore: Firestore;
    private storage: FirebaseStorage;

    private auth: Auth;
    private firebaseUser!: User | null;

    constructor(options: FirebaseOptions) {
        super();
        this.app = initializeApp(options);
        this.firestore = getFirestore();
        this.storage = getStorage();
        this.auth = getAuth();

        this.auth.onAuthStateChanged((e) => {
            this.firebaseUser = e;
            console.log(e)
        })
    }

    private satanisePath(path: string) {
        return this.replaceAll(path, '/', '\\');
    }

    private replaceAll(string: string, find: string, replace: string) {
        return string.replace(new RegExp(find, 'g'), replace);
    }

    public async getDataForRoute(singleID: string) {
        const col = collection(this.firestore, `campsite/entries/singles`);
        const q = query(col, where('meta.linked_route', '==', singleID));
        const data = await getDocs(q);
        return data.empty ? undefined : data.docs[0].data() as any
    }

    public async getEntryForSingle(singleID: string) {
        const ref = doc(this.firestore, `campsite/entries/singles/${this.satanisePath(singleID)}`);
        const data = await getDoc(ref);
        return data.exists() ? data.data() as any : undefined;
    }

    public async setEntryForSingle(singleID: string, data: any) {
        const ref = doc(this.firestore, `campsite/entries/singles/${this.satanisePath(singleID)}`);
        try {
            await setDoc(ref, data)
            return true;
        } catch {
            return false;
        }
    }

    public async removeEntryForSingle(singleID: string) {
        const ref = doc(this.firestore, `campsite/entries/singles/${this.satanisePath(singleID)}`);
        try {
            await deleteDoc(ref)
            return true;
        } catch {
            return false;
        }
    }

    public async setRoute(details: ICampsiteRoute) {
        const ref = doc(this.firestore, `campsite/meta/routes/${this.satanisePath(details.id)}`);
        try {
            await setDoc(ref, details)
            return true;
        } catch {
            return false;
        }
    }

    public async removeRoute(details: ICampsiteRoute) {
        const ref = doc(this.firestore, `campsite/meta/routes/${this.satanisePath(details.id)}`);
        try {
            await deleteDoc(ref)
            return true;
        } catch {
            return false;
        }
    }

    public async getAllRoutes(): Promise<ICampsiteRoute[]> {
        const ref = collection(this.firestore, `campsite/meta/routes`);
        const docs = await getDocs(ref);
        return docs.docs.map((x) => x.data()) as ICampsiteRoute[];
    }

    public async getAllSingles() {
        const ref = collection(this.firestore, `campsite/entries/singles`);
        const docs = await getDocs(ref);
        return docs.docs.map((x) => x.data()) as ICampsiteEntry<any>[];
    }

    public async getAllEntries() {
        const singles = await this.getAllSingles();
        return [...singles];
    }

    public async uploadFile(file: File) {
        const storageRef = ref(this.storage, `campsite/file_${file.name}`);
        try {
            const exists = await getDownloadURL(storageRef);
            if (exists) return exists;
        } catch { }

        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    }

    public async getUserDetails(uid: string): Promise<ICampsiteUser> {
        if (!uid) return Promise.resolve<ICampsiteUser>(undefined as any);
        const ref = doc(this.firestore, `campsite/admin/users/${uid}`);
        const data = await getDoc(ref);
        return data.exists() ? data.data() as any : undefined;
    }

    public async getCurrentUserDetails(): Promise<ICampsiteUser> {
        return this.getUserDetails(this.firebaseUser?.uid || '');
    }

    public async login(): Promise<ICampsiteUser> {
        try {
            const provider = new GoogleAuthProvider();
            const user = await signInWithPopup(this.auth, provider)
            const details = await this.getUserDetails(user.user.uid);
            if (details) return details;
            else {
                const newDetails = {
                    uid: user.user.uid,
                    email: user.user.email!,
                    verified: user.user.emailVerified,
                    name: user.user.displayName || 'New User',
                    permissions: [
                        CampsiteUserPermission.Owner
                    ]
                };
                const success = await this.setUserDetails(user.user.uid, newDetails)
                if (success) {
                    const ref = doc(this.firestore, `campsite/admin`);
                    await setDoc(ref, {
                        users: increment(1),
                        last_seen: {
                            [user.user.uid]: serverTimestamp()
                        }
                    }, { merge: true })
                    return newDetails;
                }
                else return undefined as any;
            }
        } catch (e) {
            console.log(e);
            return undefined as any;
        }
    }

    public async setUserDetails(uid: string, details: Partial<ICampsiteUser>): Promise<boolean> {
        const ref = doc(this.firestore, `campsite/admin/users/${uid}`);
        try {
            await setDoc(ref, details)
            console.log('Details set!')
            return true;
        } catch (e) {
            console.log(e)
            return false;
        }
    }

    public async logout(): Promise<void> {
        await signOut(this.auth);
        return;
    }
}