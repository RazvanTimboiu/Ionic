import React, { useState } from "react";
import { createAnimation, IonModal, IonButton, IonContent } from "@ionic/react";

export const CustomModal: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const enterAnimation = (baseEl: any) => {
        const backdropAnimation = createAnimation()
            .addElement(baseEl.querySelector("ion-backdrop")!)
            .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

        const wrapperAnimation = createAnimation()
            .addElement(baseEl.querySelector(".modal-wrapper")!)
            .keyframes([
                { offset: 0, opacity: "0", transform: "scale(0)" },
                { offset: 1, opacity: "0.99", transform: "scale(1)" },
            ]);

        return createAnimation()
            .addElement(baseEl)
            .easing("ease-out")
            .duration(500)
            .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: any) => {
        return enterAnimation(baseEl).direction("reverse");
    };

    return (
        <>
            <IonModal
                isOpen={showModal}
                enterAnimation={enterAnimation}
                leaveAnimation={leaveAnimation}
            >
                <p>You can't unread a book !</p>
                <IonButton onClick={() => setShowModal(false)}>
                    Accept and Continue
                </IonButton>
            </IonModal>
            <IonButton onClick={() => setShowModal(true)}>Delete</IonButton>
        </>
    );
};
