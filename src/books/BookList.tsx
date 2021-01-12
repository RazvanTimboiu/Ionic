import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import {
    IonButton,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { getLogger } from "../core";
import { BookContext } from "./BookProvider";
import Book from "./Book";
import { AuthContext } from "../auth";
import { BookProps } from "./BookProps";

const log = getLogger("ItemList");

const ItemList: React.FC<RouteComponentProps> = ({ history }) => {
    const { items, fetching, fetchingError } = useContext(BookContext);
    const { logout } = useContext(AuthContext);

    const [visibleBooks, setVisibleBooks] = useState<BookProps[] | undefined>(
        []
    );

    useEffect(() => {
        setVisibleBooks(items);
    }, [items]);

    log("render");
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Books</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLoading isOpen={fetching} message="Fetching books" />
                {visibleBooks && (
                    <IonList>
                        {visibleBooks.map(
                            ({ _id, title, author, description, rating }) => (
                                <Book
                                    key={_id}
                                    _id={_id}
                                    title={title}
                                    author={author}
                                    description={description}
                                    rating={rating}
                                    onEdit={(id) => history.push(`/book/${id}`)}
                                />
                            )
                        )}
                    </IonList>
                )}

                {fetchingError && (
                    <div>
                        {fetchingError.message || "Failed to fetch books"}
                    </div>
                )}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push("/book")}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
                <IonFab vertical="bottom" horizontal="start" slot="fixed">
                    <IonFabButton onClick={handleLogout}>Logout</IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );

    function handleLogout() {
        log("logout");
        logout?.();
    }
};

export default ItemList;
