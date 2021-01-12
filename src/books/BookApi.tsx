import axios from "axios";
import { authConfig, baseUrl, getLogger, withLogs } from "../core";
import { BookProps } from "./BookProps";

const bookUrl = `http://${baseUrl}/api/books`;

export const getBooks: (token: string) => Promise<BookProps[]> = (token) => {
    return withLogs(axios.get(bookUrl, authConfig(token)), "getBooks");
};

export const createItem: (
    token: string,
    book: BookProps
) => Promise<BookProps[]> = (token, book) => {
    return withLogs(axios.post(bookUrl, book, authConfig(token)), "createBook");
};

export const updateItem: (
    token: string,
    book: BookProps
) => Promise<BookProps[]> = (token, book) => {
    return withLogs(
        axios.put(`${bookUrl}/${book._id}`, book, authConfig(token)),
        "updateBook"
    );
};

interface MessageData {
    type: string;
    payload: BookProps;
}

const log = getLogger("ws");

export const newWebSocket = (
    token: string,
    onMessage: (data: MessageData) => void
) => {
    const ws = new WebSocket(`ws://${baseUrl}`);
    ws.onopen = () => {
        log("web socket onopen");
        ws.send(JSON.stringify({ type: "authorization", payload: { token } }));
    };
    ws.onclose = () => {
        log("web socket onclose");
    };
    ws.onerror = (error) => {
        log("web socket onerror", error);
    };
    ws.onmessage = (messageEvent) => {
        log("web socket onmessage");
        onMessage(JSON.parse(messageEvent.data));
    };
    return () => {
        ws.close();
    };
};
