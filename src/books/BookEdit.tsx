import React, { useContext, useEffect, useState } from "react";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonLoading,
    IonModal,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { getLogger } from "../core";
import { RouteComponentProps } from "react-router";
import { BookContext } from "./BookProvider";
import { BookProps } from "./BookProps";
import { CustomModal } from "../theme/animations/CustomModal";

const log = getLogger("ItemEdit");

interface BookEditProps
    extends RouteComponentProps<{
        id?: string;
    }> {}

const BookEdit: React.FC<BookEditProps> = ({ history, match }) => {
    const { items, saving, savingError, saveItem } = useContext(BookContext);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);
    const [item, setItem] = useState<BookProps>();

    useEffect(() => {
        log("useEffect");
        const routeId = match.params.id || "";
        const item = items?.find((it) => it._id === routeId);
        setItem(item);
        if (item) {
            setTitle(item.title);
            setAuthor(item.author);
            setDescription(item.description);
            setRating(item.rating);
        }
    }, [match.params.id, items]);

    const handleSave = () => {
        const editedItem = item
            ? { ...item, title, author, description, rating }
            : { title, author, description, rating };
        saveItem && saveItem(editedItem).then(() => history.goBack());
    };

    const [showModal, setShowModal] = useState(false);

    log("render");
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleSave}>Save</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonInput
                    placeholder="Title"
                    value={title}
                    onIonChange={(e) => setTitle(e.detail.value || "")}
                />
                <IonInput
                    placeholder="Author"
                    value={author}
                    onIonChange={(e) => setAuthor(e.detail.value || "")}
                />
                <IonInput
                    placeholder="Description"
                    value={description}
                    onIonChange={(e) => setDescription(e.detail.value || "")}
                />
                <IonInput
                    placeholder="Rating"
                    value={rating}
                    onIonChange={(e) =>
                        setRating(parseInt(e.detail.value || "0"))
                    }
                />
                <IonLoading isOpen={saving} />
                {savingError && (
                    <div>{savingError.message || "Failed to save item"}</div>
                )}
                <CustomModal />
            </IonContent>
        </IonPage>
    );
};

export default BookEdit;
