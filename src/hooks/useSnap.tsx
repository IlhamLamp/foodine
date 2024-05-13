import { MIDTRANS_APP_URL, MIDTRANS_CLIENT_KEY } from "@/utils/constant";
import { useState, useEffect } from "react";

declare global {
    interface Window {
        snap: Snap;
    }
}

interface SnapResult {
    embedId: string;
    onSuccess: (result: any) => void;
    onPending: (result: any) => void;
    onError: (result: any) => void;
    onClose: () => void;
}

interface SnapActions {
    onSuccess: (result: any) => void;
    onPending: (result: any) => void;
    onError: (result: any) => void;
    onClose: () => void;
}

interface Snap {
    embed: (snap_token: string, result: SnapResult) => void;
}

export const useSnap = () => {
    const [snap, setSnap] = useState<Snap | null>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `${MIDTRANS_APP_URL}/snap/snap.js`;
        script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
        script.onload = () => {
            setSnap(window.snap);
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const snapEmbed = (snap_token: string, embedId: string, action: SnapActions) => {
        if (snap) {
            snap.embed(snap_token, {
                embedId,
                onSuccess: (result) => {
                    console.log('success', result);
                    action.onSuccess(result);
                },
                onPending: (result) => {
                    console.log('pending', result);
                    action.onPending(result);
                },
                onError: (result) => {
                    console.log('failed', result);
                    action.onError(result);
                },
                onClose: () => {
                    action.onClose();
                }
            })
        }
    }

    return { snapEmbed };
}