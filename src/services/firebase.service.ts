import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class FirebaseService {
    constructor(private db: AngularFirestore) { }

    getFavoritesByEmail = (email) => 
        this.db.doc(
            `users/${email}`
        ).get().toPromise().then(
            userData => userData.get('favorites')
        )

    /**
     * Dado un email y los favoritos actualizados, le actualiza los favoritos a ese usuario
     */
    updateFavoritesByEmail = async (email, favorites) => 
        this.db.doc(
            `users/${email}`
        ).update({
            favorites
        });
    

}
